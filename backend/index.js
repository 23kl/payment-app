const express = require("express");
const mainRouter=require("./routes/index")
const cors=require("cors")
const app=express();
const port=3000;
app.use(cors()) // middleware shoudl be before the actual routes
app.use(express.json()) // to allow input in json body
app.use("/api/v1",mainRouter) // route request with /api/v1 to another router 


app.listen(port,function(){
    console.log("app is running on port"+port)
})

