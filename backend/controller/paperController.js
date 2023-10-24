import asyncHandler from 'express-async-handler';
import Paper from "../models/paperModel.js";

// ------------------------------------------------------------------------------------------------------------------
// @desc    add a paper
// route    POST /api/papers/add-paper/:paperCreator
// @access  Private
const addPaper= asyncHandler(async(req,res)=>{
    const {paper,paperCreator}=req.body;
    const existingPaper=await Paper.findOne({paperCreator});
    if(existingPaper){
        const updatedPaper=await Paper.findOneAndUpdate({paperCreator},{paper}, {new: true});
        res.status(201).json({message: "paper updated", updatedPaper});
    }
    else{
        const newPaper=await Paper.create({paper,paperCreator});
        res.status(201).json({message: "paper added", newPaper});
    }

})

// ------------------------------------------------------------------------------------------------------------------
// @desc    get a paper
// route    POST /api/papers/get-paper/:paperCreator
// @access  Public
const getPaper= asyncHandler(async(req,res)=>{
    const {paperCreator} = req.params;
    const paper=await Paper.findOne({paperCreator});
    if(paper){
        res.status(201).json({message:"user has paper",paper});
    }
    else if(!paper){
        res.status(200).json({message: "user has no paper"})
    }

})

export {getPaper, addPaper}