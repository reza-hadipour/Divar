/**
 * @swagger
 * 
 * tags:
 *  name: Auth
 *  description: Auth Module and Routes
 */

/**
 * @swagger
 * components:
 *  schemas:
 *      SendOTP:
 *          type: object
 *          required:
 *              -   mobile
 *          properties:
 *              mobile:
 *                  type: string
 *                  example: '09121234567'
 *      CheckOTP:
 *          type: object
 *          required:
 *              -   mobile
 *              -   code
 *          properties:
 *              mobile:
 *                  type: string
 *                  example: '09121234567'
 *              code:
 *                  type: string
 *                  example: '12345'
 */


/**
 * @swagger
 * /auth/send-otp:
 *  post:
 *      summary: Login with OTP
 *      tags:
 *          -   Auth
 *      requestBody:
 *          content:
 *              application/x-www-form-urlencoded:
 *                  schema:
 *                      $ref: '#components/schemas/SendOTP'
 *              application/json:
 *                  schema:
 *                      $ref: '#components/schemas/SendOTP'
 *      responses:
 *          200:
 *              description: Success Response
 * 
 * /auth/check-otp:
 *  post:
 *      summary: Check OTP to login
 *      tags:
 *          -   Auth
 *      requestBody:
 *          content:
 *              application/x-www-form-urlencoded:
 *                  schema:
 *                      $ref: '#components/schemas/CheckOTP'
 *              application/json:
 *                  schema:
 *                      $ref: '#components/schemas/CheckOTP'
 *      responses:
 *          200:
 *              description: Success Response
 *
 * 
 * /auth/logout:
 *  get:
 *      summary: User logout
 *      tags:
 *          -   Auth
 *      responses:
 *          200:
 *              description: Success Response
 */