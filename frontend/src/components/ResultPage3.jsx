import React, { useEffect, useState } from 'react'
import { toast } from 'react-toastify'
import axios from 'axios';

const ResultPage3 = ({questions, selectedOptions, studentName, paperCreator, onPageChange}) => {
    // const [actualOptions,setActualOptions]=useState([]);
    const [totalMarks,setTotalmarks]=useState(0);
    const [marks,setMarks]=useState(0);
    const [correct,setCorrect]=useState(0);
    const [wrong,setWrong]=useState(0);

    useEffect(()=>{
        // let tempans=[];
        let temptotalmarks=0;
        let tempmarks=0;
        let tempcorrect=0;
        let tempwrong=0;
        questions.forEach((elem,i)=>{
            temptotalmarks+=elem.weightage;
            if(elem.answer===selectedOptions[i]){
                tempmarks+=elem.weightage;
                tempcorrect+=1;
            }
            else tempwrong+=1;
        });
        // setActualOptions(tempans);
        setTotalmarks(temptotalmarks);
        setMarks(tempmarks);
        setCorrect(tempcorrect);
        setWrong(tempwrong);
    },[])

    const handleSubmit=async ()=>{
        console.log(studentName, "submitted");
        // const response=await axios.post(`http://localhost:5000/api/students/submit-mark`,
        // {name: studentName, paperCreator, totalMarks, obtainMarks: marks, correct, wrong});
        const response=await axios.post(`/api/students/submit-mark`,
        {name: studentName, paperCreator, totalMarks, obtainMarks: marks, correct, wrong});
        if(response.data.message==='paper submitted'){
            toast.success("Marks submitted successfully")
            onPageChange(4);
        }
        else{
            toast.error("Could not submit, try again!")
        }
    }
    return (
      <div id="final-page-solve">
        <h3>Subbmit the test</h3>
          {/* <p>result page 3</p> */}
          {/* <p>The actual answers</p> */}
          {/* {
            questions.map((elem,idx)=>{
                return <p key={idx}>{elem.answer} -----&gt; marks associated : {elem.weightage}</p>
            })
          } */}
          {/* <br /> */}
          {/* <p>Your answers</p> */}
          {/* {
            selectedOptions.map((elem,idx)=>{
                return <p key={idx}>{elem}</p>
            })
          } */}
          <div id="marks-graph-container">
            <div className="marks-container">
                <span>Your Score : </span>
                <span className="marks-obtained correct-col">{marks}</span>
                <span className="slash"> / </span>
                <span className="total-marks total-col">{totalMarks}</span>
            </div>
            <div class="graph-container">
                <h4>Correct Answers : <span className="correct-col">{correct}</span></h4>
                <h4>Wrong Answers : <span className="wrong-col">{wrong}</span></h4>
            </div>
          </div>
          {/* <h2>you scored {marks} out of {totalMarks}, correct ans : {correct} and wrong ans : {wrong}</h2> */}
          <div id="submit-btn-container">
            <button onClick={()=> handleSubmit()} id="test-submit-btn">Submit</button>
          </div>
      </div>
    )
}

export default ResultPage3