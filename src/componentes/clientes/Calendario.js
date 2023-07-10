import styled from "styled-components";
import Evento from "../Evento.js";
import Button from './../Button'
import React, { useEffect, useRef, useState } from 'react';
import CargarDatos from "../CargarDatos.js";
import CargarContrato from "../CargarContrato.js";
import CargarCrediticios from "../CargarCrediticios.js"
import App2 from './../../calendari/App2'
import ContextWrapper from "../../calendari/context/ContextWrapper.js";
import { useDispatch, useSelector } from 'react-redux/es/exports';
import { fetchUtil } from '../../util/fetchUtil';
import {  Url } from "../../util/rutas.js";

const StyledInicio=styled.section`
overflow-x: hidden;
padding:20px;
padding-top:0px;
position:relative;
background-color:white;
width:calc(100% - 42px);
margin:0px;
height:100%;
box-shadow: 0px 4px 16px rgba(0, 0, 0, 0.05);
border-radius: 0px 14px 0px 0px;
@media all and (max-width:700px){
    width:100%;
    border-radius: 14px 14px 0px 0px;
    overflow-x: auto !important;
}
`;
const StyledCointainCalendar=styled.div`
    width:87%;
    height:90vh;
    margin-bottom:10px;
   

    @media all and (max-width:1300px){
        margin-top:48px;
    }
`;
const StyledCotainButtons=styled.div`
    display:flex;
    justify-content:space-between;
    align-items:center;
    margin:0px;
    position:absolute;
    right:30px;
    top:50px; 
    @media all and (max-width:1300px){
        left:30px;
    }
    span{
        margin:0px;
    }
    button{
        width:133px;
        height:54px;
        margin:0px;
    }
`;
const StyledTwoButton=styled.div`
    margin:0px;
    display:flex;
    justify-content:center;
    align-items:center; 
    flex-direction:column;
    button{
        margin-bottom:25px;
    }
    @media all and (max-width:1300px){
        flex-wrap:wrap;
        flex-direction:row;
        margin-top:-36px;

        button{
            margin-left:10px;
            width:90px;
            height:35px !important;
            font-size:11px;
        }
    }
`;
export default function Calendario(){
    const stateLogin= useSelector(stateLogin=>stateLogin)
    let api= fetchUtil();
    let url=Url('client')
    const [seeDatos,setSeeDatos]=useState(false)
    const [seeContrato,setSeeContrato]=useState(false)
    const [seeCrediticios,setSeeCrediticio]=useState(false)

    const [dataGet,setDataGet]=useState([])
    useEffect(()=>{ 
        api.get(url,{headers:
        {"Content-Type":"application/json",
            "x-access-token":stateLogin.login.user.token,
            "Accept":"*/*",
            "Accept-Encoding":"gzip, deflate, br"
         }
             }).then(res=>{
        if(!res.message){
            setDataGet(res)
         }
        }) },[])
     const recargarClientes=()=>{
        api.get(url,{headers:
            {"Content-Type":"application/json",
                "x-access-token":stateLogin.login.user.token,
                "Accept":"*/*",
                "Accept-Encoding":"gzip, deflate, br"
             }
                 }).then(res=>{
            if(!res.message){
                setDataGet(res)
             }
            })
     }   
   
    const abrirCargarDatos=()=>{
        setSeeDatos(true)
    }
    const abrirCargarCrediticio=()=>{
        setSeeCrediticio(true)
    }
    const exitDatos=()=>{
        setSeeDatos(false)
        }
    const abrirCargarContrato=()=>{
            setSeeContrato(true)
        }
    const exitContrato=()=>{
            setSeeContrato(false)
            }
            const exitCrediticios=()=>{
                setSeeCrediticio(false)
                }

    return(
           <>
                <StyledInicio>
                        <StyledCointainCalendar>
                          <ContextWrapper dataClientes={dataGet}>
                            <App2 ></App2>
                            </ContextWrapper>
                        </StyledCointainCalendar>
                        <StyledCotainButtons>
                          
                            <StyledTwoButton>
                            <span onClick={abrirCargarDatos}><Button  text='Cargar datos'>

                                </Button></span>
                               <span  onClick={abrirCargarCrediticio}><Button text='Datos crediticios'>

                                </Button></span> 
                                <span  onClick={abrirCargarContrato}><Button text='Cargar contrato'>

                                    </Button></span>
                            </StyledTwoButton>
                        </StyledCotainButtons>
                </StyledInicio>
                <CargarDatos datos={{action:seeDatos,dataClientes:dataGet,exit:exitDatos,recargar:recargarClientes}}></CargarDatos>
                <CargarContrato datos={{action:seeContrato,dataClientes:dataGet,exit:exitContrato,recargar:recargarClientes}}></CargarContrato>
                <CargarCrediticios datos={{action:seeCrediticios,dataClientes:dataGet,exit:exitCrediticios,recargar:recargarClientes}}></CargarCrediticios>

           </>
    );

}