import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { PassportModule } from "@nestjs/passport";
import { ActivityModule } from "src/activity/activity.module";
import { UserModule } from "src/user/user.module";
import { WalletModule } from "src/wallet/wallet.module";
import { ApplicationController, AuthController } from "./controllers";
import { Application, ApplicationSchema } from "./models";
import { ApplicationService, AuthService } from "./services";
import { BasicStrategy } from "./stategies";


@Module({
    imports:[
        MongooseModule.forFeature([{name:Application.name,schema:ApplicationSchema}]),
        UserModule,
        WalletModule,
        PassportModule,
        ActivityModule
    ],
    controllers:[ApplicationController,AuthController],
    providers:[ApplicationService,BasicStrategy,AuthService],
    exports:[ApplicationService,BasicStrategy,AuthService]
})
export class ApplicationModule{}