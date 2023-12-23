const autoBind = require("auto-bind");
const userModel = require("../user/user.model");
const createHttpError = require("http-errors");
const authMessages = require("./authMessages");
const {randomInt} = require('crypto');
const jwt = require('jsonwebtoken');

class AuthService {
    #model;

    constructor(){
        autoBind(this);
        this.#model = userModel;
    }

    async sendOTP(mobile){
        const user = await this.#model.findOne({mobile});
        const now =  new Date().getTime()
        const otp = {
            code: randomInt(10000,99999),
            expiresIn: now + (1000*60*2)
        }
        
        if(!user){
            let newUser = await this.#model.create({mobile,otp: otp})
            // throw new Error('Test Error',{cause: 'authService'})
            return newUser;
        }

        if (user.otp && user.otp.expiresIn > now) {
            throw new createHttpError.BadRequest(authMessages.otpCodeNotExpired);
        }

        user.otp = otp;
        await user.save();
        return user;
        
    }

    async checkOTP(mobile,code){
        let user = await this.checkUserExistByMobile(mobile);
        let now = new Date().getTime();

        if(user?.otp?.expiresIn < now) throw new createHttpError.Unauthorized(authMessages.otpCodeExpired);
        if(user?.otp?.code !== code) throw new createHttpError.Unauthorized(authMessages.otpCodeIsIncorrect);

        if(!user.verifiedMobile){
            user.verifiedMobile = true;
            await user.save();
        }

        let accessToken = this.signToken({mobile, id: user.id});
        return accessToken;
       
    }


    async checkUserExistByMobile(mobile){
        const user = await this.#model.findOne({mobile});
        if(!user) throw new createHttpError.NotFound(authMessages.userNotFount)
        return user
    }

    signToken(payload){
        return jwt.sign(payload,process.env.JWT_SECRET_KEY,{expiresIn: "1day"});
    }

}

module.exports = new AuthService()