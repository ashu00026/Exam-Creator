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
      <div id="question-page">
        <h3>Answer all the Questions and submit the test</h3>
        <div id="student-name-container">
          <label htmlFor="name">Enter your name:</label>
          <input type="text" id="name" value={studentName} onChange={(e)=> onNameChange(e.target.value)} placeholder='name...' size={30}/>
        </div>
        <div className="questions-container-solve">
        {/* <p>question page 1</p> */}
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
          <div id="next-btn-page1-container">
          <button onClick={()=> handleNextPage()} id="next-btn-solve">Next</button>
          </div>
        </div>
      </div>
    )
}

export default QuestionPage1