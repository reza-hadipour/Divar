const autoBind = require("auto-bind");
const postService = require("./post.service");
const { PostMessage } = require('./post.message');
const { CategoryModel } = require('../category/category.model');
const createHttpError = require("http-errors");
const {Types} = require('mongoose');
const { default: axios } = require("axios");
const { getAddressDetail } = require("../../common/utils/http");
const { removePropertyInObject } = require("../../common/utils/functions");


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
            let options = [];
            let categoryId;

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

                match = {
                    parent: category[0]._id
                }

                showBack = true;

                
                if(category[0].parent.length > 0){
                    parentSlug = category[0].parent[0].slug;
                }else{
                    parentSlug = "root"
                }

                if(parentSlug != "root"){
                    options = await this.#service.getCategoryOptions(category[0]._id)
                    categoryId = (category[0]._id).toString();
                }

            }

            // Get all categories
            const categories = await CategoryModel.aggregate([
                {
                    $match: match
                }
            ])
            //  console.log(categories);

            res.render("./pages/panel/create-post.ejs", {
                categories,
                showBack,
                parentSlug,
                options,
                categoryId
            })

        } catch (error) {
            next(error)
        }
    }

    async create(req,res,next){
        try {
            // console.log(req.body);
            const {title_post: title, description: content, category, lat, lng, amount} = req.body;
            const {address, province, city, district} = await getAddressDetail(lat,lng);

            // delete req.body['title_post'];
            // delete req.body['description'];
            // delete req.body['category'];
            // delete req.body['lat'];
            // delete req.body['lng'];
            // delete req.body['amount'];
            // delete req.body['images'];

            const options = await removePropertyInObject(req.body, ['title_post','description','category','lat','lng','amount','images']);  //req.body; // JSON.parse(JSON.stringify(req.body));
            // console.log(options);

            this.#service.create({
                title,
                content,
                coordinate: [lat,lng],
                amount,
                category: new Types.ObjectId(category),
                images: [],
                address,
                province,
                city,
                district,
                options
            });
            return res.json(options)
            return res.json('Advertisement is published')
        } catch (error) {
            next(error)
        }
    }
}

module.exports = new PostController();