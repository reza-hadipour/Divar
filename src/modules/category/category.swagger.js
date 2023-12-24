/**
 * @swagger
 *  Tag:
 *      name: Category
 *      description: Category Module and Routes
 */

/** 
 * @swagger
 * components:
 *  schemas:
 *      CreateCategory:
 *          type: object
 *          required:
 *              -   name
 *              -   icon
 *          properties:
 *              name:
 *                  type: string
 *                  example: "املاک"
 *              slug:
 *                  type:   string
 *                  example:    "real_estate"
 *              icon:
 *                  type:   string
 *              parent:
 *                  type:   string
 */

/**
 * @swagger
 * /category:
 *  post:
 *      summary: Create new category
 *      tags:
 *          -   Category
 *      requestBody:
 *          content:
 *              application/x-www-form-urlencoded:
 *                  schema:
 *                      $ref: '#/components/schemas/CreateCategory'
 *              application/json:
 *                  schema:
 *                      $ref: '#/components/schemas/CreateCategory'
 *      responses:
 *          201:
 *              description:    Create a category successfully
 * 
 *  get:
 *      summary: Get list of categories
 *      tags:
 *          -   Category
 *      responses:
 *          200:
 *              description:    List of categories
 * 
 */