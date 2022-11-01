import { IsMongoId, IsNotEmpty, IsOptional, IsString } from "class-validator";


/**
 * @apiDefine CreateMessageDTO
 * @apiBody {String} ticket ID of the ticket associated with the message
 * @apiBody {String} [from] ID of the sender of the message
 * @apiBody {String} [to] Message receiver ID
 * @apiBody {String} content Message content. it can be plain text or in html format
 * 
 */

export class CreateMessageDTO
{
    @IsMongoId()
    ticket;

    @IsString()
    @IsNotEmpty()
    content:string;

    @IsOptional()
    @IsMongoId()
    to

    @IsOptional()
    @IsMongoId()
    from
}