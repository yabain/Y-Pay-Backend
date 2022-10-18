import { Body, Controller,HttpCode,HttpStatus,Post, Put, Req, UseGuards,Get, NotFoundException } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { Request } from "express";
import { ConfirmationEmailDTO, CreateUserDTO, ResetPasswordDTO } from "../dtos";
import { EmailConfirmedGuard, UserAuthGuard, UserJwtAuthGuard } from "../guards";
import { AuthService, UsersService } from "../services";
import { UserEmailService } from "../services/user-email.service";
import { PasswordUtil } from "../utils";

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
     * @apiError (Error 4xx) 400-BadRequest expected field was not submitted or does not have the correct type
     * @apiError (Error 4xx) 400-BadRegistrationRequest Email already exist
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
     * @apiError (Error 4xx) 401-Unauthorized Email/password incorrect
     * @apiError (Error 4xx) 400-BadRequest expected field was not submitted or does not have the correct type
     *  
     * @apiUse apiDefaultResponse
     * 
     * @apiUse apiBadRequestExampleUser
     * @apiUse apiLoginOrPasswordIncorrectExampleUser
     */
    @UseGuards(UserAuthGuard)
    @HttpCode(HttpStatus.OK)
    @Post("login")    
    async login(@Req() request:Request)
    {
        // await this.userEmailService.sendTestEmail(request.user)
        return {
            statusCode:HttpStatus.OK,
            message:"Authentication Success",
            data:{
                ...this.authService.login(request.user),
                user:request.user
    
            }
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

    /**
     * @api {put} /user/auth/reset-password reset user password
     * @apiDescription reset user password
     * @apiName Reset password
     * @apiGroup User
     * @apiUse ResetPassword
     * 
     * @apiSuccess (200 Ok) {Number} statusCode HTTP status code
     * @apiSuccess (200 Ok) {String} Response Description
     
     * 
     * @apiError (Error 4xx) 401-Unauthorized Token not supplied/invalid token 
     * @apiError (Error 4xx) 400-BadRequest expected field was not submitted or does not have the correct type
     *  
     * @apiUse apiDefaultResponse
     * 
     * @apiUse apiBadRequestExampleResetPassword
     */
    @UseGuards(UserJwtAuthGuard)
    @Put("reset-password")
    async resetPassword(@Req() request:Request, @Body() resetPasswordDTO:ResetPasswordDTO)
    {
        await this.usersService.update({"email":request.user["email"]},{password:resetPasswordDTO.password})
        return {
            statusCode:HttpStatus.OK,
            message:"Password updated successfully"
        }
    }


    /**
     * @api {post} /user/auth/reset-password-link reset user password
     * @apiDescription reset user password
     * @apiName Reset password
     * @apiGroup User
     * @apiUse ResetPassword
     * 
     * @apiSuccess (200 Ok) {Number} statusCode HTTP status code
     * @apiSuccess (200 Ok) {String} Response Description
     
     * 
     * @apiError (Error 4xx) 401-Unauthorized Token not supplied/invalid token 
     * @apiError (Error 4xx) 400-BadRequest expected field was not submitted or does not have the correct type
     *  
     * @apiUse apiDefaultResponse
     * 
     * @apiUse apiBadRequestExampleResetPassword
     */
    @Post("reset-password-link")
    async sendResetPasswordMail(@Body() emailDTO:ConfirmationEmailDTO)
    {
        let data = await this.usersService.findOneByField({"email":emailDTO.email})
        if(!data) throw new NotFoundException({
            statusCode: 404,
            error:"NotFound",
            message:["User not found"]
        })

        await this.userEmailService.sendResetPasswordEmail(data);
        return {
            statusCode:HttpStatus.OK,
            message:"password reset link sent by email with success"
        }
    }
   
   
}