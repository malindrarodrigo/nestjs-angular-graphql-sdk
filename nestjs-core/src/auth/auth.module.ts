import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthResolver } from './auth.resolver';
import { LocalStratrgy } from './local.strategy';
import { PassportModule } from '@nestjs/passport/dist';
import { UsersModule } from 'src/users/users.module';
import { JwtModule } from '@nestjs/jwt/dist';
import { JwtStratrgy } from './jwt.strategy';
import { jwtConfig } from 'src/config/jwt.config';
import { RefreshTokenStrategy } from './refresh-token.strategy';

@Module({
  imports: [PassportModule, UsersModule,
    JwtModule.registerAsync(jwtConfig)
  ],
  providers: [AuthService, AuthResolver, LocalStratrgy, JwtStratrgy,RefreshTokenStrategy]
})
export class AuthModule { }
