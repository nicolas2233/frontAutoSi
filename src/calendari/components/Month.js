import React, { useEffect, useContext} from "react";
import Day from "./Day";
import {  useSelector } from 'react-redux/es/exports';
import { fetchUtil } from './../../util/fetchUtil';

import GlobalContext from "../context/GlobalContext";
import { useState } from "react";
import {  Url } from "../../util/rutas";
export default function Month({ month }) {
  let api= fetchUtil();
  let url=Url('events')
  let url2=Url('client')
  const stateLogin= useSelector(stateLogin=>stateLogin)
  const [arrayFechas,setArrayFechas]=useState([])
  const {
    dispatchCalEvent,
    dataClientes,
    savedEvents,
    showEventModal
  } = useContext(GlobalContext);
  const [dataGet,setDataGet]=useState([])
    useEffect(()=>{ 
        api.get(url2,{headers:
        {"Content-Type":"application/json",
            "x-access-token":stateLogin.login.user.token,
            "Accept":"*/*",
            "Accept-Encoding":"gzip, deflate, br"
         }
             }).then(res=>{
        if(!res.message){
            setDataGet(res)
            
            funcionRome(res)
         }
       
        }) },[showEventModal])
  const funcionRome=(res2)=>{
    api.get(url,{headers:
      {"Content-Type":"application/json",
          "x-access-token":stateLogin.login.user.token,
          "Accept":"*/*",
          "Accept-Encoding":"gzip, deflate, br"
       }
  }).then(res=>{
     let fechas=[]
     res.forEach(element=>{
          let mes1=element.dia.substring(3,5)
          let mes2=(parseInt(mes1)-1).toString()
          let names=res2.filter((elemento)=>elemento.cliente_Id===element.cliente)
          fechas.push({
            title:names[0].cliente.nombre+", "+names[0].cliente.apellido+" ; "+names[0].telefono,
            description:{hora:element.hora,evento:element.tipo,nota:element.nota,idEvento:element.id},
            label: 'indigo',
            day: new Date(element.dia.substring(6,10),mes2,element.dia.substring(0,2)).valueOf(),      
            id: 16675667155555599+element.id
          })
          
        })
        setArrayFechas(fechas)
        fechas.forEach(element=>{
          dispatchCalEvent({ type: "delete", payload: element });
      })
      fechas.forEach(element=>{
        dispatchCalEvent({ type: "push", payload: element });
    })
      })
      return () => arrayFechas.forEach(e=>{
        console.log(e) 
        dispatchCalEvent({
        type: "delete",
        payload: e,
      })}); 
  }      
 
  
  return (
    <div className="flex-1 grid grid-cols-7 grid-rows-5">
      {month.map((row, i) => (
        <React.Fragment key={i}>
          {row.map((day, idx) => (
            <Day day={day} key={idx} rowIdx={i} />
          ))}
        </React.Fragment>
      ))}
    </div>
  );
}
