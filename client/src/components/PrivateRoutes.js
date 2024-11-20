 
import React, { useEffect } from 'react';
import {  useNavigate } from 'react-router-dom';

const PrivateRoute = ({ children }) => {
    const naviagate = useNavigate()
    useEffect(()=>{
        const token = localStorage.getItem('googleToken') || localStorage.getItem('Token');
  
 
        if (!token) {
          return naviagate('/login') 
        }

    },[])
 

  return children;  
};

export default PrivateRoute;
