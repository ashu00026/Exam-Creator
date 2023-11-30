import asyncHandler from 'express-async-handler';
import User from '../models/userModel.js';
import generateToken from '../utils/generateToken.js';

const authUser= asyncHandler(async(req,res)=>{
    const {email,password} = req.body;
    const user=await User.findOne({email});

    if(user && (await user.matchPassword(password))){
        generateToken(res,user._id);
        res.status(201).json({
            _id: user._id,
            name: user.name,
            email: user.email
        });
    }
    else{
        res.status(401);
        throw new Error('Invalid email or password');
    }

})

const registerUser= asyncHandler(async(req,res)=>{
    const {name,email,password} = req.body;

    const userExists=await User.findOne({email: email})
    if(userExists){
        res.status(400);
        throw new Error('User Already Exists');
    }

    const user=await User.create({
        name,email,password
    })

    if(user){
        generateToken(res,user._id);
        res.status(201).json({
            _id: user._id,
            name: user.name,
            email: user.email
        });
    }
    else{
        res.status(400);
        throw new Error('Invalid User Data');
    }
})

const logoutUser= asyncHandler(async(req,res)=>{
    res.cookie('jwt','',{
        httpOnly: true,
        expires: new Date(0)
    });
    res.status(200).json({message : 'User logged out'});
})

const getUserProfile= asyncHandler(async(req,res)=>{

    // req.user is created while login(/auth) in order to access the data of user using req.user in any controller
    const user={
        _id: req.user._id,
        name: req.user.name,
        email: req.user.email
    }
    // res.status(200).json({message : 'User Profile'});
    res.status(200).json(user);
})


const updateUserProfile= asyncHandler(async(req,res)=>{

    const oldUser=await User.findById(req.user._id);

    if(oldUser){
        oldUser.name=req.body.name || oldUser.name,
        oldUser.email=req.body.email || oldUser.email

        if(req.body.password){
            oldUser.password=req.body.password;
        }

        const updatedUser=await oldUser.save();

        res.status(200).json({
            _id: updatedUser._id,
            name: updatedUser.name,
            email: updatedUser.email,
            // password: updatedUser.password
        });
    }
    else{
        res.status(404);
        throw new Error('User not found');
    }
})

// ------------------------------------------------------------------------------------------------------------------



export {
    authUser,
    registerUser,
    logoutUser,
    getUserProfile,
    updateUserProfile
};