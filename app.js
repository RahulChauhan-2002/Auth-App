const express=require("express");

const dbConnect=require("./config/database")
const app=express();

require('dotenv').config();
const port=process.env.PORT || 4000

app.use(express.json());
dbConnect();

const userRoute=require("./route/user");
app.use("/api/v1",userRoute);

app.listen(port,()=>{
    console.log(`server is running on port no. ${port}`)
});


