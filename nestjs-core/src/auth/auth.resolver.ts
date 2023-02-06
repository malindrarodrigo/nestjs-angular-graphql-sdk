import { Req, UseGuards } from '@nestjs/common';
import { Args, Context, Mutation, Query, Resolver } from '@nestjs/graphql';
import { Request } from 'express';
import { User } from 'src/users/entities/user.entity';
import { AuthService } from './auth.service';
import { LoginResponse } from './dto/login-response'
import { LoginUserInput } from './dto/login-user-input';
import { ReResonse } from './dto/re-response';
import { RefreshTokenInput } from './dto/refresh-toekn-input';
import { GqlAuthGurad } from './gql-auth-guard';
import { JwtAuthGurad } from './jwt-auth-guard';
import { RefreshTokenGuard } from './refresh-token-guard';

@Resolver()
export class AuthResolver {
    constructor(private authService: AuthService) { }

    @Mutation(() => LoginResponse)
    @UseGuards(GqlAuthGurad)
    login(@Args('loginUserInput') loginUserInput: LoginUserInput, @Context() context) {
        return this.authService.login(context.user)
    }
    @Mutation(() => ReResonse)
    signUp(@Args('loginUserInput') loginUserInput: LoginUserInput) {
        return this.authService.signUp(loginUserInput)
    }

    @Mutation(() => ReResonse)
    // @UseGuards(RefreshTokenGuard)
    @UseGuards(JwtAuthGurad)
    refreshToken(@Args('refreshTokenInput') refreshTokenInput: RefreshTokenInput) {
        console.log("--------------------");

        return this.authService.refreshTokens(refreshTokenInput.username, refreshTokenInput.refresh_token)

    }

}
