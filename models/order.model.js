const mongoose = require("mongoose");


const OrderSchema = new mongoose.Schema(
    {
        userId:{
            type:String,
            required: true
        },
        cartId:{
            type:String,
            required:true
        },

      
        
        products:[
            {

               product:{
                    type:mongoose.Schema.Types.ObjectId,
                    ref:"Product",
                    required: true
                },
                qty:{
                    type: Number,
                    default:1,
                },
    

            },

       
        ],
        phone:{
            type:String,
        },
        address:{
            type:String,
            required:true,
        },
        grandTotal:{
            type:Number,
            required:true
        },
        orderStatus:{
            type:String,
            default:"pending"
        },
     
          
        
    },{

        toJSON: {
            transform:function(model, ret){
                ret.productId = ret._id.toString();
                delete ret._id;
                delete ret.v;
            }

        }

    },
    {timestamps:true}
);

module.exports = mongoose.model("Order", OrderSchema);
