import React, { useEffect, useState } from 'react'
import QuestionForm from '../components/QuestionForm';
import axios from "axios";
import { useSelector } from 'react-redux';
import Header from '../components/Header';
import { toast } from 'react-toastify'

const DashboardScreen = () => {
    const {userInfo} = useSelector((state)=>state.auth);
    const [questions, setQuestions] = useState([]);
    const handleQuestionCreate = (questionData) => {
        setQuestions([...questions, questionData]);
    };

    const deleteQue = (questionName) => {
        setQuestions(questions.filter((elem) => elem.questionDetail !== questionName));
    };

    useEffect(()=>{
        const getQues=async()=>{
            const response=await axios.get(`http://localhost:5000/api/papers/get-paper/${userInfo._id}`);
            if(response.data.message==='user has paper'){
                setQuestions(response.data.paper.paper)
            }
        }
        getQues();
    },[])

    const handleSavePaper=async()=>{
        let newPaper={
            "paper" : questions,
            "paperCreator" : `${userInfo._id}`
        }
        console.log("to save ",newPaper)
        const response=await axios.post("http://localhost:5000/api/papers/add-paper", newPaper);
        console.log(response); 
        toast.success('paper added');
    }

    return(
    <>
    <Header />
    
    <div>
        <h1>Create an Exam</h1>
        <QuestionForm onQuestionCreate={handleQuestionCreate} />
        <h2>Created Questions</h2>
        <button onClick={handleSavePaper}>Save Paper</button>
            {questions.map((question, index) => (
                <>
                <div>
                    <h5 key={index}>
                        <strong>Question:</strong> {question.questionDetail}
                        <button type="button" onClick={() => deleteQue(question.questionDetail)}>Delete</button>
                        <ul>
                        {question.options.map((option, i)=>(
                            <li key={i}>{option}</li>
                        ))}
                        </ul>
                    </h5>
                    <p>Answer :{question.answer}</p>
                    <p>weightage :{question.weightage}</p>
                </div>
                </>
            ))}
    </div>
    </>
  );
}

export default DashboardScreen