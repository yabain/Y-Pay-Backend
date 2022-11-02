import { Module } from "@nestjs/common"
import { MongooseModule } from "@nestjs/mongoose";
import { SharedModule } from "src/shared/shared.module";
import { TicketModule } from "src/ticket/ticket.module";
import { FileController } from "./controllers";
import { FileSchema,File } from "./models";
import { FileS3UploadService, FileService } from "./services";

@Module({
    imports:[
        SharedModule,
        MongooseModule.forFeature([{name:File.name,schema:FileSchema}]),
        TicketModule
    ],
    controllers:[FileController],
    providers:[FileS3UploadService,FileService],
    exports:[FileS3UploadService,FileService],
})
export class FileModule{}