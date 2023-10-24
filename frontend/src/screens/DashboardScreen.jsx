import React, { useEffect, useState } from 'react'
import QuestionForm from '../components/QuestionForm';
import axios from "axios";
import { useSelector } from 'react-redux';
import Header from '../components/Header';
import { toast } from 'react-toastify'

const DashboardScreen = () => {
    const {userInfo} = useSelector((state)=>state.auth);
    const [questions, setQuestions] = useState([]);
    const [testLink,setTestLink]=useState('');
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

    const handleExamLink=()=>{
        let currentURL=window.location.href;
        let initalURL=currentURL.split('dashboard')[0];
        let finalURL=initalURL+`solve/${userInfo._id}`;
        console.log(finalURL);
        setTestLink(finalURL);
    }

    const handleCopyLink=()=>{
        navigator.clipboard.writeText(testLink);
        toast.success("Test Link copied");
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
                <div key={index}>
                    <h5>
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
            ))}
    </div>
    <button onClick={handleExamLink}>Create Exam Link</button>
    { testLink.length>0 &&
        <p>your test link : {testLink} <button onClick={()=> handleCopyLink()}>Copy</button></p>
    }
    </>
  );
}

export default DashboardScreen