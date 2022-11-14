const {redirect} = require ("express/lib/response");
const mongoose = require("mongoose");
//import mongoose from 'mongoose';
//const { Schema } = mongoose;

//const { Document, Schema, model, Query, mongoose, Model }= require ("mongoose");

const relatedProduct = mongoose.model(
    "RelatedProduct",
    mongoose.Schema(
        {
            product:{
                type:mongoose.Schema.Types.ObjectId,
                ref:"Product"
            },
            relatedProduct:{
                type:mongoose.Schema.ObjectId,
                ref:"Product"
            }
        },
        {
            toJson: {
                transform: function(doc, ret){
                    delete ret._id;
                    delete ret._v;
                }
            },
            timestamps:true
        }
    )
);

module.exports = {
    relatedProduct
};