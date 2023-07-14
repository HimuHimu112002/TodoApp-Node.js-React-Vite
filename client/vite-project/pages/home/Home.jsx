//import React from 'react'
import { Container,Col,Nav,Row,Tab,Button } from 'react-bootstrap'
import Todo from '../../components/Todo';
import TodoListShow from '../../components/TodoListShow';
import axios from 'axios';
import { useEffect, useState } from "react"
import Dashboard from '../../components/Dashboard';
import { RxDashboard } from 'react-icons/rx';
import { BsPencilSquare } from 'react-icons/bs';
import { TiTick } from 'react-icons/ti';
import { FiLogOut } from 'react-icons/fi';
import { BsRecycle } from 'react-icons/bs';
import { CiLight } from 'react-icons/ci';
import { RxCross2 } from 'react-icons/rx';
import Cancel from '../../components/Cancel';
import {useNavigate } from 'react-router-dom'
import { createContext } from 'react';

const Home = () => {

  let navigate = useNavigate();
  let [list, setList] = useState([])
  let [show, setshow] = useState(false)
  const ThemeContext = createContext("Light")

  useEffect(()=>{
    async function TodoList (){
        let data = await axios.get ("http://localhost:8000/api/v3/authentication/username")
        setList(data.data)
    }
    TodoList()
  },[])

  let handleLogout =()=>{
      setTimeout(()=>{
        navigate("/Login")
      })
  }


  const [theme, setTheme] = useState("Light")
  const toggleTheme = ()=>{
    setTheme((curr)=>(curr === "Light"?"dark":"Light"))
  }

  let hadlecancel =()=>{
    setshow(false)
  }

  let handlePopup =()=>{
    setshow(true)
  }
 
  return (
    <>

    {show && 
    
      <div className='Profile_upload-section'>
        <div>
            <h5 className='text-center py-4 text-white'>Upload your profile</h5>

            <div className='popup_profile'>
              <img src='images/hhh.png'></img>
            </div>
            <div className='profile_input'>
              <input type='file' name='sampleFile'></input>
              <input type='submit' value='Upload'></input>
            </div>
            <div className='cancel_button'>
              <Button className='my-4 profile_cancel-button' onClick={hadlecancel}>Cancel</Button>
            </div>

        </div>
      </div>

    }


      <ThemeContext.Provider value={{theme, toggleTheme}}>

        <Container fluid className='HomeTop_bg' id={theme}>

        <div className='HomeTop_Section shadow py-4 mb-2'>
          <div className='text-center'>

            <div onClick={handlePopup} className='profile shadow'>
              <img src='images/hhh.png'></img>
            </div>

            <p className='my-2'>{list.map((item)=>(
              <h5 className='user_name'>User name : {item.fullname}</h5>
            ))}</p>
          </div>
        </div>

        <Tab.Container id="left-tabs-example" defaultActiveKey="first">
          <Row>

            <Col className='tab_section shadow'>

              <Nav variant="pills" className="flex-column">
                <Nav.Item className='py-4'>
                  <Nav.Link eventKey="first"><RxDashboard className='update_icon'></RxDashboard>Dashbord</Nav.Link>
                </Nav.Item>

                <Nav.Item className='py-3'>
                  <Nav.Link eventKey="second"><BsPencilSquare className='update_icon'></BsPencilSquare>Add Task</Nav.Link>
                </Nav.Item>

                <Nav.Item className='py-3'>
                  <Nav.Link eventKey="four"><TiTick className='update_icon'></TiTick>Approved</Nav.Link>
                </Nav.Item>

                <Nav.Item className='py-3'>
                  <Nav.Link eventKey="five"><RxCross2 className='update_icon'></RxCross2>Cancel</Nav.Link>
                </Nav.Item>

                <Nav.Item className='py-3'>
                  <Nav.Link eventKey="six"><BsRecycle className='update_icon'></BsRecycle>Recycle</Nav.Link>
                </Nav.Item>

              </Nav>

              <div className='ragistration_button'>
                <Button onClick={toggleTheme}  checked={theme === "dark"} className='logoutButton my-4 py-3'><CiLight className='logoutIcon'></CiLight>DARK MODE</Button>
              </div>

              <div className='ragistration_button'>
                <Button onClick={handleLogout} className='logoutButton my-4 py-3'><FiLogOut className='logoutIcon'></FiLogOut>LOGOUT</Button>
              </div>

              

            </Col>

            <Col sm={10}>

              <Tab.Content>
                <Tab.Pane eventKey="first">
                  <Dashboard></Dashboard>
                </Tab.Pane>
                <Tab.Pane eventKey="second">
                  <Todo></Todo>
                </Tab.Pane>
                <Tab.Pane eventKey="five">
                  <Cancel></Cancel>
                </Tab.Pane>
                <Tab.Pane eventKey="four">
                  <TodoListShow></TodoListShow>
                </Tab.Pane>
              </Tab.Content>

            </Col>

          </Row>
        </Tab.Container>

        </Container>
      </ThemeContext.Provider>
    </>
  )
}

export default Home