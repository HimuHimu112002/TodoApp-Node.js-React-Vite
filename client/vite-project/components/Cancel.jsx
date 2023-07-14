//import React from 'react'
import {Container, Row, Col} from 'react-bootstrap';
import { useEffect, useState } from "react"
import axios from 'axios';

const Cancel = () => {

    let [list, setList] = useState([])
    let [active, setActive] = useState(false)

    useEffect(()=>{
        async function TodoList (){
            let data = await axios.get ("http://localhost:8000/api/v3/cancel/cancelTodoGet")
            setList(data.data)
        }
        TodoList()
    },[active])


    let handlePending = async (item)=>{
        await axios.post("http://localhost:8000/api/v3/cancel/cancelTodoDeleteInApproved",{
            id : item._id,
        },[active]).then(async()=>{
            await axios.post("http://localhost:8000/api/v3/Addtodo/NewTask",{
                todoname : item.cancelname,
                discription :item.canceldiscription,
                // category: item.cancelcategory,
                role:item.cancelstatus,
            })
            setActive(!active)
        })
        setActive(!active)
    }


    let handleApproved = async (item)=>{
        
        await axios.post("http://localhost:8000/api/v3/cancel/cancelTodoDeleteInApproved",{
            id : item._id,
        },[active]).then(async()=>{
            await axios.post("http://localhost:8000/api/v3/approve/approvedTodo",{
                approvedname : item.cancelname,
                approveddiscription : item.canceldiscription,
                // approvedcategory : item.category.name,
                approvedstatus : item.cancelstatus,
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
                   { list.length == " " ? 
                   <h1 className='empty_sms text-danger text-center'>Cancel todo empty</h1>
                   
                   :
                   
                    list.map((item)=>(
                        <>

                        <div className='shadow-sm pb-4 p-4 rounded-md my-4 border'>
                            {/* <p className='text-center pt-2'>Published Date : {item.created}</p> */}
                            <h4 className='text-success'>Name : {item.cancelname}</h4>
                            <h5 className='discription'>Discription : {item.canceldiscription}</h5>
                            
                            {/* <p>Category : {item.cancelcategory}</p> */}
                            
                            <div className='pending_section'>
                            
                            <p className='pending text-danger'>Todo Status : cancel</p>
                            
                            </div>

                            <div>
                            
                               <button onClick={()=>handleApproved(item)} className='approved'>Approved</button>

                               <button onClick={()=>handlePending(item)} className='cancel'>Pending</button>
                               
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

export default Cancel