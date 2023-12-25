const autoBind = require("auto-bind");
const postService = require("./post.service");
const { PostMessage } = require('./post.message');
const { CategoryModel } = require('../category/category.model');
const createHttpError = require("http-errors");

class PostController {
    #service;
    constructor() {
        autoBind(this);
        this.#service = postService
    }

    async createPostPage(req, res, next) {
        try {
            let { slug } = req.query;
            let match = {
                parent: null
            }

            let showBack = false;
            let parentSlug = "root";

            if (slug && slug != "root") {
                slug = slug.trim()
                const category = await CategoryModel.aggregate([
                    {
                        $match : {slug}
                    },
                    {
                        $lookup: {
                            from: 'categories',
                            localField: 'parent',
                            foreignField: '_id',
                            as: 'parent'
                        }
                    }
                ])

                if (!category.length) throw new createHttpError.NotFound(PostMessage.notFound)
                console.log(category);

                match = {
                    parent: category[0]._id
                }

                showBack = true;

                
                if(category[0].parent.length > 0){
                    parentSlug = category[0].parent[0].slug;
                }else{
                    parentSlug = "root"
                }
            }

            // Get all categories
            const categories = await CategoryModel.aggregate([
                {
                    $match: match
                }
            ])
            // console.log(categories);

            res.render("./pages/panel/create-post.ejs", {
                categories,
                showBack,
                parentSlug
            })

        } catch (error) {
            next(error)
        }
    }
}

module.exports = new PostController();