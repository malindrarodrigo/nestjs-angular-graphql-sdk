import { TypeOrmModuleAsyncOptions } from "@nestjs/typeorm";
import { User } from "src/users/entities/user.entity";

export const dbConifg: TypeOrmModuleAsyncOptions = {
    useFactory: () => {
        return {
            type: 'mysql',
            host: process.env.DB_HOST,
            port: 3306,
            username: process.env.DB_USERNAME,
            password: process.env.DB_PASSWORD,
            database: process.env.DB_NAME,
            entities: [User],
            synchronize: true,
        }
    }
}