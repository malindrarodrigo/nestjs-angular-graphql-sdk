import { ForbiddenException, Injectable } from '@nestjs/common';
import { User } from 'src/users/entities/user.entity';
import { UsersService } from 'src/users/users.service';
import { JwtService } from '@nestjs/jwt';
import { LoginUserInput } from './dto/login-user-input';
import * as bcrypt from 'bcrypt'
import appConfig from 'src/config/app.config';

@Injectable()
export class AuthService {
    constructor(private userService: UsersService, private jwtSerive: JwtService) { }

    async validateUser(username: string, password: string): Promise<any> {
        const user = await this.userService.findOne(username)

        const valid = await bcrypt.compare(password, user.password)

        if (user && valid) {
            const { password, ...result } = user
            return result
        }
        return null
    }


    async login(user: User) {

        const tokens = await this.getTokens(user.id, user.username);
        await this.updateRefreshToken(user.username, tokens.refreshToken);
        return {
            refresh_token: tokens.refreshToken,
            access_token: this.jwtSerive.sign({
                username: user.username,
                sub: user.id
            }),
            user,
        }

    }

    async signUp(loginUserInput: LoginUserInput) {
        const user = await this.userService.findOne(loginUserInput.username)

        if (user) {
            throw new Error('User already exists')
        }
        const password = await bcrypt.hash(loginUserInput.password, 10)
        const createduser = await this.userService.create({
            ...loginUserInput,
            password,
        })
        const tokens = await this.getTokens(createduser.id, createduser.username);
        await this.updateRefreshToken(createduser.username, tokens.refreshToken);
        console.log(tokens);

        return {
            refresh_token: tokens.refreshToken,
            access_token: tokens.accessToken
        }

    }

    async updateRefreshToken(id: any, refreshToken: any) {
        const hashedRefreshToken = await bcrypt.hash(refreshToken, 10);
        await this.userService.update(id, {
            refreshToken: hashedRefreshToken,
        });
    }
    async getTokens(id: any, username: any) {
        console.log("==========================");

        const [accessToken, refreshToken] = await Promise.all([
            this.jwtSerive.sign({
                username: username,
                sub: id
            }),
            this.jwtSerive.signAsync(
                {
                    sub: id,
                    username,
                },
                {
                    secret: appConfig().appRefreshSecret,
                    expiresIn: '62s',
                },
            ),
        ]);
        return {
            accessToken,
            refreshToken
        };

    }

    async refreshTokens(userId: string, refreshToken: string) { 
        const user = await this.userService.findOne(userId); 

        if (!user || !user.refresh_token) throw new ForbiddenException('Access Denied');
        const refreshTokenMatches = await bcrypt.compare(
            refreshToken,
            user.refresh_token
        );
 
        if (!refreshTokenMatches) throw new ForbiddenException('Access Denied');
        const tokens = await this.getTokens(user.id, user.username);
        await this.updateRefreshToken(user.username, tokens.refreshToken);
 
        return {
            refresh_token: tokens.refreshToken,
            access_token: tokens.accessToken
        }
    }

}
