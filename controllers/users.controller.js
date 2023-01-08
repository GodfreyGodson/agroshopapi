const useServices = require("../services/users.service");
const {User} = require("../models/user.model");
const {user} = require("../models/user.model");
const auth = require("../middleware/auth");

exports.register = (req, res, next)=>{
    useServices.register(req.body, (error, results)=>{
        if (error) {
            return next(error);
        }
            return res.status(200).send({

                message:"Success",
                data:results

            });
        
    });
};

exports.login = (req, res, next) =>{
    const {email, password} = req.body;

    useServices.login({email,password}, (error, results)=>{

        if(error){
            return next(error);
        }

        return res.status(200).send({

            message:"Success",
            data: results

        });

    });
};
/*
exports.get_users = async(req, res)=>{
    try{
        const users = await User.find();
        res.status(200).json(users);
    }catch(err){
        res.status(500).json(err);
    }
}*/
/*
exports.get_users = (req, res, next)=>{
  const users =  User.find({})
    .exec()
    .then(docs=>{
      res.status(200).json(docs)

    })
    .catch(err=>{
      res.status(500).json({
          error:err
      });
    });
  }
*/

  exports.findAll = (req, res, next)=>{

  
    var model = {

        userId: req.query.userId,
        email:req.query.email,
        phoneNumber: req.query.phoneNumber,
    };
    useServices.getUsers(model, (error, results)=>{
        if(error){
            return next(error);
        }
        else{
            return res.status(200).send({
                message:"Success",
                data: results,
            });
        }
    })


};



exports.get_byId = async(req, res)=>{
    const userId = req.params.id;

    user.findById(userId, function(err, foundUser) {
      if (err) {
        // handle error
        res.status(500).send(err);
      } else {
        // the foundUser variable will contain the user document
        res.send(foundUser);
      }
    });
}
