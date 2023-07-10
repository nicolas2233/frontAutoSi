import React, { useState,useRef,useEffect } from 'react';
import App2 from "../calendari/App2"
import { fetchUtil } from './../util/fetchUtil';
import { useDispatch, useSelector } from 'react-redux/es/exports';
import { Url} from '../util/rutas'


export default function CalendarAutoSi(){
  const stateLogin= useSelector(stateLogin=>stateLogin)
  let api= fetchUtil();
  let url33=Url('contrato')
  useEffect(()=>{ 
    console.log(stateLogin.login)
    api.get(url33,{headers:
   {"Content-Type":"application/json",
       "x-access-token":stateLogin.login.user.token,
       "Accept":"*",
       "Accept-Encoding":"gzip, deflate, br"
    }
        }).then(res=>{
   if(!res.message){
    } 
   })
},[])
    
      return (
        <>
          
        </>
      )
}



