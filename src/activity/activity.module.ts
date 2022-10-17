import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { Activity, ActivitySchema } from "./models";


@Module({
    imports:[
        MongooseModule.forFeature([{name:Activity.name,schema:ActivitySchema}])
    ],
    controllers:[],
    exports:[]
})
export class ActivityModule{}