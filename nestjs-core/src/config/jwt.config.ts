import { JwtModuleAsyncOptions } from "@nestjs/jwt";
import appConfig from "./app.config";

export const jwtConfig: JwtModuleAsyncOptions = {
    useFactory: () => {
        return {
            signOptions: { expiresIn: '60s' },
            secret: appConfig().appSecret
        }
    }

}