const bcrypt=require("bcrypt");
const User=require("../models/userModel");

exports.signup = async (req,res)=>{
    try {
        const {name,email,password,role}=req.body;
        const existingUser= await User.findOne({email});
        if(existingUser)
        {
            return res.status(400).json({
                success:false,
                message:'Email is already present',
            });
        }

        //hash pssword
        let hashedPassword;
        try {
            hashedPassword=await bcrypt.hash(password,10);
        } catch (error) {
            return res.status(500).json({
                success:false,
                message:'Error while hashing',
            });
        }

        //insert user into db after hashing
        const userData=await User.create({
            name,email,password:hashedPassword,role
        });

        return res.status(201).json({
            success:true,
            message: "User registered successfully",
        });
    } catch (error) {
        return res.status(500).json({
            success:false,
            message:'Please signup after some time.',
        });
    }
}