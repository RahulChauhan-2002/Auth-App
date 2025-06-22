const jwt=require('jsonwebtoken');
require('dotenv').config();


exports.auth=(req,res,next)=>{
    try {
        const token=req.body.token;
        if(!token)
        {
            res.status(401).json({
                success:false,
                message:'token missing'
            });
        }
        try {
            const decoded_token=jwt.verify(token,process.env.JWT_SECRET);
            req.user=decoded_token;
        } catch (error) {
            res.status(401).json({
                success:false,
                message:'token is invalid'
            });
        }
        next();
    } catch (error) {
        res.status(401).json({
            success:false,
            message:'Something is wrong'
        });
    }
}

exports.isStudent=(req,res,next)=>{
    try {
        if(req.user.role!=='Student')
        {
            return res.status(401).json({
                success:false,
                message:'This is protected route for student'
            });
        }
        next();
    } catch (error) {
        return res.status(500).json({
            success:false,
            message:'User role is not matching'
        });
    }
}

exports.isAdmin=(req,res,next)=>{
    try {
        if(req.user.role!=='Admin')
        {
            return res.status(401).json({
                success:false,
                message:'This is protected route for Admin'
            });
        }
        next();
    } catch (error) {
        return res.status(500).json({
            success:false,
            message:'User role is not matching'
        });
    }
}