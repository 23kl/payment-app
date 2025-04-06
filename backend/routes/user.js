const express=require("express");
const zod=require("zod");
const router=express.Router();
const {User}=require("../db");
const {Account}=require("../db");
const jwt=require("jsonwebtoken");
const {JWT_SECRET}=require("../config") // previously you were importing the object now you are importing string
const {authMiddleware}=require("../middleware");
// Atomicity should be handled carefully in this project while transferring funds

const signUpSchema=zod.object({
    username:zod.string(),
    password:zod.string(),
    firstName:zod.string(),
    lastName:zod.string(),
})

const signInSchema=zod.object({
    username:zod.string(),
    password:zod.string()
})

const updateSchema=zod.object({
username:zod.string().optional(),
password:zod.string().optional(),
firtsname:zod.string().optional()
})

router.post('/signup',async (req,res)=>{
    const body=req.body;

    const {success}=signUpSchema.safeParse(body); // checking whether user input matches with schema created
    if(!success){
       return res.json({
            message:"Incorrect Inputs"
        })
    }

    const user =await User.findOne({ // checking if username already exist
        username:body.username
    })

    if(user){
        return res.json({
            message:"Email AAlready Taken"
        })
    }

   const dbUser= await User.create(body);
   const userId=dbUser._id

   await Account.create({
    userId,
    balance:1+Math.random()*10000
   })

   const token=jwt.sign({
    userId:dbUser._id, // get the id
   },JWT_SECRET)

    return res.json({
        msg:"User Created Successfully",
        token:token
    })

})

router.post('/signin',async (req,res)=>{
const body=req.body;
const {success} = signInSchema.safeParse(body);

if(!success){
    return res.json({
        msg:"Invalid Inputs"
    })
}

const user = await User.findOne({ 
    username: body.username, 
    password: body.password,  
}
)

if (!user) {
    return res.status(401).json({
        message: "Invalid username or password"
    });
}

const token=jwt.sign({
    userId:user._id, // get the id
   },JWT_SECRET)

return res.json({
    msg:"Login Successfully",
    token:token

})
})

router.put('/update',authMiddleware,async (req,res)=>{
const body=req.body;
const {success}=updateSchema.safeParse(body);

if(!success){
    return res.status(400).json({
        msg:"Error while updating information"
    })
}

await User.updateOne({
id:req.userId
})

res.json({
    msg:"Credentials Updated"
})
})

router.get('/bulk', async (req, res) => { // searching filter
    try {
        const filter = req.query.filter || ""; // empty string is passed so that is user is not passing anything we will show all users to him

        // Find all users whose firstName or lastName matches the filter using regex
        const users = await User.find({
            $or: [
                { firstName: { "$regex": filter, "$options": "i" } }, // Case-insensitive search
                { lastName: { "$regex": filter, "$options": "i" } }
            ]
        });

        // If no users are found, return an empty array
        if (!users.length) {
            return res.status(404).json({ message: "No users found" });
        }

        // Map users to return selected fields,ensure password is not returned
        res.json({
            users: users.map(user => ({
                username: user.username,
                firstName: user.firstName,
                lastName: user.lastName,
                _id: user._id
            }))
        });

    } catch (error) {
        res.status(500).json({ message: "Server Error", error: error.message });
    }
});

module.exports=router
