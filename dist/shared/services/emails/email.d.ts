export declare class Email {
    private sender;
    private receiver;
    private otherReceiver;
    private _file;
    private _content;
    private _subject;
    private _template;
    private _templateVar;
    from(userFrom: string): Email;
    to(userTo: string): Email;
    cc(ccUser: string): Email;
    subject(titleMail: string): Email;
    content(cont: string): Email;
    file(file: any): Email;
    template(temp: string): Email;
    templateVar(tmpVar: Record<string, any>): Email;
    getTemplate(): string;
    toJSON(): {
        from: string;
        to: string[];
        subject: string;
        content: string;
        file: string;
        cc: string[];
        template: string;
        templateVar: Record<string, any>;
    };
    private toString;
}
