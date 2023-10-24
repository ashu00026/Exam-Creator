import React, { useState } from 'react'
import { toast } from 'react-toastify'

const QuestionPage2 = ({questions, onPageChange, onOptionChange, selectedOptions,totalLen, startIdx}) => {

    // console.log("in page 2 selected options :",selectedOptions);

    const handleCheckScore=()=>{
        var isEmpty=(selectedOptions.length===totalLen)?false:true;
        selectedOptions.forEach((elem)=>{
            // console.log("->",elem)
            if(elem===undefined || elem===''){
                isEmpty=true;
            } 
        })
        if(isEmpty){
            toast.error("Answer all questions")
        }
        else{
            onPageChange(3);
        }
    }
    return (
      <div>
          <p>question page 2</p>
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
          <button onClick={()=> onPageChange(1)}>Prev</button>
          <button onClick={()=> handleCheckScore()}>Check Score</button>
      </div>
    )
}

export default QuestionPage2