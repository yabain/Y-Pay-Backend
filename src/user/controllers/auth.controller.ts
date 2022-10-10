import { Body, Controller,HttpCode,HttpStatus,Post, Req, UseGuards,Get } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { Request } from "express";
import { CreateUserDTO } from "../dtos";
import { EmailConfirmedGuard, UserAuthGuard, UserJwtAuthGuard } from "../guards";
import { AuthService, UsersService } from "../services";
import { UserEmailService } from "../services/user-email.service";

@ApiTags("User Authentification")
@Controller("user/auth")
export class AuthController
{
    constructor(
        private readonly usersService:UsersService,
        private authService:AuthService,
        private userEmailService:UserEmailService
    ){}

    /**
     * @api {post} /user/auth/register register new user
     * @apiDescription register new user
     * @apiName Registration
     * @apiGroup User
     * @apiUse CreateUserDTO
     * 
     * @apiSuccess (201 Created) {Number} statusCode HTTP status code
     * @apiSuccess (201 Created) {String} Response Description
     * @apiSuccess (201 Created) {Object} data response data
     * @apiSuccess (201 Created) {String} data._id User id
     * @apiSuccess (201 Created) {String} data.firstName User firstname
     * @apiSuccess (201 Created) {String} data.lastName User lastname
     * @apiSuccess (201 Created) {String} data.email User email
     * @apiSuccess (201 Created) {Boolean} data.emailConfirmed is it a valid user account?
     * @apiSuccess (201 Created) {String} data.profilPicture user picture profile
     * @apiSuccess (201 Created) {String} data.country user country
     * @apiSuccess (201 Created) {String} data.location user location
     * @apiSuccess (201 Created) {String} data.permissions user permission
     * @apiSuccess (201 Created) {String} data.createAt Account creation date 
     * 
     * @apiUse apiDefaultResponse
     * @apiUse apiBadRequestExampleUser
     */
    @Post("register")
    async register(@Body() createUserDTO:CreateUserDTO)
    {
        let userCreated=await this.usersService.create(createUserDTO)
        await this.userEmailService.sendNewUserEmail(userCreated);
        await this.userEmailService.sendConfirmationEmail(userCreated);
        return {
            statusCode:201,
            message:"User Created",
            data:userCreated
        };
    }

    /**
     * @api {post} /user/auth/login loggin user
     * @apiDescription loggin user
     * @apiName Login
     * @apiGroup User
     * @apiUse LoginUserDTO
     * 
     * @apiSuccess (200 Ok) {Number} statusCode HTTP status code
     * @apiSuccess (200 Ok) {String} Response Description
     * @apiSuccess (200 Ok) {Object} data response data
     * @apiSuccess (200 Ok) {Object} data.user User information
     * @apiSuccess (200 Ok) {String} data.user._id User id
     * @apiSuccess (200 Ok) {String} data.user.firstName User firstname
     * @apiSuccess (200 Ok) {String} data.user.lastName User lastname
     * @apiSuccess (200 Ok) {String} data.user.email User email
     * @apiSuccess (200 Ok) {Boolean} data.user.emailConfirmed is it a valid user account?
     * @apiSuccess (200 Ok) {String} data.user.profilPicture user picture profile
     * @apiSuccess (200 Ok) {String} data.user.country user country
     * @apiSuccess (200 Ok) {String} data.user.location user location
     * @apiSuccess (200 Ok) {String} data.user.permissions user permission
     * @apiSuccess (200 Ok) {String} data.user.createAt Account creation date
     *  
     * @apiSuccess (200 Ok) {String} data.access_token User access token 
     * 
     * @apiUse apiDefaultResponse
     */
    @UseGuards(UserAuthGuard)
    @HttpCode(HttpStatus.OK)
    @Post("login")    
    async login(@Req() request:Request)
    {
        let data:Record<string,any> = {
            ...this.authService.login(request.user),
            user:request.user

        }
        // await this.userEmailService.sendConfirmationEmail(data["access_token"])
        return {
            statusCode:HttpStatus.OK,
            message:"Authentication Success",
            data
        }
    }

    @UseGuards(UserJwtAuthGuard)
    @UseGuards(EmailConfirmedGuard)
    @Get("refresh")
    async refreshToken()
    {

    }

    @UseGuards(UserJwtAuthGuard)
    @UseGuards(EmailConfirmedGuard)
    @Get("logout")
    async logout()
    {

    }

   
}