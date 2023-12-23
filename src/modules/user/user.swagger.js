/**
 * @swagger
 * 
 * tags:
 *  name: User
 *  description: User Module and Routes
 */

/**
 * @swagger
 * components:
 *  schemas:
 *      WhoAmI:
 *          type: object
 *          required:
 *              -   mobile
 *          properties:
 *              mobile:
 *                  type: string
 *                  example: '09121234567'
 */


/**
 * @swagger
 * /user/whoami:
 *  get:
 *      summary: Get user profile
 *      tags:
 *          -   User
 *      responses:
 *          200:
 *              description: Success Response
 * 
 */

