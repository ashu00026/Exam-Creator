import React, { useState } from 'react'
import { toast } from 'react-toastify'

const QuestionPage1 = ({questions, onPageChange, onOptionChange, selectedOptions, studentName, onNameChange, startIdx}) => {

    // console.log("in page 1 selected options :",selectedOptions);

    const handleNextPage=()=>{
        if(studentName===''){
            toast.error("Enter your name")
        }
        else onPageChange(2);
    }
    return (
      <div>
        <input type="text" value={studentName} onChange={(e)=> onNameChange(e.target.value)}/>
        <p>question page 1</p>
        {questions.map((question, qindex)=>(
          <div key={qindex}>
              <h5>
                  <strong>Question:</strong> {question.questionDetail} -&gt;{question.weightage}</h5>
                  {question.options.map((option, oindex)=>{
                      return (
                      <div key={oindex}>
                            <input
                                type="radio"
                                value={option}
                                name={`que_${qindex}`}
                                checked={selectedOptions[qindex+startIdx]===option}
                                onChange={()=> onOptionChange(qindex+startIdx,option)}/>{option}
                      </div>)
                  })}
          </div>
          ))}
        <button onClick={()=> handleNextPage()}>Next</button>
      </div>
    )
}

export default QuestionPage1