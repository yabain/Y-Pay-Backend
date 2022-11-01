import { IsMongoId,IsOptional, IsNotEmpty, IsString, MaxLength } from "class-validator";
import { User } from "src/user/models";

/**
 * @apiDefine TicketDTO
 * @apiBody {String} title Ticket title
 * @apiBody {String} [app] Application identifier associated with the ticket
 * 
 */

export class CreateTicketDTO
{
    @IsString()
    @IsNotEmpty()
    @MaxLength(65)
    title:string;

    @IsOptional()
    @IsMongoId()
    app;

    owner:User
}