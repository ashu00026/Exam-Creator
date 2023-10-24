import mongoose from "mongoose";

const studentSchema = new mongoose.Schema({
  name:{
    type: String,
    require: true
  },
  paperCreator: {
    type: String,
    require: true
  },
  totalMarks:{
    type: Number,
    require: true
  },
  obtainMarks:{
    type: Number,
    require: true
  },
  correct:{
    type: Number
  },
  wrong:{
    type: Number
  }
}, {timestamps: true});

const Student=mongoose.model('Student',studentSchema, 'students');
export default  Student;
