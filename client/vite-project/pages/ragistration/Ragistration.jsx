//import React from 'react'
import axios from 'axios';
import { Col, Container, Row,Form,Button } from 'react-bootstrap'
import { Link, useNavigate } from 'react-router-dom'
import { useState } from "react"
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { ProgressBar } from 'react-loader-spinner'
import {IoIosEyeOff, IoIosEye} from 'react-icons/io'
const Ragistration = () => {

    let navigate = useNavigate();
    let [loading, setloading] = useState(false)

    let [fullname, setFullname] = useState("")
    let [fullnameerr, setFullnameerr] = useState("")

    let [phone, setPhone] = useState("")
    let [phoneerr, setPhoneerr] = useState("")

    let [email, setEmail] = useState("")
    let [emailerr, setEmailerr] = useState("")

    let [password, setPassword] = useState("")
    let [passworderr, setPassworderr] = useState("")
    let [passwordshow, Setpasswordshow] = useState(false);

    let handleFullname =(e)=>{
        setFullname(e.target.value)
        setFullnameerr("")
    }

    let handlePhone =(e)=>{
        setPhone(e.target.value)
        setPhoneerr("")
    }

    let handleEmail =(e)=>{
        setEmail(e.target.value)
        setEmailerr("")
    }

    let handlePassword =(e)=>{
        setPassword(e.target.value)
        setPassworderr("")
    }

    let handleSubmit = async () =>{
        if(!fullname){
            setFullnameerr("Enter the fullname")
        }
        if(!phone){
            setPhoneerr("Enter the phone")
        }
        if(!email){
            setEmailerr("Enter the email")
        }
        if(!password){
            setPassworderr("Enter the password")
        }
        if(fullname && phone && email && password){
            
            await axios.post("http://localhost:8000/api/v3/authentication/registration",{
                "fullname" : fullname,
                "email": email,
                "phone": phone,
                "password" :password
            }).then(()=>{
                toast.success("Registration Successfull");
                setloading(true)
                setTimeout(()=>{
                    navigate("/Login")
                },3000).then(()=>{
                    setloading(false)
                })
            })
        }
        
    }
  return (
    <>
        <Container>
        <ToastContainer position="top-right" theme="dark"/>
            <Row className='formAlign'>
                <Col className='form_align shadow-lg rounded' sm="10" md="8">
                    <h1 className='text-center'>Registration Here</h1>
                    <Form>
                        <h6>Full-Name</h6>
                        <Form.Control onChange={handleFullname} type="text" placeholder="Aktarujjaman" className="me-2 mb-2 py-4" aria-label="text"/>
                        <p className='text-danger'>{fullnameerr}</p>

                        <h6>Phone</h6>
                        <Form.Control onChange={handlePhone} type="number" placeholder="+88/0123456789" className="me-2 mb-2 py-4" aria-label="number"/>
                        <p className='text-danger'>{phoneerr}</p>
                        
                        <h6>Email</h6>
                        <Form.Control onChange={handleEmail} type="email" placeholder="Demo122@gmail.com" className="me-2 mb-2 py-4" aria-label="email"/>
                        <p className='text-danger'>{emailerr}</p>

                        <h6>password</h6>
                        <Form.Control onChange={handlePassword} type={passwordshow ? "text" :"password"} placeholder="Enter The Hard Password" className="me-2 py-4" aria-label="password"/>
                        <p className='text-danger'>{passworderr}</p>

                        <div className='passwordIn'>

                            {passwordshow ?(
                                <IoIosEye onClick={()=>Setpasswordshow(!passwordshow)} className='ragistration_eye'></IoIosEye>
                            ):(
                                <IoIosEyeOff onClick={()=>Setpasswordshow(!passwordshow)} className='ragistration_eye'></IoIosEyeOff>
                            )}
                        </div>

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
                                <Button onClick={handleSubmit} className='addTaskButton my-4 py-3'>Ragistration</Button>
                            </div>
                        }

                        <Link to="/Login"><a className='you_dont--haveAccount text-center my-2 d-block'>You have an account ?</a></Link>
                    </Form>
                </Col>
            </Row>
        </Container>
    </>
  )
}

export default Ragistration