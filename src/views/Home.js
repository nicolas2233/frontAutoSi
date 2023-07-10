import React, { useState,useEffect } from 'react';
import styled from 'styled-components'
import Vendedor from '../componentes/Vendedor';
import HeaderHome from '../componentes/HeaderHome'
import Perfil from '../componentes/perfil/Perfil';
import Clientes from '../componentes/clientes/Clientes';
import ClientesAdmin from '../componentes/clientesAdmin/ClientesAdmin';
import Estadisticas from '../componentes/estadisticas/Estadisticas';
import Notificaciones from '../componentes/notificaciones/Notificaciones';
import { useSelector, useDispatch } from 'react-redux/es/exports';
import { Navigate, useNavigate} from 'react-router-dom';
import Colaboradores from '../componentes/colaboradores/Colaboradores';
import Formularios from '../componentes/formulario/Formularios';
import { Url } from './../util/rutas';
import { fetchUtil } from './../util/fetchUtil';
import {initialS  } from '../store/slices/loginSlice';
//STYLES BUTTON

const StyledContainer=styled.div`
    display:flex;
    width:100%;
    overflow-x:hidden;
`;
const StyledMain=styled.div`
    display:flex;
    flex-direction:column;
    width:100%;
    min-height:100vh;
    overflow-x:hidden;
`;


export default function Home(){
    const [textHeaderHome,setTextHeaderHome]=useState("perfil")
    const [whereHere,setWhereHere]=useState("perfil")
    const stateLogin= useSelector(stateLogin=>stateLogin)
    const dispatch= useDispatch()
    useEffect(()=>{dispatch(initialS())},[])
    if(stateLogin.login.user.token==="UNLOGED"||stateLogin.login.user.token==="ERROR"){
        return <Navigate to='/iniciar-sesion'></Navigate>
    }
   
    const handleClickVendedor=(where)=>{

            if(where==="perfil"){
                setWhereHere("perfil")
                setTextHeaderHome("Mi Perfil")
            }else if(where==="clientes"){
                setWhereHere("clientes")
                setTextHeaderHome("Mis clientes")
            }else if(where==="clientes2"){
                setWhereHere("clientes2")
                setTextHeaderHome("Clientes")
            }else if(where==="estadistica"){
                setWhereHere("estadistica")
                setTextHeaderHome("Estadísticas")
            }else if(where==="notificacion"){
                setWhereHere("notificacion")
                setTextHeaderHome("Notificaciones")
            }else if(where==="ayuda"){
                setWhereHere("ayuda")
                setTextHeaderHome("Ayuda")
            }else if(where==="colaboradores"){
                setWhereHere("colaboradores")
                setTextHeaderHome("colaboradores")
            }else if(where==="formulario"){
                setWhereHere("formulario")
                setTextHeaderHome("Formularios")
            }
    }
    return(
            <>
            <StyledContainer>
            <Vendedor whereHere={whereHere} handleClickVendedor={handleClickVendedor}></Vendedor>
            <StyledMain>
            <HeaderHome text={textHeaderHome}></HeaderHome>
            {whereHere==="clientes"?<Clientes></Clientes>:""}
            {whereHere==="clientes2"&&(stateLogin.login.user.vendors.category=="4"||stateLogin.login.user.vendors.category=="5")?<ClientesAdmin></ClientesAdmin>:""}
            {whereHere==="perfil"?<Perfil handleClickVendedor={handleClickVendedor} ></Perfil>:""}
            {whereHere==="estadistica"?<Estadisticas handleClickVendedor={handleClickVendedor} ></Estadisticas>:""}
            {whereHere==="notificacion"?<Notificaciones handleClickVendedor={handleClickVendedor} ></Notificaciones>:""}
            {whereHere==="colaboradores"?<Colaboradores handleClickVendedor={handleClickVendedor} ></Colaboradores>:""}
            {whereHere==="formulario"&&(stateLogin.login.user.vendors.category=="4"||stateLogin.login.user.vendors.category=="5")?<Formularios handleClickVendedor={handleClickVendedor} ></Formularios>:""}
            {whereHere==="ayuda"?<Estadisticas handleClickVendedor={handleClickVendedor} ></Estadisticas>:""}
            </StyledMain>
            </StyledContainer>
            </>
    );

}