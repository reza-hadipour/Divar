const createHttpError = require("http-errors");
const AuthorizationMessage = require("../messages/auth.message");
const jwt = require('jsonwebtoken');
const userModel = require("../../modules/user/user.model");
const CookieEnum = require("../constant/cookie.enum");


const Authorization = async (req,res,next)=>{
    try {
        const token = req?.cookies?.access_token;
        if(!token) throw new createHttpError.Unauthorized(AuthorizationMessage.Login);
        const data = jwt.verify(token,process.env.JWT_SECRET_KEY);
        if(typeof data == 'object' && 'id' in data){
            const user = await userModel.findById(data.id,{verifiedMobile:0, otp : 0,updatedAt: 0, __v: 0,}).lean();
            if(!user) throw new createHttpError.Unauthorized(AuthorizationMessage.InvalidToken);
            req.user = user;
            return next();
        }

        throw new createHttpError.Unauthorized(AuthorizationMessage.InvalidToken)

    } catch (error) {
        next(error)
    }
}

module.exports = Authorization