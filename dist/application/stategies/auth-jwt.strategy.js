"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthJwtStrategy = void 0;
const passport_1 = require("@nestjs/passport");
const passport_jwt_1 = require("passport-jwt");
const config_1 = require("../../shared/config");
class AuthJwtStrategy extends (0, passport_1.PassportStrategy)(passport_jwt_1.Strategy) {
    constructor() {
        super({
            jwtFromRequest: passport_jwt_1.ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration: false,
            secretOrKey: config_1.JWT_CONSTANT.secret
        });
    }
    async validate(payload) {
        return { clientId: payload.clientId, userId: payload.sub, appId: payload.sub };
    }
}
exports.AuthJwtStrategy = AuthJwtStrategy;
//# sourceMappingURL=auth-jwt.strategy.js.map