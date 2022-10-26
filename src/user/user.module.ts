import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { PassportModule } from "@nestjs/passport";
import { JwtModule } from "@nestjs/jwt";
import { AuthController,EmailConfirmationController, UserProfilController } from "./controllers";
import { User, UserSchema } from "./models";
import { AuthService, UsersService } from "./services";
import { AuthLocalStrategy } from "./strategies";
import { PasswordUtil } from "./utils";
import { JWT_CONSTANT } from "src/shared/config";
import { AuthJwtStrategy } from "./strategies/auth-jwt.strategy";
import { SharedModule } from "src/shared/shared.module";
import { UserEmailService } from "./services/user-email.service";
import { EmailConfirmedGuard } from "./guards";
import { ActivityModule } from "src/activity/activity.module";


@Module({
    imports:[
        MongooseModule.forFeatureAsync([
        {
            name:User.name,
            useFactory: ()=>{
                const schema = UserSchema
                schema.pre("save",function (next){
                    this.password=PasswordUtil.hash(this.password)
                    next();
                })
               
                return schema;
            }
        }]),
        PassportModule,
        JwtModule.register({
            secret:JWT_CONSTANT.secret,
            signOptions: { expiresIn: JWT_CONSTANT.expiresIn }
        }),
        SharedModule,
        ActivityModule
    ],
    controllers:[
        AuthController,
        EmailConfirmationController,
        UserProfilController
    ],
    providers:[
        UsersService,
        AuthService,
        AuthLocalStrategy,
        AuthJwtStrategy,
        UserEmailService,
        EmailConfirmedGuard
    ],
    exports:[UsersService,AuthService,AuthJwtStrategy,JwtModule,UserEmailService,EmailConfirmedGuard]
})
export class UserModule{}