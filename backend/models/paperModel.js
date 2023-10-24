import mongoose from "mongoose";

// const questionDataSchema = new mongoose.Schema({
//   questionDetail: {
//     type: String,
//     require: true
//   },
//   options: [
//     {
//       type: String,
//     },
//   ],
//   answer: {
//     type: String,
//     require: true
//   },
//   weightage:{
//     type: Number,
//     require: true
//   }
// });

const paperSchema = new mongoose.Schema({
  paper: [{
    questionDetail: {
      type: String,
      require: true
    },
    options: [
      {
        type: String,
      },
    ],
    answer: {
      type: String,
      require: true
    },
    weightage:{
      type: Number,
      require: true
    }
  }],
  paperCreator: {
    type: String,
    require: true
  },
});

const Paper=mongoose.model('Paper',paperSchema, 'papers');

export default  Paper;
