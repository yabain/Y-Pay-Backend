import { Module } from "@nestjs/common"
import { SharedModule } from "src/shared/shared.module";
import { FileController } from "./controllers";
import { FileS3UploadService } from "./services";

@Module({
    imports:[SharedModule],
    controllers:[FileController],
    providers:[FileS3UploadService],
    exports:[FileS3UploadService],
})
export class FileModule{}