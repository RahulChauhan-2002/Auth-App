const bcrypt=require("bcrypt");
const User=require("../models/userModel");
const jwt=require('jsonwebtoken');
require('dotenv').config();

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



exports.login = async (req,res)=>{
    try {
        const {email,password}=req.body;
        if(!email || !password){
            return res.status(400).json({
                success:false,
                message:'Please Enter all details',
            });
        }

        // check if user is not registered
        let existingUser= await User.findOne({email});
        if(!existingUser)
        {
            return res.status(401).json({
                success:false,
                message:'User is Not registered',
            });
        }


        const payload={
            email:existingUser.email,
            id:existingUser._id,
            role:existingUser.role
        }

        //if user is registered then check password is matching or not 
        if(await bcrypt.compare(password,existingUser.password))
        {
            const token=jwt.sign(payload,process.env.JWT_SECRET,{expiresIn:'2h'});
            existingUser=existingUser.toObject();
            existingUser.token=token;
            existingUser.password=undefined;
            const options={
                expires:new Date(Date.now() + 3*24*60*60*1000),
                httpOnly:true,
            }

            res.cookie('token',token,options).status(200).json({
                success:true,
                token,
                existingUser,
                message:'User Loged in successfully'
            });

        }
        else{
            return res.status(403).json({
                success:false,
                message:'Password not matched',
            });
        }
        


    } catch (error) {
        return res.status(500).json({
            success:false,
            message:'Please signup after some time.',
        });
    }
}