import { Injectable } from "@nestjs/common"
import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy } from "passport-jwt";
import appConfig from "src/config/app.config";

@Injectable()
export class JwtStratrgy extends PassportStrategy(Strategy) {
    constructor() {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration: false,
            secretOrKey: appConfig().appSecret
        })
    }

    async validate(playload: any): Promise<any> {
        return { userId: playload.sub, usermame: playload.usermame }
    }
}