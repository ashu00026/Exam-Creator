import React from 'react'

const ResultPage3 = ({questions, onPageChange}) => {
  return (
    <div>
        <p>result page 3</p>
        {questions.map((question, index)=>(
        <div>
            <h5 key={index}>
                <strong>Question:</strong> {question.questionDetail}
                <ul>
                {question.options.map((option, i)=>(
                    <li key={i}>{option}</li>
                ))}
                </ul>
            </h5>
        </div>
        ))}
        <button>Submit</button>
    </div>
  )
}

export default ResultPage3