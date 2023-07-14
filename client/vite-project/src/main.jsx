import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import { createBrowserRouter,RouterProvider,} from "react-router-dom";
import Home from '../pages/home/Home.jsx';
import Ragistration from '../pages/ragistration/Ragistration.jsx';
import Login from '../pages/login/Login.jsx';


const router = createBrowserRouter([
  {
    path: "/",
    element: <Home></Home>,
  },
  {
    path: "/ragistration",
    element: <Ragistration></Ragistration>,
  },
  {
    path: "/login",
    element: <Login></Login>,
  },
  
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
   <RouterProvider router={router} />
    {/* <App /> */}
  </React.StrictMode>,
)
