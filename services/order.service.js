const { user } = require("../models/user.model");
const { order } = require("../models/order.model");

const cartService = require("../services/cart.service");
const { response } = require("express");
const { model } = require("mongoose");

async function createOrder(params, callback){
    user.findOne({_id: params.userId}, async function(err, userDB){

        if(err){
            return callback(err);
        } else {
         await   cartService.getCart({userId: userDB.id}, async function(err, cartDB){
               if(err){
                return callback(err);
               } 
               else{
                if(cartDB){
                    var products = [];
                    var grandTotal = 0;

                  await  cartDB.products.forEach(product=>{
                       products.push({
                        product: product.product._id,
                        qty: product.qty,
                        amount: product.product.productSalePrice,

                       });

                       grandTotal += product.product.productSalePrice;
                    });

                    const orderModel = new order({
                        userId: cartDB.userId,
                        products: products,
                        orderStatus: "pending",
                        grandTotal: grandTotal
                    });

                    orderModel
                    .save
                    .then((response)=>{
                        model.orderId = response._id;
                        return callback(null, model);
                    })
                    .catch((error)=>{
                        return callback(error);
                    });
                }
               }
            });
        }

    });
}

async function updateOrder(params, callback){
    var model= {
        orderStatus:params.status,
    };

    order.findByIdAndUpdate(params.orderId, model, { useFindAndModify: false})
         .then((response)=>{
            if(!response){
                callback('Order Update Failed');
            }else{
                if(params.status == "success"){
                    //Clear The Cart
                }

                return callback(null, response);
            }
         })
         .catch((error)=>{
            return callback(error);;
         });
}

async function getOrders(params, callback){
    order.findOne({userId: params.userId})
    .populate({
        path:'products',
        model:'Product',
        populate:{
            path:'category',
            model:'Category',
            select:'CategoryName'

        }
        
    })
    .then((response)=> {
        return callback(null, response);
    })
    .catch((error)=> {
        return callback(error);
    });
}

module.exports = {
    createOrder,
    updateOrder,
    getOrders
}