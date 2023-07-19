import React from 'react'
import { useEffect, useState } from "react"
import axios from 'axios';
import { Col, Container, Row } from 'react-bootstrap';
import {
    PieChart,
    Pie,
    Tooltip,
    BarChart,
    XAxis,
    YAxis,
    Legend,
    CartesianGrid,
    Bar,
  } from "recharts";
const Dashboard = () => {
    let [list, setList] = useState([])
    let [Cancellist, setCancelList] = useState([])
    let [Approvedlist, setApprovedList] = useState([])


    const data = [
        { name: "Total Task", task: list.length},
        { name: "Approved", task: Approvedlist.length},
        { name: "Cancel", task: Cancellist.length},
        { name: "Recycle", task: Cancellist.length},

      ];

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

                <Col className='mt-2' md="4">
                    <BarChart
                        width={500}
                        height={300}
                        data={data}
                        margin={{
                        top: 5,
                        right: 100,
                        left: 10,
                        bottom: 5,
                        }}
                        barSize={35}
                    >
                    <XAxis
                        dataKey="name"
                        scale="point"
                        padding={{ left: 20, right: 15 }}
                    />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <CartesianGrid strokeDasharray="3 3" />
                    <Bar dataKey="task" fill="#016B64" background={{ fill: "#eee" }} />
                    </BarChart>
      
                </Col>


                <Col className='' md="4">
                    <PieChart width={400} height={400}>
                        <Pie
                            dataKey="task"
                            isAnimationActive={false}
                            data={data}
                            cx={200}
                            cy={150}
                            outerRadius={80}
                            fill="#016B64"
                            label
                        />
          <Tooltip />
                    </PieChart>
      
                </Col>
            </Row>
        </Container>
    </>
  )
}

export default Dashboard