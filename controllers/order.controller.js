const Order = require("../models/order.model");
const User = require('../models/user.model');
const {user} = require('../models/user.model');

const {cart} = require("../models/cart.model");
 //const {order} = require("../models/order.model");
const mongoose = require("mongoose");

var async = require("async");
const {product} = require("../models/product.model");


const order_create = async (req, res) => {
  // Create the Order object
  const order = new Order({
    userId: req.user.userId,
    cartId: req.body.cartId,
    products:req.body.products,
    phone: req.body.phone,
    address: req.body.address,
    grandTotal: req.body.grandTotal
  });

  // Save the Order to the database
  order.save((error) => {
    if (error) {
      res.send(error);
    } else {
      // Use the populate method to get the cart documents associated with the order
      Order.findById(order._id)
        .populate('cartId')
        .exec((error, order) => {
          if (error) {
            res.send(error);
          } else {
            res.send(order);
          }
        });
    }
  });
};

/*
const order_create =  async (req, res) =>{

    const order = new Order({
        userId: req.user.userId,
        cartId: req.body.cartId,
        phone: req.body.phone,
        address: req.body.address,
        grandTotal: req.body.grandTotal
      });
    
      // Save the Order to the database
      order.save((error) => {
        if (error) {
          res.send(error);
        } else {
          res.send(order);
        }
      });

}*/
/*
const order_create = async (req, res) => {
console.log(req.cart.cartId);
    try {
      const cart =  await cart.findOne({cartId: params.cart.cartId})
      const order = new Order({
        userId: req.user.userId,
        cartId: req.cart.cartId,
        phone: req.body.phone,
        address: req.body.address,
        grandTotal: req.body.grandTotal,
      });
  
      await order.save();
      res.send(order);
    } catch (error) {
      res.send(error);
    }
  };
*/
/*
async function order_create(req, res, params) {
    await user.findOne({userId: params.user.userId})
  
    const order = new Order({
        userId: params.user.userId,
        products: req.body.products,
        phone: req.body.phone,
        address: req.body.address,
        grandTotal: req.body.grandTotal
      });
    
      // Save the Order to the database
      order.save((error) => {
        if (error) {
          res.send(error);
        } else {
          res.send(order);
        }
      });

  }*/
const find_order = async(req, res)=>{
    try{
        const orders = await Order.find({userId: req.params.userId});
        res.status(200).json(orders);
    }catch(err){
        res.status(500).json(err);
    }
}

const get_orders = async (req, res) => {
  try {
    const orders = await Order.find().populate('userId');
    const order_list = orders.map(async(order) => {
      const userObj = await user.findById(order.userId)
      
     const products = order.products.map(async(prod)=>{
        return await product.findById(prod.product)
      })
      const productList = await Promise.all(products)
      console.log(productList)
      return {
        ...order._doc,
        user: userObj._doc,
        products:productList
       
      };
    });
    const resolvedOrders = await Promise.all(order_list);

    res.status(200).json(resolvedOrders);
  } catch (err) {
    res.status(500).json(err);
  }
};

const delete_order = async(req, res)=>{
    try{
        await Order.findByIdAndDelete(req.params.id);
        res.status(200).json("Order has been deleted..")
    }catch(err){
        res.status(500).json(err);
    }
}


module.exports = {
    order_create,
    find_order,
    get_orders ,
    delete_order
}
