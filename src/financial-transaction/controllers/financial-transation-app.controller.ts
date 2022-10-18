import { Controller, UseGuards, Get, Param } from "@nestjs/common"
import { EmailConfirmedGuard, UserJwtAuthGuard } from "src/user/guards";
import { FinancialTransactionStatePipe } from "../pipes";

@Controller("transaction/app")
@UseGuards(EmailConfirmedGuard)
@UseGuards(UserJwtAuthGuard)
export class FinancialTransactionAppController
{
    constructor(){}

    @Get(":state")
    async getTransactionByParam(@Param("state", FinancialTransactionStatePipe) state:string)
    {
        // let query={state,}
    }
    
}