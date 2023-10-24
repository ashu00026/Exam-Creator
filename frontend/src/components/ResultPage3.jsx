import React, { useEffect, useState } from 'react'
import { toast } from 'react-toastify'

const ResultPage3 = ({questions, selectedOptions, studentName}) => {
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
    }
    return (
      <div>
          <p>result page 3</p>
          <p>The actual answers</p>
          {
            questions.map((elem,idx)=>{
                return <p key={idx}>{elem.answer} -----&gt; marks associated : {elem.weightage}</p>
            })
          }
          <br />
          <p>Your answers</p>
          {
            selectedOptions.map((elem,idx)=>{
                return <p key={idx}>{elem}</p>
            })
          }
          <h2>you scored {marks} out of {totalMarks}, correct ans : {correct} and wrong ans : {wrong}</h2>
          <button onClick={()=> handleSubmit()}>Submit</button>
      </div>
    )
}

export default ResultPage3