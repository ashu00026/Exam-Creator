import React, { useEffect, useState } from 'react'
import QuestionForm from '../components/QuestionForm';
import axios from "axios";
import { useSelector } from 'react-redux';
import Header from '../components/Header';
import { toast } from 'react-toastify'
import { MdDelete } from 'react-icons/md';
import { FaPencilAlt } from 'react-icons/fa';
import { BsLink45Deg } from 'react-icons/bs';
import { BiSolidCopy } from 'react-icons/bi';

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
            // const response=await axios.get(`http://localhost:5000/api/papers/get-paper/${userInfo._id}`);
            const response=await axios.get(`/api/papers/get-paper/${userInfo._id}`);
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
        // const response=await axios.post("http://localhost:5000/api/papers/add-paper", newPaper);
        const response=await axios.post("/api/papers/add-paper", newPaper);
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
    
    <div id="dashboard-container">
        <h1>Question Paper</h1>
        <div id="add-que-container">
            <QuestionForm onQuestionCreate={handleQuestionCreate} />
        </div>
        <div id="questions-container">
            {questions.map((question, index) => (
                <div key={index} className='question-container'>
                    <div className="question-delbtn-container">
                        <h5><strong>Q:</strong> {question.questionDetail}</h5>
                        <MdDelete  onClick={() => deleteQue(question.questionDetail)} className='delque-btn'/>
                    </div>
                    <ul>
                    {question.options.map((option, i)=>(
                        <li key={i}>{option}</li>
                    ))}
                    </ul>
                    <p> <strong>Answer : </strong> <i>{question.answer}</i></p>
                    <p> <strong>weightage : </strong> {question.weightage} marks</p>
                </div>
            ))}
        </div>
        <div id="save-create-btn-container">
            <button onClick={handleSavePaper} id='save-btn'>Save Paper <FaPencilAlt className='save-icon'/></button>
            <button onClick={handleExamLink} id='link-btn'>Create Exam Link <BsLink45Deg className='link-icon'/></button>
            {testLink.length>0 &&
            <p id='link-container'><i>your test link : </i>"{testLink}" <BiSolidCopy className='copy-icon' onClick={()=> handleCopyLink()} title='copy link'/></p>
            }
        </div>       
    </div>
    </>
  );
}

export default DashboardScreen