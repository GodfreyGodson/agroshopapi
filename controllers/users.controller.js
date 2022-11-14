const useServices = require("../services/users.service");

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