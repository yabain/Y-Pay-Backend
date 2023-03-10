"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Email = void 0;
class Email {
    constructor() {
        this.sender = "";
        this.receiver = [];
        this.otherReceiver = [];
        this._file = "";
        this._content = "";
        this._subject = "";
        this._template = null;
        this._templateVar = {};
    }
    from(userFrom) {
        this.sender = userFrom;
        return this;
    }
    to(userTo) {
        this.receiver.push(userTo);
        return this;
    }
    cc(ccUser) {
        this.otherReceiver.push(ccUser);
        return this;
    }
    subject(titleMail) {
        this._subject = titleMail;
        return this;
    }
    content(cont) {
        this._content = cont;
        return this;
    }
    file(file) {
        this._file = file;
        return this;
    }
    template(temp) {
        this._template = temp;
        return this;
    }
    templateVar(tmpVar) {
        this._templateVar = tmpVar;
        return this;
    }
    getTemplate() {
        return this._template;
    }
    toJSON() {
        return this.toString();
    }
    toString() {
        return {
            from: this.sender,
            to: this.receiver,
            subject: this._subject,
            content: this._content,
            file: this._file.toString(),
            cc: this.otherReceiver,
            template: this._template,
            templateVar: this._templateVar
        };
    }
}
exports.Email = Email;
//# sourceMappingURL=email.js.map