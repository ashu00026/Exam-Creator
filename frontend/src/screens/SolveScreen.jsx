import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import axios from 'axios';
import QuestionPage1 from '../components/QuestionPage1';
import QuestionPage2 from '../components/QuestionPage2';
import ResultPage3 from '../components/ResultPage3';

const SolveScreen = () => {
    const [currentPage,setCurrentPage]=useState(1);
    const [questions, setQuestions] = useState([]);
    const [questionSet1, setQuestionSet1] = useState([]);
    const [questionSet2, setQuestionSet2] = useState([]);
    const [allAnswers, setAllAnswers] = useState([]);
    const {paperCreator}=useParams();
    console.log("current page-> :",currentPage);

    useEffect(()=>{
        const getQues=async()=>{
            const response=await axios.get(`http://localhost:5000/api/papers/get-paper/${paperCreator}`);
            if(response.data.message==='user has paper'){
                let len=response.data.paper.paper.length;
                let allQues=response.data.paper.paper;
                setQuestions(response.data.paper.paper)
                if((len%2)===0){
                    setQuestionSet1(allQues.slice(0,len/2))
                    setQuestionSet2(allQues.slice(len/2))
                }
                else{
                    setQuestionSet1(allQues.slice(0,len/2+1))
                    setQuestionSet2(allQues.slice(len/2+1))
                }
            }
        }
        getQues();
    },[])

    const handlePageChange=(page)=>{
        setCurrentPage(page)
    }
    const handleAddAnswers=()=>{
        
    }
    
    return (
    <div>
        <p>solve paper created by : {paperCreator}</p>
        <p>the currentPage is {currentPage}</p>
        {currentPage===1 && <QuestionPage1 questions={questionSet1} onPageChange={handlePageChange}/>}
        {currentPage===2 && <QuestionPage2 questions={questionSet2} onPageChange={handlePageChange}/>}
        {currentPage===3 && <ResultPage3 questions={questions} onPageChange={handlePageChange}/>}
    </div>
    )
}

export default SolveScreen