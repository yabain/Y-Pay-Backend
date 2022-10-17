import { Controller, Get,Delete, UseGuards, Req, Param, HttpStatus, NotFoundException } from "@nestjs/common";
import { UserAuthGuard } from "../guards";
import { Request } from "express"
import { ObjectIDValidationPipe } from "src/shared/pipes";
import { UsersService } from "../services";

@Controller("/user")
export class UserController
{
    constructor(
        private userService:UsersService
    ){}
    /**
     * @api {post} /user/profil/:id Get user by id
     * @apidescription Get user details by id
     * @apiParam {String} id Users unique ID
     * @apiName Get profil
     * @apiGroup User
     * @apiUse apiSecurity
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
     * @apiError (Error 4xx) 401-Unauthorized Token not supplied/invalid token 
     * @apiError (Error 4xx) 404-NotFound User not found
     * @apiUse apiError
     */
    @UseGuards(UserAuthGuard)
    @Get("/profil/:id")
    async getUserProfilById(@Req() request:Request, @Param("id",ObjectIDValidationPipe) id:string)
    {
        let data = await this.userService.findOneByField({"_id":id})
        if(!data) throw new NotFoundException({
            statusCode: 404,
            error:"NotFound",
            message:["User not found"]
        })
        return {
            statusCode:HttpStatus.OK,
            message:"User details",
            data
        }
    }

    
}