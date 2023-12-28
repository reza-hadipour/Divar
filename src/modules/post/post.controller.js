const autoBind = require("auto-bind");
const postService = require("./post.service");
const { PostMessage } = require('./post.message');
const { CategoryModel } = require('../category/category.model');
const createHttpError = require("http-errors");
const {Types, isValidObjectId} = require('mongoose');
const { default: axios } = require("axios");
const { getAddressDetail } = require("../../common/utils/http");
const { removePropertyInObject } = require("../../common/utils/functions");
const utf8 = require('utf8');


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
            // console.log(req?.files);
            const user = req?.user?._id;
            if (!isValidObjectId(user)) throw new createHttpError(PostMessage.invalidRequest);

            const images = req?.files?.map(image => image?.path?.slice(7).replace(/\\/g,'/'));
            
            const {title_post: title, description: content, category, lat, lng, amount} = req.body;
            const {address, province, city, district} = await getAddressDetail(lat,lng);
            // const [address, province, city, district] = ["address","tehran","tehran","1"];

            // delete req.body['title_post'];
            // delete req.body['description'];
            // delete req.body['category'];
            // delete req.body['lat'];
            // delete req.body['lng'];
            // delete req.body['amount'];
            // delete req.body['images'];
            // console.log(req.body);

            const options = removePropertyInObject(req.body, ['title_post','description','category','lat','lng','amount']);  //req.body; // JSON.parse(JSON.stringify(req.body));
            // const options =  JSON.parse(JSON.stringify(req.body));
            
            for (let key in options) {
                let value = options[key];
                delete options[key];
                key = utf8.decode(key);
                options[key] = value;
            }
            // console.log(options);

            
            await this.#service.create({
                user,
                title,
                content,
                coordinate: [lat,lng],
                amount,
                category: new Types.ObjectId(category),
                images,
                address,
                province,
                city,
                district,
                options
            });
            
            req.flash('success_message',PostMessage.createPostSuccessfully);
            return res.redirect('/post/my');

        } catch (error) {
            next(error)
        }
    }

    async findMyPost(req,res,next){
        const user = req?.user?._id;
        if (!isValidObjectId(user)) throw new createHttpError(PostMessage.invalidRequest);

        let posts = await this.#service.findMyPosts(user);
        let success_message = req.flash('success_message');

        res.render("./pages/panel/posts.ejs",
        {
            posts,
            success_message
        })
    }

    async remove(req,res,next){
        try {
            const {id} = req.params;
            const result =  await this.#service.remove(id);
            if(result.deletedCount == 1) req.flash('success_message', PostMessage.deletePostSuccessfully);
            return res.redirect('/post/my');
        } catch (error) {
            next(error)
        }
    }

    async showPost(req,res,next){
        try {
            const {id} = req.params;
            const post = await this.#service.checkExist(id);

            res.locals.layout = "./layouts/website/main.ejs";
            return res.render("./pages/home/post.ejs",{post});

        } catch (error) {
            next(error)
        }
    }

    async postList(req,res,next){
        try {
            let query = req?.query;
            const posts = await this.#service.findAll(query);
            res.locals.layout = "./layouts/website/main.ejs";
            return res.render("./pages/home/index.ejs", {posts})
        } catch (error) {
            next(error)
        }
    }
    
}

module.exports = new PostController();