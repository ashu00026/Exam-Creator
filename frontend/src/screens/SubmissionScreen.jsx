import React, { useEffect, useState } from 'react'
import Header from '../components/Header'
import axios from "axios";
import { useSelector } from 'react-redux';
import { FiRefreshCcw } from 'react-icons/fi';

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
    <div id="submission-container">
      <h3>List of students, submitted the test</h3>
      <div id="refresh-btn-container">
        <button onClick={()=> handleRefresh()} id="refresh-btn">Refresh <FiRefreshCcw /></button>
      </div>
    {students.length===0 ? <h1>No Students have yet submitted the test</h1> : 
    <table>
      <tr>
        <th>Name of the student</th>
        <th>Total Marks</th>
        <th>Marks obtained</th>
        <th>Correct answers</th>
        <th>Wrong answers</th>
      </tr>
      {students.map((elem,idx)=>{
      return (
        <tr key={idx}>
          <td>{elem.name}</td>
          <td>{elem.totalMarks}</td>
          <td>{elem.obtainMarks}</td>
          <td>{elem.correct}</td>
          <td>{elem.wrong}</td>
        </tr>
      )
    })}
    </table>
    }
    </div>
  </>
    )
}

export default SubmissionScreen