import React, { useEffect, useState } from 'react'
import { Button,Form } from 'react-bootstrap'
import { Link, useNavigate } from 'react-router-dom'
import FormContainer from '../components/FormContainer'
import { useDispatch, useSelector } from 'react-redux'
import { toast } from 'react-toastify'
import Loader from '../components/Loader'
import { setCredentials } from '../slices/authSlice'
import { useUpdateUserMutation } from '../slices/usersApiSlice'
import Header from '../components/Header'

const ProfileScreen = () => {
    const [name,setName]=useState('');
    const [email,setEmail]=useState('');
    const [password,setPassword]=useState('');
    const [confirmPassword,setConfirmPassword]=useState('');

    const navigate=useNavigate();
    const dispatch=useDispatch();

    const {userInfo} = useSelector((state)=>state.auth);

    const [updateprofile,{isLoading}]=useUpdateUserMutation();

    useEffect(()=>{
        setName(userInfo.name)
        setEmail(userInfo.email)
    },[userInfo.name, userInfo.email]);



    const submitHandler = async(e)=>{
        e.preventDefault();
        if(password!=confirmPassword){
            toast.error("passowrds do not match");
        }
        else{
            try {
                console.log("setting");
                console.log(
                    userInfo._id,
                    name,
                    email,
                    password)
                const res=await updateprofile({
                    _id: userInfo._id,
                    name,
                    email,
                    password
                }).unwrap();
                dispatch(setCredentials({...res}));
                toast.success('updated successfully');
            } catch (err) {
                console.log("error in updating profile");
                toast.error(err?.data?.message || err.error);
            }
        }
    }
    return (
        <>
        <Header />
        <FormContainer>
            <h1>Profile</h1>

            <Form onSubmit={submitHandler}>

                <Form.Group className='my-2' controlId='name'>
                    <Form.Label>Name</Form.Label>
                    <Form.Control
                        type= 'text'
                        placeholder='Enter Name'
                        value={name}
                        onChange={ (e)=> setName(e.target.value) }
                    >
                    </Form.Control>
                </Form.Group>

                <Form.Group className='my-2' controlId='email'>
                    <Form.Label>Email Address</Form.Label>
                    <Form.Control
                        type= 'email'
                        placeholder='Enter Email Id'
                        value={email}
                        onChange={ (e)=> setEmail(e.target.value) }
                    >
                    </Form.Control>
                </Form.Group>

                <Form.Group className='my-2' controlId='password'>
                    <Form.Label>Password</Form.Label>
                    <Form.Control
                        type='password'
                        placeholder='Enter Password'
                        value={password}
                        onChange={ (e)=> setPassword(e.target.value) }
                    >
                    </Form.Control>
                </Form.Group>

                <Form.Group className='my-2' controlId='confirmPassword'>
                    <Form.Label>Confirm Password</Form.Label>
                    <Form.Control
                        type='password'
                        placeholder='Confirm Password'
                        value={confirmPassword}
                        onChange={ (e)=> setConfirmPassword(e.target.value) }
                    >
                    </Form.Control>
                </Form.Group>

                {isLoading && <Loader />}

                <Button type='submit' variant='primary' className='mt-3'>
                    Update
                </Button>
            </Form>
        </FormContainer>
        </>
    )
}

export default ProfileScreen;