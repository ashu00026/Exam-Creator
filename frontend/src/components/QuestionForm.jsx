import React, { useState } from "react";
import { IoMdAddCircle } from "react-icons/io";

function QuestionForm({ onQuestionCreate }) {
  const [isCreating, setIsCreating]=useState(false);
  const [question, setQuestion]=useState("");
  const [options, setOptions]=useState([]);
  const [newOption, setNewOption]=useState("");
  const [answer, setAnswer]=useState("");
  const [weightage, setWeightage]=useState(1);

  const handleAddOption = () => {
    if (newOption) {
      setOptions([...options, newOption]);
      setNewOption("");
    }
  };

  const handleCreateQuestion = () => {
    if (question) {
      onQuestionCreate({ questionDetail: question, options, answer, weightage });
      setIsCreating(false);
      setQuestion("");
      setOptions([]);
      setNewOption("");
      setAnswer("");
      setWeightage(1);
    }
  };

  return (
    <div>
      {isCreating ? (
        <div id="add-que-form">
          <div id="add-que-input-container">
            <label htmlFor="question">Enter the question :</label>
            <input
              type="text"
              id="question"
              placeholder="question.."
              value={question}
              onChange={(e) => setQuestion(e.target.value)}
            />
            <label htmlFor="answer">Enter the answer :</label>
            <input
              type="text"
              id="answer"
              placeholder="answer"
              value={answer}
              onChange={(e) => setAnswer(e.target.value)}
            />
            <label htmlFor="weightage">Enter the weightage :</label>
            <input
              type="number"
              id="weightage"
              placeholder="Enter the weightage"
              value={weightage}
              min={0}
              onChange={(e) => setWeightage(e.target.value)}
            />
            <label htmlFor="options">Enter the options :</label>
            <input
              type="text"
              id="options"
              placeholder="Enter an option"
              value={newOption}
              onChange={(e) => setNewOption(e.target.value)}
            />
            <div id="add-save-btn">
              <button onClick={handleAddOption} id="add-opt-btn">Add Option</button>
              <button onClick={handleCreateQuestion} id="save-que-btn">Save Question</button>
            </div>
            <button onClick={() => setIsCreating(false)} id="cancel-que-btn">Cancel</button>
          </div>
          <div id="options-container">
            {options.length>0 && <h5>Your options</h5>}
            <ul>
            {options.map((elem)=>{
              return <li>{elem}</li>;
            })}
            </ul>
          </div>
        </div>
      ) : (
        <>
        <IoMdAddCircle onClick={() => setIsCreating(true)} id="add-icon"/> <span>Add Question</span>
         {/* <button >Create Question!</button> */}
        </>
      )}
    </div>
  );
}

export default QuestionForm;
