import { Injectable } from '@nestjs/common';
import { User } from 'src/users/entities/user.entity';
import { UsersService } from 'src/users/users.service';
import { JwtService } from '@nestjs/jwt';
import { LoginUserInput } from './dto/login-user-input';
import * as bcrypt from 'bcrypt'

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
        return {
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

        return this.userService.create({
            ...loginUserInput,
            password
        })
    }

}
