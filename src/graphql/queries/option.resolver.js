const { GraphQLList, GraphQLString, GraphQLNonNull } = require("graphql")
const { OptionType } = require("../typeDefs/option.type")
const { OptionModel } = require("../../modules/option/option.model")
const { isValidObjectId } = require("mongoose")

const {findByCategoryId} = require('../../modules/option/option.service');

const OptionResolver = {
    type: new GraphQLList(OptionType),
    resolve: async ()=>{
        const options = await OptionModel.find({}).populate('category').exec()
        return options;
    }
}

const OptionById = {
    type: OptionType,
    args : {
        id : {type: new GraphQLNonNull(GraphQLString)}
    },
    resolve: async (parent,{id})=>{
        if(isValidObjectId(id)){
            const option = await OptionModel.findById(id).populate('category').exec();
            return option;
        }
        return null;
    }
}

const OptionByCatIdResolver = {
    type: new GraphQLList(OptionType),
    args : {
        catId : {type: new GraphQLNonNull(GraphQLString)}
    },
    resolve: async (parent,{catId})=>{
        if(isValidObjectId(catId)){
            // let option = await OptionModel.find({category: catId}).populate('category').exec();
            let option = findByCategoryId(catId);

            return option;
        }
        return null;
    }

}

const OptionByCatSlug = {
    type: new GraphQLList(OptionType),
    args : {
        catSlug : {type: new GraphQLNonNull(GraphQLString)}
    },
    resolve: async (parent,{catSlug:slug})=>{
        let options = await OptionModel.aggregate([
            {$lookup: {
                from: 'categories',
                localField: "category",
                foreignField: "_id",
                as: "category"
            }},
            {
                $unwind: "$category"
            },
            {
                $addFields: {
                    categorySlug : "$category.slug"
                }
            },{
                $match: {
                "category.slug" : slug
                }
            }
        ]);
        return options
    }
}

module.exports = {
    OptionResolver,
    OptionByCatIdResolver,
    OptionByCatSlug,
    OptionById
}