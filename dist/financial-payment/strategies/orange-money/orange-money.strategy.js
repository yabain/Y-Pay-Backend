"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrangeMoneyStrategyPayment = void 0;
const axios_1 = require("@nestjs/axios");
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const rxjs_1 = require("rxjs");
const enum_1 = require("../../../financial-transaction/enum");
let OrangeMoneyStrategyPayment = class OrangeMoneyStrategyPayment {
    constructor(configService, httpService) {
        this.configService = configService;
        this.httpService = httpService;
    }
    getToken() {
        return new Promise((resolve, reject) => {
            process.env['NODE_TLS_REJECT_UNAUTHORIZED'] = '0';
            this.httpService.request({
                url: `${this.configService.get("OM_API_PATH")}/token/`,
                method: "post",
                headers: {
                    Authorization: `Basic ${this.configService.get("OM_API_AUTHORIZATION_HEADER")}`,
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
};
OrangeMoneyStrategyPayment = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [config_1.ConfigService, axios_1.HttpService])
], OrangeMoneyStrategyPayment);
exports.OrangeMoneyStrategyPayment = OrangeMoneyStrategyPayment;
//# sourceMappingURL=orange-money.strategy.js.map