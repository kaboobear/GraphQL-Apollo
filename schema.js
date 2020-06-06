const {GraphQLObjectType, GraphQLInt,GraphQLString,GraphQLList,GraphQLSchema,GraphQLNonNull} = require('graphql');
const axios = require('axios')
const Product = require('./models/product_model');
const Comment = require('./models/comment_model');
var ObjectID = require('mongodb').ObjectID;   

//Comment Type
const CommentType = new GraphQLObjectType({
    name:'Comment',
    fields: ()=> ({
        _id:{type:GraphQLString},
        text:{type:GraphQLString},
        product_id:{type: ProductType},
        createdAt:{type:GraphQLString}
    })
})

//Product Type
const ProductType = new GraphQLObjectType({
    name:'Product',
    fields: ()=> ({
        title:{type:GraphQLString},
        price:{type:GraphQLInt},
        count:{type:GraphQLInt},
    })
})

//Root Query
const RootQuery = new GraphQLObjectType({
    name:'RootQueryType',
    fields: {
        comments:{
            type: new GraphQLList(CommentType),
            resolve(parent,args) {
                return Comment.find().sort({'createdAt':-1}).populate('product_id');
            }
        },
        comment:{
            type: CommentType,
            args:{
                _id:{type:GraphQLString}
            },
            resolve(parent,args) {
                const id = new ObjectID(args._id)
                return Comment.findById(id).populate('product_id');
            }
        }
    }
})





//Mutations
const mutation = new GraphQLObjectType({
    name:'Mutation',
    fields:{
         addComment:{
            type: CommentType ,
            args:{
                text: {type:GraphQLNonNull(GraphQLString)},
                product_id: {type:GraphQLNonNull(GraphQLString)},
            },
            async resolve(parent,args) {
                const id = new ObjectID(args.product_id)
                const newComment =  new Comment({text:args.text,product_id:id});
                const res = await newComment.save();
                return await Comment.findById(res._id).populate('product_id');
            }
        },
        editComment:{
            type: CommentType ,
            args:{
                _id: {type:GraphQLNonNull(GraphQLString)},
                text: {type:GraphQLNonNull(GraphQLString)},
            },
            async resolve(parent,args) {
                const _id = new ObjectID(args._id);
                const res = await Comment.findByIdAndUpdate(_id,{text:args.text})
                return await Comment.findById(res._id).populate('product_id');
            }
        },
        deleteComment:{
            type: CommentType ,
            args:{
                _id: {type:GraphQLNonNull(GraphQLString)},
            },
            resolve(parent,args) {
                const _id = new ObjectID(args._id)
                return Comment.findByIdAndDelete(_id);
            }
        }
    }
})


module.exports = new GraphQLSchema({query:RootQuery,mutation});