import asyncHandler from 'express-async-handler';
import Student from "../models/studentModel.js";


// ------------------------------------------------------------------------------------------------------------------
// @desc    submit student mark
// route    POST /api/students/submit-mark
// @access  Public
const submitMark= asyncHandler(async(req,res)=>{
    // console.log(req.body);
    const {name,paperCreator,totalMarks,obtainMarks,correct,wrong}=req.body;
    const newStudent=await Student.create({name,paperCreator,totalMarks,obtainMarks,correct,wrong});
    res.status(200).json({message: "paper submitted", data: req.body});

})


// ------------------------------------------------------------------------------------------------------------------
// @desc    get student mark
// route    POST /api/students/get-mark/:paperCreator
// @access  Public
const getMark= asyncHandler(async(req,res)=>{
    // console.log(req.body);
    const {paperCreator}=req.params;
    // console.log(paperCreator);
    const allStudents=await Student.find({paperCreator});
    res.status(200).json({message: "marks fetched", data: allStudents});

})


export {submitMark,getMark};