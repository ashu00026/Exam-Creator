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
    const {paperCreator}=useParams();
    const [selectedOptions,setSelectedOptions]=useState(new Array(questions.length).fill(''));
    const [startIdx,setStartIdx]=useState(0);
    const [studentName,setStudentName]=useState('');

    useEffect(()=>{
        const getQues=async()=>{
            const response=await axios.get(`http://localhost:5000/api/papers/get-paper/${paperCreator}`);
            if(response.data.message==='user has paper'){
                let len=response.data.paper.paper.length;
                let allQues=response.data.paper.paper;
                setQuestions(response.data.paper.paper)
                if((len%2)===0){
                    setQuestionSet1(allQues.slice(0,len/2));
                    setQuestionSet2(allQues.slice(len/2));
                    setStartIdx(len/2);
                }
                else{
                    setQuestionSet1(allQues.slice(0,len/2+1));
                    setQuestionSet2(allQues.slice(len/2+1));
                    let l=len/2;
                    l=parseInt(l);
                    setStartIdx(l+1);
                }
            }
        }
        getQues();
    },[])

    const handlePageChange=(page)=>{
        setCurrentPage(page)
    }
    const handleOptionChange=(qindex,selectedAnswer)=>{
        const updatedOptions=[...selectedOptions];
        updatedOptions[qindex]=selectedAnswer;
        setSelectedOptions(updatedOptions);
    }
    const handleNameChange=(nameVal)=>{
        setStudentName(nameVal);
    }
    
    return (
    <div>
        <p>solve paper created by : {paperCreator}</p>
        <p>the currentPage is {currentPage}</p>
        {currentPage===1 && 
            <QuestionPage1 
            questions={questionSet1}
            onPageChange={handlePageChange}
            onOptionChange={handleOptionChange}
            selectedOptions={selectedOptions}
            studentName={studentName}
            onNameChange={handleNameChange}
            startIdx={0}/>
        }
        {currentPage===2 && 
            <QuestionPage2 
            questions={questionSet2}
            onPageChange={handlePageChange}
            onOptionChange={handleOptionChange}
            selectedOptions={selectedOptions}
            totalLen={questions.length}
            startIdx={startIdx}/>
        }
        {currentPage===3 &&
            <ResultPage3
            questions={questions}
            studentName={studentName}
            selectedOptions={selectedOptions} />
        }
    </div>
    )
}

export default SolveScreen