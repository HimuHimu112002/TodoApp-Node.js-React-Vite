import React from 'react'
import { useEffect, useState } from "react"
import axios from 'axios';
import { Col, Container, Row } from 'react-bootstrap';

const Dashboard = () => {
    let [list, setList] = useState([])
    let [Cancellist, setCancelList] = useState([])
    let [Approvedlist, setApprovedList] = useState([])

    useEffect(()=>{
        async function TodoList (){
            let data = await axios.get ("http://localhost:8000/api/v3/Addtodo/getAllTodo")
            let canceldata = await axios.get ("http://localhost:8000/api/v3/cancel/cancelTodoGet")
            let approvedata = await axios.get ("http://localhost:8000/api/v3/approve/approvedTodoGet")
            setList(data.data)
            setCancelList(canceldata.data)
            setApprovedList(approvedata.data)
        }
        TodoList()
        
    },[])
    
  return (
    <>
        <Container>
            <Row>
                <Col md="4">
                    <div className='dashbord rounded shadow-sm'>
                        <div>

                        <h2>Total Task</h2>
                        <h3 className='text-center'>{list.length}</h3>

                        </div>
                    </div>
                </Col>
                <Col md="4">
                    <div className='dashbord bg-success rounded shadow-sm'>
                        <div>

                        <h2 className='text-white'>Total Approved</h2>
                        <h3 className='text-center text-white'>{Approvedlist.length}</h3>

                        </div>
                    </div>
                </Col>
                <Col md="4">
                    <div className='dashbord bg-danger rounded shadow-sm'>
                        <div>

                        <h2 className='text-white'>Total Cancel</h2>
                        <h3 className='text-center text-white'>{Cancellist.length}</h3>

                        </div>
                    </div>
                </Col>
                <Col md="4">
                    <div className='dashbord bg-info rounded shadow-sm'>
                        <div>

                        <h2 className='text-white'>Total Recycle</h2>
                        <h3 className='text-center text-white'>{Cancellist.length}</h3>

                        </div>
                    </div>
                </Col>
            </Row>
        </Container>
    </>
  )
}

export default Dashboard