import { SES } from "aws-sdk";
import { Email } from "./email";
export declare class EmailService {
    private awsEmailService;
    constructor(awsEmailService: SES);
    sendEmail(emailObj: Email): Promise<import("aws-sdk/lib/request").PromiseResult<SES.SendEmailResponse, import("aws-sdk").AWSError>>;
}
