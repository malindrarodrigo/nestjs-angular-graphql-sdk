import { Injectable } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { Request } from "express";
import { ExtractJwt } from "passport-jwt";
import { Strategy } from "passport-local";

@Injectable()
export class RefreshTokenStrategy extends PassportStrategy(Strategy, 'jwt-refresh') {
    constructor() {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            secretOrKey: process.env.JWT_REFRESH_SECRET,
            passReqToCallback: true,
        });
    }

    //    async validate(req: Request, payload: any) {
    //         const refreshToken = req.get('Authorization').replace('Bearer', '').trim();
    //         return { ...payload, refreshToken };
    //     }
    async validate(playload: any): Promise<any> {
        return { userId: playload.sub, usermame: playload.usermame }
    }
}