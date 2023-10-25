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
        <>
        <h3>Answer all the Questions and submit the test</h3>
      <div className='questions-container-solve'>
          {/* <p>question page 2</p> */}
          {questions.map((question, qindex)=>(
          <div key={qindex} className="question-container-solve">
              <h5><strong>Question:</strong> {question.questionDetail}</h5>
              <div className="options-container-solve">
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
                <hr />
            </div>
          ))}
          <div id="prev-check-score-btn-container">
            <button onClick={()=> onPageChange(1)} id="prev-btn-solve">Prev</button>
            <button onClick={()=> handleCheckScore()} id="check-score-btn-solve">Check Score</button>
          </div>
      </div>
      </>
    )
}

export default QuestionPage2