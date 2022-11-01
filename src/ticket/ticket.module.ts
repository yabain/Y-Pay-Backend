import { Module } from "@nestjs/common"
import { MongooseModule } from "@nestjs/mongoose";
import { UserModule } from "src/user/user.module";
import { MessageController, TicketController } from "./controllers";
import { Message, MessageSchema, Ticket, TicketSchema } from "./models";
import { MessageService, TicketService } from "./services";
import { ApplicationModule } from "src/application/application.module";

@Module({
    imports:[
        MongooseModule.forFeature([
            {name:Ticket.name,schema:TicketSchema},
            {name:Message.name,schema:MessageSchema}
        ]),
        UserModule,
        ApplicationModule
    ],
    controllers:[
        TicketController,
        MessageController
    ],
    providers:[
        MessageService,
        TicketService
    ],
    exports:[
        MessageService,
        TicketService
    ]
})
export class TicketModule{}