import React, { useState } from "react";

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
    }
  };

  return (
    <div>
      {isCreating ? (
        <div>
          <input
            type="text"
            placeholder="Enter your question"
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
          />
          <input
            type="text"
            placeholder="Enter the answer"
            value={answer}
            onChange={(e) => setAnswer(e.target.value)}
          />
          <input
            type="number"
            placeholder="Enter the weightage"
            value={weightage}
            onChange={(e) => setWeightage(e.target.value)}
          />
          <input
            type="text"
            placeholder="Enter an option"
            value={newOption}
            onChange={(e) => setNewOption(e.target.value)}
          />
          <button onClick={handleAddOption}>Add Option</button>
          <button onClick={handleCreateQuestion}>Save Question</button>
          {options.map((elem)=>{
            return <p>{elem}</p>;
          })}
          <button onClick={() => setIsCreating(false)}>Cancel</button>
        </div>
      ) : (
        <button onClick={() => setIsCreating(true)}>Create Question!</button>
      )}
    </div>
  );
}

export default QuestionForm;
