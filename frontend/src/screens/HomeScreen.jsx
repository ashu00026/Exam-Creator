import React from 'react';
import Hero from '../components/Hero';
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';
import Header from '../components/Header';

const HomeScreen = () => {
  const {userInfo}=useSelector((state)=>state.auth)
  return (
    <>
    <Header />
    {userInfo?<Navigate to='/dashboard' replace />:<Hero />}
    </>
  )
}

export default HomeScreen