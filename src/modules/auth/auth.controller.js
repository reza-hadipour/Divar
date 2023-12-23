const createHttpError = require("http-errors");
const autoBind = require("../../../node_modules/auto-bind/index");
const authService = require("./auth.service");
const authMessages = require("./authMessages");
const NodeEnv = require('../../common/constant/env.enum');
const CookieEnum = require("../../common/constant/cookie.enum");

class AuthController {
    #service;

    constructor(){
        autoBind(this);
        this.#service = authService;
    }

    async sendOTP(req,res,next){
        try {
            const {mobile} = req.body;
            await this.#service.sendOTP(mobile)
                return res.json({
                    message: authMessages.sendOTPSuccessfully
                });
        } catch (error) {
            next(error)
        }
    }

    async checkOTP(req,res,next){
        try {
            const {mobile, code} = req.body;
            let accessToken = await this.#service.checkOTP(mobile,code);

            res.cookie(CookieEnum.AccessToken, accessToken,{
                httpOnly: true,
                secure: process.env.NODE_ENV === NodeEnv.Production
            });

            return res.status(200).json({
                message: authMessages.loginSuccessfully
            })
        } catch (error) {
            next(error)
        }
    }

    async logout(req,res,next){
        try {
           return res.clearCookie(CookieEnum.AccessToken).status(200).json({
            message: authMessages.loggedOutSuccessfully
           })
        } catch (error) {
            next(error)
        }
    }

}


module.exports = new AuthController();