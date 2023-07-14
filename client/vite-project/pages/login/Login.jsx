//import React from 'react'
import axios from 'axios';
import { Col, Container, Row,Form,Button } from 'react-bootstrap'
import { Link, useNavigate } from 'react-router-dom'
import { useState,useEffect } from "react"
import { ProgressBar } from 'react-loader-spinner'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {IoIosEyeOff, IoIosEye} from 'react-icons/io'
const Login = () => {

    let navigate = useNavigate();
    let [loading, setloading] = useState(false)
    let [active, setActive] = useState(false)


    let [email, setEmail] = useState("")
    let [emailerr, setEmailerr] = useState("")

    let [User, seUser] = useState([])

    let [password, setPassword] = useState("")
    let [passworderr, setPassworderr] = useState("")
    let [passwordshow, Setpasswordshow] = useState(false);

    let handleEmail =(e)=>{
        setEmail(e.target.value)
        setEmailerr("")
    }

    let handlePassword =(e)=>{
        setPassword(e.target.value)
        setPassworderr("")
    }

    useEffect(()=>{
        async function UserList (){
            let data = await axios.get ("http://localhost:8000/api/v3/authentication/username")
            seUser(data.data)
        }
        UserList()
    },[active])

    let handleLogin = async () =>{
        if(!email){
            setEmailerr("Enter the email")
        }else{
            if(!/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(email)){
                setEmailerr("Invalid Email")
            }
        }
        if(!password){
            setPassworderr("Enter the password")
        }
        if(email &&/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(email) &&  password){
            if(email != "danishadavis0007@gmail.com"){
                setEmailerr("Email not matching")
            }else if(password != "123456"){
                setPassworderr("password not matching")
            }else{

                setActive(!active)
                await axios.post("http://localhost:8000/api/v3/authentication/login",{
                    email: email,
                    password: password
    
                }).then(()=>{
                    toast.success("Login Successfull");
                    setloading(true)
                    setTimeout(()=>{
                        navigate("/")
                    },2000).then(()=>{
                    setloading(false)
                    })
                })
                setActive(!active)
            }
        }
        
        
    }
  return (
    <>
        <Container>
        <ToastContainer position="top-right" theme="dark"/>
            <Row className='formAlign'>
                <Col className='form_align shadow-lg rounded' sm="10" md="8">
                    <h1 className='text-center'>Login Here</h1>
                    <Form>
                        
                        {/* <h6>Otp</h6>
                        <Form.Control type="number" placeholder="01234" className="me-2 mb-2 py-4" aria-label="Search"/> */}

                        <h6>email</h6>
                        <Form.Control onChange={handleEmail} type="email" placeholder="Demo122@gmail.com" className="me-2 mb-2 py-4" aria-label="email"/>
                        <p className='text-danger'>{emailerr}</p>

                        <h6>password</h6>
                        <Form.Control onChange={handlePassword} type={passwordshow ? "text" :"password"} placeholder="Enter The Hard Password" className="passwordIn me-2 py-4" aria-label="password"/>

                            <div className='passwordIn'>

                                {passwordshow ?(
                                    <IoIosEye onClick={()=>Setpasswordshow(!passwordshow)} className='ddd'></IoIosEye>
                                ):(
                                    <IoIosEyeOff onClick={()=>Setpasswordshow(!passwordshow)} className='ddd'></IoIosEyeOff>
                                )}
                            </div>
                        
                        <p className='text-danger'>{passworderr}</p>

                        {loading ?
                            <div className='text-center'>
                                <ProgressBar
                                height="80"
                                width="80"
                                ariaLabel="progress-bar-loading"
                                wrapperStyle={{}}
                                wrapperClass="progress-bar-wrapper"
                                borderColor = '#fff'
                                barColor = '#51E5FF'
                                />
                            </div>
                    
                            :
                    
                            <div className='ragistration_button'>
                                <Button onClick={handleLogin} className='addTaskButton my-4 py-3'>Login</Button>
                            </div>
                        }

                        <Link to="/Ragistration"><a className='you_dont--haveAccount text-center my-2 d-block'>You don't have an account ?</a></Link>

                    </Form>
                </Col>
            </Row>
        </Container>
    </>
  )
}

export default Login