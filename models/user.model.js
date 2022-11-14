const mongoose = require('mongoose');

const {Schema} = mongoose;

const user = mongoose.model(

    "User",
    mongoose.Schema({

        fullName:{
            type: String,
            required:true
        },
      
        email:{
            type:String,
            required:true,
            unique:true,
        },
        phoneNumber:{
           type:String,
        },
        location:{
            type:String
        },
        password:{
            type:String,
            required:true
        }
    },{

        toJSON:{

            transform:function(doc, ret){
                ret.userId = ret._id.toString();
                delete ret._id;
                delete ret._v;
                delete ret.password;
            }

        }

    },
    {

        timeStamps:true

    }

  
    
    )

);


module.exports = {
    user
}