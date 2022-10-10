import { Module } from "@nestjs/common";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { MongooseModule } from "@nestjs/mongoose";
import { SES } from "aws-sdk";
import { AwsSdkModule } from "nest-aws-sdk";
import configuration from "./config/configuration";
import { SecurityModule } from "./security/security.module";

@Module({
    imports:[
        ConfigModule.forRoot({
            load: [configuration],
            isGlobal:true
          }),
          MongooseModule.forRootAsync({
            imports:[ConfigModule],
            inject:[ConfigService],
            useFactory:async (configService:ConfigService)=>({
              uri:configService.get<string>("mongoURI")
            })
          }),
        SecurityModule,
        AwsSdkModule.forRootAsync({
          defaultServiceOptions:{
            imports:[ConfigModule],
            inject:[ConfigService],
            useFactory:async (configService:ConfigService)=>({
              region:configService.get<string>("AWS_SDK_REGION"),
              profile:configService.get<string>("AWS_SDK_PROFILE")
            })
          },
          services:[
            SES
          ]
        })
    ],
    exports:[
        SecurityModule,
        ConfigModule,
        MongooseModule,
        AwsSdkModule
    ]
})
export class SharedModule{}