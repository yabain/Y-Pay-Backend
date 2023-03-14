"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = () => ({
    port: parseInt(process.env.PORT, 10) || 3000,
    mongoURI: process.env.MONGO_DATABASE_URL,
    NODE_ENV: process.env.NODE_ENV,
    MOMO_API_DEFAULT_UUID: process.env.MOMO_API_DEFAULT_UUID,
    MOMO_API_PRIMARY_KEY: process.env.MOMO_API_PRIMARY_KEY,
    MOMO_API_SECONDARY_KEY: process.env.MOMO_API_SECONDARY_KEY,
    MOMO_API_KEY: process.env.MOMO_API_KEY,
    MOMO_API_PATH: process.env.MOMO_API_PATH,
    MOMO_API_MODE_ENV: process.env.MOMO_API_MODE_ENV,
    OM_API_PATH: process.env.OM_API_PATH,
    OM_API_USERNAME: process.env.OM_API_USERNAME,
    OM_API_PASSWORD: process.env.OM_API_PASSWORD,
    OM_API_CONSUMER_KEY: process.env.OM_API_CONSUMER_KEY,
    OM_API_CONSUMER_SECRET: process.env.OM_API_CONSUMER_SECRET,
    SECRET_ENCRIPTION_ALGORITHM: process.env.SECRET_ENCRIPTION_ALGORITHM,
    SECRET_ENCRIPTION_KEY: process.env.SECRET_ENCRIPTION_KEY,
    AWS_SDK_REGION: process.env.AWS_SDK_REGION,
    AWS_SDK_PROFILE: process.env.AWS_SDK_PROFILE,
    AWS_SDK_ACCESS_KEY: process.env.AWS_SDK_ACCESS_KEY,
    AWS_SDK_SECRET_KEY: process.env.AWS_SDK_SECRET_KEY,
    NO_REPLY_EMAIL_SENDER: "no-reply@y-nkap.com",
    TEAM_EMAIL_SENDER: "team@y-nkap.com",
    EMAIL_TEMPLATE_NEW_REGISTRATION: "Y-NKAP_WELCOME_TEMPLATE",
    EMAIL_TEMPLATE_ACCOUNT_CONFIRMATION: "Y-NKAP_CONFIRM_EMAIL_TEMPLATE",
    EMAIL_TEMPLATE_RESET_PASSWORD: "Y-NKAP_RESET_PASSWORD_EMAIL_TEMPLATE",
    PUBLIC_FRONTEND_URL: process.env.PUBLIC_FRONTEND_URL,
    AWS_SDK_UPLOAD_FILE_BUCKET_NAME: process.env.AWS_SDK_UPLOAD_FILE_BUCKET_NAME,
    OM_API_AUTHORIZATION_HEADER: process.env.OM_API_AUTHORIZATION_HEADER
});
//# sourceMappingURL=configuration.js.map