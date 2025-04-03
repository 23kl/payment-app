const mongoose=require("mongoose")

mongoose.connect("mongodb://127.0.0.1:27017/payment-app?directConnection=true");
// first connect to mongodb , then create schema , then create model for the schema and then export it

const userSchema=new mongoose.Schema({
    username:String,
    password:String,
    firstName:String,
    lastName:String
})

const User=mongoose.model("User",userSchema)

const accountSchema=new mongoose.Schema({
    userId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User',
        required:true
    },
    balance:{
        type:Number,
        required:true
    }
})

const Account = mongoose.model("Account", accountSchema);

module.exports={
    User,
    Account
}