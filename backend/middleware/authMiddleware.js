import jwt, { decode } from "jsonwebtoken";
import asyncHandler from 'express-async-handler';
import User from "../models/userModel.js";

const protect= asyncHandler(async (req,res,next)=>{
    let token;
    token=req.cookies.jwt;
    console.log("token : ",token);
    if(token){
        try {
            const decoded=jwt.verify(token, process.env.JWT_CODE);
            // decoded returns an object that is used while generating jwt token
            // const token=jwt.sign({userId},process.env.JWT_CODE,{expiresIn: '30d'})
            // {userId} is stored in decoded
            
            // finding the user
            req.user= await User.findById(decoded.userId).select('-password') // now req.user stores all the data of the user(except password['-' sign]) that is present in the mongoDB, so we can use req.user whenever we want
            next();
        } catch (error) {
            res.status(401);
            throw new Error('not authorized!, invalid token');
        }
    }
    else{
        res.status(401);
        throw new Error('not authorized!, no token found');
    }
})


export {protect}