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
exports.MtnMoneyStrategyPayment = void 0;
const axios_1 = require("@nestjs/axios");
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const rxjs_1 = require("rxjs");
const enum_1 = require("../../../financial-transaction/enum");
const errors_1 = require("../../../shared/config/errors");
const uuid_1 = require("uuid");
const mtn_money_enum_1 = require("./mtn-money.enum");
let MtnMoneyStrategyPayment = class MtnMoneyStrategyPayment {
    constructor(configService, httpService) {
        this.configService = configService;
        this.httpService = httpService;
        this.token = "";
    }
    getToken(uuid) {
        return new Promise((resolve, reject) => {
            this.httpService.request({
                url: `${this.configService.get("MOMO_API_PATH")}/collection/token/`,
                method: "post",
                headers: {
                    Authorization: `Basic ${Buffer.from(uuid + ":" + this.configService.get("MOMO_API_KEY")).toString('base64')}`,
                    "Ocp-Apim-Subscription-Key": this.configService.get("MOMO_API_PRIMARY_KEY")
                }
            })
                .pipe((0, rxjs_1.map)(response => response.data))
                .subscribe((data) => resolve(data.access_token), (error) => reject(error));
        });
    }
    getResponseStatus(response) {
        let r = {};
        switch (response.status) {
            case mtn_money_enum_1.MtnResponseStatus.SUCCESSFUL:
                r["status"] = enum_1.FinancialTransactionState.FINANCIAL_TRANSACTION_SUCCESS;
                r["error"] = enum_1.FinancialTransactionErrorType.NO_ERROR;
                break;
            case mtn_money_enum_1.MtnResponseStatus.FAILED:
                switch (response.data.reason.code) {
                    case mtn_money_enum_1.MtnResponseStatus.PAYER_NOT_FOUND:
                        r["status"] = enum_1.FinancialTransactionState.FINANCIAL_TRANSACTION_ERROR;
                        r["error"] = enum_1.FinancialTransactionErrorType.BUYER_NOT_FOUND_ERROR;
                        break;
                    case mtn_money_enum_1.MtnResponseStatus.PAYEE_NOT_FOUND:
                        r["status"] = enum_1.FinancialTransactionState.FINANCIAL_TRANSACTION_SUCCESS;
                        r["error"] = enum_1.FinancialTransactionErrorType.RECEIVER_NOT_FOUND_ERROR;
                        break;
                    default:
                        r["status"] = enum_1.FinancialTransactionState.FINANCIAL_TRANSACTION_ERROR;
                        r["error"] = enum_1.FinancialTransactionErrorType.UNKNOW_ERROR;
                }
                break;
            case mtn_money_enum_1.MtnResponseStatus.PENDING:
            default:
                r["status"] = enum_1.FinancialTransactionState.FINANCIAL_TRANSACTION_PENDING;
                r["error"] = enum_1.FinancialTransactionErrorType.NO_ERROR;
        }
        return r;
    }
    buy(financialTransaction) {
        return new Promise((resolve, reject) => {
            let token = "";
            this.getToken(this.configService.get("MOMO_API_DEFAULT_UUID"))
                .then((result) => {
                token = result;
                this.httpService.request({
                    url: `${this.configService.get("MOMO_API_PATH")}/collection/v1_0/requesttopay`,
                    method: "post",
                    headers: {
                        Authorization: `Bearer ${token}`,
                        "X-Reference-Id": financialTransaction.ref,
                        "Ocp-Apim-Subscription-Key": this.configService.get("MOMO_API_PRIMARY_KEY"),
                        "X-Target-Environment": this.configService.get("MOMO_API_MODE_ENV"),
                    },
                    data: {
                        "amount": `${financialTransaction.amount}`,
                        "currency": financialTransaction.moneyCode,
                        "externalId": financialTransaction.ref,
                        "payer": {
                            "partyIdType": "MSISDN",
                            "partyId": financialTransaction.userRef.account
                        },
                        "payerMessage": `Une transaction de ${financialTransaction.amount} ${financialTransaction.moneyCode} a été fait depuis votre compte`,
                        "payeeNote": `Une transaction de ${financialTransaction.amount} ${financialTransaction.moneyCode} a été fait vers votre compte`
                    }
                })
                    .subscribe((data) => {
                    resolve({ error: enum_1.FinancialTransactionErrorType.NO_ERROR });
                }, (error) => { reject(error); });
            })
                .catch((error) => reject(error));
        });
    }
    check(financialTransaction) {
        return new Promise((resolve, reject) => {
            this.getToken(this.configService.get("MOMO_API_DEFAULT_UUID"))
                .then((result) => {
                this.httpService.request({
                    url: `${this.configService.get("MOMO_API_PATH")}/collection/v1_0/requesttopay/${financialTransaction.ref}`,
                    method: "get",
                    headers: {
                        Authorization: `Bearer ${result}`,
                        "X-Reference-Id": financialTransaction.ref,
                        "Ocp-Apim-Subscription-Key": this.configService.get("MOMO_API_PRIMARY_KEY"),
                        "X-Target-Environment": this.configService.get("MOMO_API_MODE_ENV"),
                    },
                })
                    .subscribe((response) => {
                    resolve(Object.assign({ endDate: new Date().toISOString() }, this.getResponseStatus(response.data)));
                }, (error) => {
                    let resultCode = null;
                    switch (error.status) {
                        case 400:
                            return resolve(Object.assign({ endDate: new Date().toISOString() }, this.getResponseStatus(error.data)));
                        case 404:
                            resultCode = errors_1.ERROR_CODE.RESSOURCE_NOT_FOUND_ERROR;
                            break;
                        default:
                            resultCode = errors_1.ERROR_CODE.UNKNOW_ERROR;
                    }
                    console.log(error);
                    reject(resultCode);
                });
            })
                .catch((error) => reject(error));
        });
    }
    cancel(financialTransaction) {
        throw new Error("Method not implemented.");
    }
    withdrawal(financialTransaction) {
        return new Promise((resolve, reject) => {
            let token = "";
            let uuid = (0, uuid_1.v4)();
            this.getToken(this.configService.get("MOMO_API_DEFAULT_UUID"))
                .then((result) => {
                token = result;
                this.httpService.request({
                    url: `${this.configService.get("MOMO_API_PATH")}/collection/v1_0/requesttowithdraw`,
                    method: "post",
                    headers: {
                        Authorization: `Bearer ${token}`,
                        "X-Reference-Id": financialTransaction.ref,
                        "Ocp-Apim-Subscription-Key": this.configService.get("MOMO_API_PRIMARY_KEY"),
                        "X-Target-Environment": this.configService.get("MOMO_API_MODE_ENV"),
                    },
                    data: {
                        "amount": `${financialTransaction.amount}`,
                        "currency": financialTransaction.moneyCode,
                        "externalId": financialTransaction.ref,
                        "payer": {
                            "partyIdType": "MSISDN",
                            "partyId": financialTransaction.userRef.account
                        },
                        "payerMessage": `Une transaction de ${financialTransaction.amount} ${financialTransaction.moneyCode} a été fait depuis votre compte`,
                        "payeeNote": `Une transaction de ${financialTransaction.amount} ${financialTransaction.moneyCode} a été fait vers votre compte`
                    }
                })
                    .pipe((0, rxjs_1.map)((response) => response.data))
                    .subscribe((data) => resolve({ token, error: enum_1.FinancialTransactionErrorType.NO_ERROR }), (error) => {
                    reject(error);
                });
            })
                .catch((error) => reject(error));
        });
    }
    checkWithdrawal(financialTransaction) {
        return new Promise((resolve, reject) => {
            this.getToken(this.configService.get("MOMO_API_DEFAULT_UUID"))
                .then((result) => {
                this.httpService.request({
                    url: `${this.configService.get("MOMO_API_PATH")}/collection/v1_0/requesttowithdraw/${financialTransaction.ref}`,
                    method: "get",
                    headers: {
                        Authorization: `Bearer ${result}`,
                        "X-Reference-Id": financialTransaction.ref,
                        "Ocp-Apim-Subscription-Key": this.configService.get("MOMO_API_PRIMARY_KEY"),
                        "X-Target-Environment": this.configService.get("MOMO_API_MODE_ENV"),
                    }
                })
                    .subscribe((response) => {
                    let r = { endDate: new Date().toISOString() };
                    switch (response.data.status) {
                        case mtn_money_enum_1.MtnResponseStatus.SUCCESSFUL:
                            r["status"] = enum_1.FinancialTransactionState.FINANCIAL_TRANSACTION_SUCCESS;
                            r["error"] = enum_1.FinancialTransactionErrorType.NO_ERROR;
                            break;
                        case mtn_money_enum_1.MtnResponseStatus.FAILED:
                            switch (response.data.reason.code) {
                                case mtn_money_enum_1.MtnResponseStatus.PAYER_NOT_FOUND:
                                    r["status"] = enum_1.FinancialTransactionState.FINANCIAL_TRANSACTION_ERROR;
                                    r["error"] = enum_1.FinancialTransactionErrorType.BUYER_NOT_FOUND_ERROR;
                                    break;
                                case mtn_money_enum_1.MtnResponseStatus.PAYEE_NOT_FOUND:
                                    r["status"] = enum_1.FinancialTransactionState.FINANCIAL_TRANSACTION_SUCCESS;
                                    r["error"] = enum_1.FinancialTransactionErrorType.RECEIVER_NOT_FOUND_ERROR;
                                    break;
                                default:
                                    r["status"] = enum_1.FinancialTransactionState.FINANCIAL_TRANSACTION_ERROR;
                                    r["error"] = enum_1.FinancialTransactionErrorType.UNKNOW_ERROR;
                            }
                            break;
                        case mtn_money_enum_1.MtnResponseStatus.PENDING:
                            r["status"] = enum_1.FinancialTransactionState.FINANCIAL_TRANSACTION_PENDING;
                            r["error"] = enum_1.FinancialTransactionErrorType.NO_ERROR;
                    }
                    resolve(r);
                }, (error) => {
                    console.log("Error ", error);
                    reject(error);
                });
            })
                .catch((error) => reject(error));
        });
    }
};
MtnMoneyStrategyPayment = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [config_1.ConfigService, axios_1.HttpService])
], MtnMoneyStrategyPayment);
exports.MtnMoneyStrategyPayment = MtnMoneyStrategyPayment;
//# sourceMappingURL=mtn-money.strategy.js.map