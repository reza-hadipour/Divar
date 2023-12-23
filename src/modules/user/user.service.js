const autoBind = require("auto-bind");
const userModel = require("../user/user.model");
const createHttpError = require("http-errors");
const userMessages = require("./userMessages");
const {randomInt} = require('crypto');
const jwt = require('jsonwebtoken');

class AuthService {
    #model;

    constructor(){
        autoBind(this);
        this.#model = userModel;
    }


}

module.exports = new AuthService()