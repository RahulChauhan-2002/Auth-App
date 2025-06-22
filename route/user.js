const express=require("express");
const router=express.Router();

const {signup,login}=require("../controller/Sign-login");
const {auth,isStudent,isAdmin}=require('../middleware/Auth-middleware');

router.post("/signup",signup);
router.post("/login",login);


//protected test route
router.get('/test',auth,(req,res)=>{
    res.json({
        success:true,
        message:'Test page'
    });
});

//protected route for student and Admin
router.get('/student',auth,isStudent,(req,res)=>{
    res.json({
        success:true,
        message:'Student page'
    });
});

router.get('/admin',auth,isAdmin,(req,res)=>{
    res.json({
        success:true,
        message:'Admin page'
    });
});


module.exports=router;