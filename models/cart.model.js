const mongoose = require("mongoose");

const cart = mongoose.model(
    "Cart",
    mongoose.Schema(
        {
            userId:{
                type:String,
                require:true
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
                        required: true
                    },
                    grandTotal:{
                        type:Number,
                        required:false
                    },

                }
            ]
        },{

            toJSON: {
                transform:function(model, ret){
                    ret.cartId = ret._id.toString();
                    delete ret._id;
                    delete ret.v;
                }

            }

        },
        {
            timestamps: true
        }
      
    )
);

module.exports={
    cart
};