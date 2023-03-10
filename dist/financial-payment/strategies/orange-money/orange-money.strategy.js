"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrangeMoneyStrategyPayment = void 0;
const rxjs_1 = require("rxjs");
const enum_1 = require("../../../financial-transaction/enum");
class OrangeMoneyStrategyPayment {
    constructor(configService, httpService) {
        this.configService = configService;
        this.httpService = httpService;
    }
    getToken() {
        return new Promise((resolve, reject) => {
            this.httpService.request({
                url: `${this.configService.get("OM_API_PATH")}/token/`,
                method: "post",
                headers: {
                    Authorization: `Basic ${Buffer.from(this.configService.get("OM_API_CONSUMER_KEY") + ":" + this.configService.get("OM_API_CONSUMER_SECRET")).toString('base64')}`,
                    "grant_type": "client_credentials"
                }
            })
                .pipe((0, rxjs_1.map)(response => response.data))
                .subscribe((data) => resolve(data.access_token), (error) => reject(error));
        });
    }
    buy(financialTransaction) {
        return new Promise((resolve, reject) => {
            let token = "";
            this.getToken()
                .then((result) => {
                token = result;
                this.httpService.request({
                    url: `${this.configService.get("OM_API_PATH")}/mp/pay`,
                    method: "post",
                    headers: {
                        Authorization: `Bearer ${token}`,
                        "X-AUTH-TOKEN": Buffer.from(this.configService.get("OM_API_USERNAME") + ":" + this.configService.get("OM_API_PASSWORD")).toString('base64'),
                    },
                    data: {
                        "amount": `${financialTransaction.amount}`,
                        "orderId": financialTransaction.ref,
                        "subscriberMsisdn": financialTransaction.userRef.account,
                        "payToken": token,
                        "description": `Une transaction de ${financialTransaction.amount} ${financialTransaction.moneyCode} a été fait depuis votre compte`,
                    }
                })
                    .subscribe((data) => {
                    resolve({ error: enum_1.FinancialTransactionErrorType.NO_ERROR, token });
                }, (error) => { reject(error); });
            })
                .catch((error) => reject(error));
        });
    }
    openUserPrompt(financialTransaction) {
        this.httpService.request({
            url: `${this.configService.get("OM_API_PATH")}/mp/push/${financialTransaction.token}`,
        });
    }
    check(financialTransaction) {
        throw new Error("Method not implemented.");
    }
    withdrawal(financialTransaction) {
        throw new Error("Method not implemented.");
    }
    checkWithdrawal(financialTransaction) {
        throw new Error("Method not implemented.");
    }
    cancel(financialTransaction) {
        throw new Error("Method not implemented.");
    }
}
exports.OrangeMoneyStrategyPayment = OrangeMoneyStrategyPayment;
//# sourceMappingURL=orange-money.strategy.js.map