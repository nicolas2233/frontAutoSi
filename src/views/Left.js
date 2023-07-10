import './../App.css';
import React,{useEffect, useState} from 'react';
import { useSelector } from 'react-redux/es/exports';
import { Navigate } from 'react-router-dom';
// STYLES 




function Left() {
    const stateLogin= useSelector(stateLogin=>stateLogin)
    if(stateLogin.login.user.token==="UNLOGED"){
        return <Navigate to='iniciar-sesion'></Navigate>
    }else {
        return <Navigate to='/'></Navigate>

    }
  return (
   <></>
  );
}

export default Left;