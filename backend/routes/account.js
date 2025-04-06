const express=require("express")
const { authMiddleware } = require("../middleware")
const { Account } = require("../db")
const { default: mongoose } = require("mongoose")
const router=express.Router()
// We need to ensure Atomicity i.e if a transaction happens it should happen completely or should not happen at all

router.get('/balance',authMiddleware,async (req,res)=>{ // for showing balance on frontend
  const account=await Account.findOne({
    userId:req.userId // accessing the user id through middleware 
  })

if(!account){
    return res.status(403).json({
        msg:"Incorrect Credentials"
    })
}

res.json({
    balance:account.balance
})
})


router.post("/transfer",authMiddleware,async (req,res)=>{ // body{ Balance,to}
    const session=await mongoose.startSession();

    session.startTransaction();

    const{amount,to}=req.body;

    const account=await Account.findOne({userId:req.userId}).session(session);

    if(!account || account.balance<amount){
       await session.abortTransaction();
        return res.status(400).json({
            msg:"Insufficient Balance or account doesn't exist "
        })
    }

    const toAccount=await Account.findOne({userId:to}).session(session);

    if(!toAccount){
        await session.abortTransaction();
        return res.status(400).json({
            msg:"Invalid Account"
        })
    }

    await Account.updateOne({userId:req.userId},{$inc:{balance:-amount}}).session(session)
    await Account.updateOne({userId:to},{$inc:{balance:amount}}).session(session)

    await session.commitTransaction();
    res.json({
        msg:"Money Transfered"
    })

})g


module.exports=router