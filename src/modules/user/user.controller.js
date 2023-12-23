const createHttpError = require("http-errors");
const autoBind = require("../../../node_modules/auto-bind/index");
const userService = require("./user.service");
const userMessages = require("./userMessages");
const CookieEnum = require('../../common/constant/cookie.enum');

class UserController {
    #service;

    constructor(){
        autoBind(this);
        this.#service = userService;
    }

    async whoAmI(req,res,next){
        try {
            const user = req.user;
           return res.json(user)
        } catch (error) {
            next(error)
        }
    }

    

}


module.exports = new UserController();