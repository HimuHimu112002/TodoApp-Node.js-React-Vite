//import React from 'react'
import axios from 'axios';
import {Form,Button, Container, Row} from 'react-bootstrap';
import { useEffect, useState } from "react"
import Modal from 'react-bootstrap/Modal';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { ProgressBar } from 'react-loader-spinner'
import { MdOutlineTipsAndUpdates } from 'react-icons/md';
import { AiOutlineDelete } from 'react-icons/ai';
import { TiTick } from 'react-icons/ti';
import { RxCross2 } from 'react-icons/rx';
import ScrollToTop from "react-scroll-to-top"
import Swal from 'sweetalert2';

const Todo = () => {

    let [loading, setloading] = useState(false)
    let [Name, setTodoname] = useState("")
    let [Task, setTask] = useState("")
    let [Taskid, setTaskid] = useState(false)
    let [aaTodoDiscription, setTodoDiscription] = useState("")
    let [list, setList] = useState([])
    let [GategoryList, setGategoryList] = useState([])
    let [active, setActive] = useState(false)
    const [show, setShow] = useState(false);
    const [categoryText, setcategory] = useState("");
    const [OptionId, setOptionId] = useState("");
    let [SearchArray, setSearchArray] = useState([])

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const [updateshow, setupdateshow] = useState(false);
    const updatehandleClose = () => setupdateshow(false);

    //=========== new todo add ==================
    let handleTodoSubmit = async () =>{
        toast.success("Add New Task Successfull");
        setloading(true)
        await axios.post("http://localhost:8000/api/v3/Addtodo/NewTask",{
            todoname : Name,
            discription :aaTodoDiscription,
            // category:OptionId
        })
        setActive(!active)
        setTimeout(()=>{
            setShow(false)
            setloading(false)
        },2000)
        
    }

    //=========== new todo show ==================
    useEffect(()=>{
        async function TodoList (){
            let data = await axios.get ("http://localhost:8000/api/v3/Addtodo/getAllTodo")
            let catdata = await axios.get ("http://localhost:8000/api/v3/category/todoGetcategory")
            setList(data.data)
            setGategoryList(catdata.data)
            
        }
        TodoList()
    },[active])


    //=========== new todo status cancel ==================
    let handleCancel = async (item)=>{
        let Crolename = "cancel"
        await axios.post("http://localhost:8000/api/v3/Addtodo/todoStatus",{
            id : item._id,
            "role" : Crolename,
        },[active]).then( async ()=>{
            await axios.post("http://localhost:8000/api/v3/cancel/cancelTodo",{
                cancelname : item.todoname,
                canceldiscription : item.discription,
                // cancelcategory : item.category.name,
                cancelstatus : item.role,
            },[active]).then(async()=>{
                await axios.post("http://localhost:8000/api/v3/cancel/cancelTodoDelete",{
                    id : item._id,
                })
                setActive(!active)
            })
            setActive(!active)
        })
        setActive(!active)
    }

    //=========== new todo status approved ==================
    let handleApproved = async (item)=>{
        let Arolename = "approved"
        await axios.post("http://localhost:8000/api/v3/Addtodo/todoStatus",{
            id : item._id,
            role : Arolename,
        },[active]).then( async ()=>{
            await axios.post("http://localhost:8000/api/v3/approve/approvedTodo",{
                approvedname : item.todoname,
                approveddiscription : item.discription,
                // approvedcategory : item.category.name,
                approvedstatus : item.role,
            },[active]).then(async()=>{
                await axios.post("http://localhost:8000/api/v3/cancel/cancelTodoDelete",{
                    id : item._id,
                })
            })
            setActive(!active)
        })
        setActive(!active)
        
    }


    // update todod section =====================
    let handletodoUpdatevalue =(e)=>{
        setTask(e.target.value)
    }

    let handleUpdate = (id)=>{
        setupdateshow(true)
        setTaskid(id)
    }

    let handleTodoUpdate = async ()=>{
        setActive(!active)
        setloading(true)
        setTimeout(()=>{
            setupdateshow(false)
            setloading(false)
        },2000)
        await axios.post("http://localhost:8000/api/v3/Addtodo/todoUpdate",{
            todoname : Task,
            id : Taskid,
        })

    }


    // delete section =====================
    let hadleDelete = async (item)=>{
        Swal.fire({
            title: 'Are you sure?',
            text: "Deleted your's blog",
            icon: 'question',
            showCancelButton: true,
            confirmButtonColor: '#162030',
            confirmButtonBorder: 'border-none',
            confirmButtonMarginTop: '10px',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!',
            padding:"70px",
            },[active]).then(async (result) => {
            if (result.isConfirmed){
                await axios.post("http://localhost:8000/api/v3/Addtodo/todoDelete",{
                    id : item._id,
                },[active])
                Swal.fire(
                'Deleted!',
                'Your post has been deleted.',
                'success'
                )
            }
            },[active])
            setActive(!active)

    }


    //============== category ================
    let handleCategorySubmit = async ()=>{
        await axios.post("http://localhost:8000/api/v3/category/todocategory",{
            name : categoryText,
        })
        setActive(!active)
    }


    //============== category access id ================
    let CategoryOptionId=(e)=>{
        setOptionId(e.target.value)
    }


    //============== search section ================
    let handleUserListSearch=(e)=>{
        let SearchFilterArray = []
        if (e.target.value === 0) {
          setSearchArray([])
        }else{
            list.filter((item)=>{
                if(item.todoname.toLowerCase().includes(e.target.value.toLowerCase())){
                    SearchFilterArray.push(item)
                    setSearchArray(SearchFilterArray)
                }
            })
        }
      }
    

  return (
    <>
        <ScrollToTop smooth/>

        <Container>
        <ToastContainer position="top-right" theme="dark"/>
        <h4 className='py-4 search_heading'>Search Todo Task</h4>

        <Form>
            <Form.Control onChange={handleUserListSearch}
                type="search"
                placeholder="Search here"
                className="me-2 py-4 mb-4"
                aria-label="search"
            />
            
        </Form>

        <Button className='addTaskButton my-4' onClick={handleShow}>Add New Task</Button>

        {/* ============================= task add modal ====================*/}
        <Modal show={show} onHide={handleClose}>

            <Modal.Header closeButton>
                <Modal.Title>Add Your's Favourite Task</Modal.Title>
            </Modal.Header>

            <Modal.Body>
                <Form>
                    <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                        <Form.Label>Task Name</Form.Label>
                        <Form.Control onChange={(e)=>setTodoname(e.target.value)}
                        type="search"
                        placeholder="Task Name"
                        className="me-2 py-4 mb-4"
                        aria-label="Search"
                        />
                       
                       <h6 className='mt-4'>Task Discription</h6>
                        <Form.Control
                        onChange={(e)=>setTodoDiscription(e.target.value)}
                        type="search"
                        placeholder="Task Discription"
                        className="me-2 py-4 mb-4"
                        aria-label="Search"
                        />
                        
                        {/* <h6 className='mt-4'>Choose category</h6> */}
                        {/* <select onChange={CategoryOptionId} className='w-100 py-4 px-2'>
                            <option> Select your category </option>
                            {GategoryList.map((item)=>(
                                <option value={item._id}>{item.name}</option>
                            ))}
                            
                            
                        </select> */}
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
                                <Button onClick={handleTodoSubmit} className='my-4 py-3 addTaskButton'>ADD TASK</Button>

                                <Button variant="danger" onClick={handleClose}>CLOSE</Button>
                            </div>
                        }
                    </Form.Group>
                </Form>
            </Modal.Body>

        </Modal>

        {/* ============================= Update modal ====================*/}
        <Modal show={updateshow} onHide={updatehandleClose}>

            <Modal.Header closeButton>
                <Modal.Title>Update task name</Modal.Title>
            </Modal.Header>

            <Modal.Body>
                <Form>
                    <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                        <Form.Label>Task Name</Form.Label>
                        <Form.Control onChange={handletodoUpdatevalue}
                        type="text"
                        placeholder="Task Name"
                        className="me-2 py-4 mb-4"
                        aria-label="text"
                        />
                       
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
                                <Button onClick={handleTodoUpdate} className='my-4 py-3 addTaskButton'>ADD TASK</Button>

                                <Button variant='danger' onClick={updatehandleClose}>CLOSE</Button>
                            </div>
                        }
                    </Form.Group>
                </Form>
        </Modal.Body>

        </Modal>

            <Row>
                <div>
                    {SearchArray.length > 0 ? 
                    
                    SearchArray.map((item)=>(
                        <>

                        <div className='shadow-sm pb-4 px-4 rounded-md my-4 border'>
                            <p className='data_color text-center pt-2'>Published Date : {item.created}</p>
                            <h4 className='todoName text-success'>Name : {item.todoname}</h4>
                            <h5 className='discription'>Discription : {item.discription}</h5>
                            
                            {/* <p value={item._id}>Category : {item.category.name}</p> */}
                            
                            <div className='pending_section'>
                            {item.role == "approved" ?
                            <p className='pending text-success'>Todo Status : {item.role}</p>
                            
                            :
                            <p className='pending text-danger'>Todo Status : {item.role}</p>}
                            </div>

                            <div>
                               <button onClick={()=>handleUpdate(item._id)}className='approved'><MdOutlineTipsAndUpdates className='update_icon'></MdOutlineTipsAndUpdates>Update</button>

                               <button onClick={()=>hadleDelete(item)} className='cancel'><AiOutlineDelete className='update_icon'></AiOutlineDelete>Delete</button>

                               <button onClick={()=>handleApproved(item)} className='approved'><TiTick></TiTick>Approved</button>

                               <button onClick={()=>handleCancel(item)} className='cancel'><RxCross2></RxCross2>cancel</button>
                               
                            </div>
                        </div>
                   
                        </>
                    ))
                    
                    :
                    list.map((item)=>(
                        <>

                        <div className='shadow-sm pb-4 px-4 rounded-md my-4 border'>
                            <p className='data_color text-center pt-2'>Published Date : {item.created}</p>
                            <h4 className='todoName text-success'>Name : {item.todoname}</h4>
                            <h5 className='discription'>Discription : {item.discription}</h5>
                            
                            {/* <p value={item._id}>Category : {item.category.name}</p> */}
                            
                            <div className='pending_section'>
                            {item.role == "approved" ?
                            <p className='pending text-success'>Todo Status : {item.role}</p>
                            
                            :
                            <p className='pending text-danger'>Todo Status : {item.role}</p>}
                            </div>

                            <div>
                               <button onClick={()=>handleUpdate(item._id)}className='approved'><MdOutlineTipsAndUpdates className='update_icon'></MdOutlineTipsAndUpdates>Update</button>

                               <button onClick={()=>hadleDelete(item)} className='cancel'><AiOutlineDelete className='update_icon'></AiOutlineDelete>Delete</button>

                               <button onClick={()=>handleApproved(item)} className='approved'><TiTick></TiTick>Approved</button>

                               <button onClick={()=>handleCancel(item)} className='cancel'><RxCross2></RxCross2>cancel</button>
                               
                            </div>
                        </div>
                   
                        </>
                    ))
                    }
                </div>
            </Row>
        </Container>
    </>

  )

}

export default Todo