//import React from 'react'
// post - http://localhost:8000/api/v3/Addtodo/NewTask
// get - http://localhost:8000/api/v3/Addtodo/getAllTodo
import {Form,Button, Container, Row, Col} from 'react-bootstrap';
import { useEffect, useState } from "react"
import axios from 'axios';

const TodoListShow = () => {

    let [list, setList] = useState([])
    let [active, setActive] = useState(false)


    useEffect(()=>{
        async function TodoList (){
            let data = await axios.get ("http://localhost:8000/api/v3/approve/approvedTodoGet")
            setList(data.data)
        }
        TodoList()
    },[active])


    let handlePending = async(item)=>{
        await axios.post("http://localhost:8000/api/v3/approve/approvedDeleteInPending",{
            id : item._id,
        },[active]).then(async()=>{
            await axios.post("http://localhost:8000/api/v3/Addtodo/NewTask",{
                todoname : item.approvedname,
                discription :item.approveddiscription,
                // category: item.cancelcategory,
                role:item.approvedstatus,
            })
            setActive(!active)
        })
        setActive(!active)
    }

    let handleCancel = async(item)=>{
        await axios.post("http://localhost:8000/api/v3/approve/approvedDeleteInPending",{
            id : item._id,
        },[active]).then(async()=>{
            await axios.post("http://localhost:8000/api/v3/cancel/cancelTodo",{
                cancelname : item.approvedname,
                canceldiscription :item.approveddiscription,
                // category: item.cancelcategory,
                cancelstatus:item.approvedstatus,
            })
            setActive(!active)
        })
        setActive(!active)
    }


  return (
    <Container>
        <Row>
            <Col>

                <div>
                    {list.length == " " ?
                    
                    <h1 className='empty_sms text-danger text-center'>Approved todo empty</h1>
                     :


                    list.map((item)=>(
                        <>

                        <div className='shadow-sm pb-4 p-4 rounded-md my-4 border'>
                            {/* <p className='text-center pt-2'>Published Date : {item.created}</p> */}
                            <h4 className='text-success'>Name : {item.approvedname}</h4>
                            <h5 className='discription'>Discription : {item.approveddiscription}</h5>
                            
                            {/* <p>Category : {item.approvedcategory}</p> */}
                            
                            <div className='pending_section'>
                            
                            <p className='pending text-success'>Todo Status : approved</p>
                            
                            </div>

                            <div>
                               
                               <button onClick={()=>handlePending(item)} className='approved'>Pending</button>

                               <button onClick={()=>handleCancel(item)} className='cancel'>Cancel</button>
                               
                            </div>
                        </div>
                   
                        </>
                    ))
                    }
                </div>
            </Col>
        </Row>

    </Container>
  )
}

export default TodoListShow