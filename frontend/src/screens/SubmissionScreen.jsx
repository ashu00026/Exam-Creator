import React, { useEffect, useState } from 'react'
import Header from '../components/Header'
import axios from "axios";
import { useSelector } from 'react-redux';

const SubmissionScreen = () => {
  const [students,SetStudents]=useState([]);
  const {userInfo}=useSelector((state)=> state.auth);
  
  const fetchStudents=async()=>{
    // const response=await axios.get(`http://localhost:5000/api/students/get-mark/${userInfo._id}`);
    const response=await axios.get(`/api/students/get-mark/${userInfo._id}`);
    // console.log(response.data.data);
    SetStudents(response.data.data);
  }

  const handleRefresh=()=>{
    fetchStudents();
  }
  useEffect(()=>{
    fetchStudents();
  },[]);

  return (
  <>
    <Header/>
    <div>SubmissionScreen</div>
    <button onClick={()=> handleRefresh()}>Refresh</button>
    {students.length===0 && <h1>No Students have yet submitted the test</h1>}
    {students.map((elem,idx)=>{
      return (
        <div key={idx}>
          <p>{elem.name}</p>
          <p>{elem.totalMarks}</p>
          <p>{elem.obtainMarks}</p>
          <p>{elem.correct}</p>
          <p>{elem.wrong}</p>
        </div>
      )
    })}
  </>
    )
}

export default SubmissionScreen