const User = require("../models/user.model");
const auth = require("../middleware/auth");
var async = require("async");
const userService = require("../services/users.service");

/*
exports.get_users = async(req, res)=>{
    try{
        const users = await User.find({});
        res.status(200).json(users);
    }catch(err){
        res.status(500).json(err);
    }
}*/


exports.get_users = async(req, res)=>{
    try{
        const users = await User.find();
        res.status(200).json(users);
    }catch(err){
        res.status(500).json(err);
    }
}

exports.get_byId = async(req, res)=>{
    const userId = req.params.id;

    User.findById(userId, function(err, foundUser) {
      if (err) {
        // handle error
        res.status(500).send(err);
      } else {
        // the foundUser variable will contain the user document
        res.send(foundUser);
      }
    });
}