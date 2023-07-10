import React, { useState,useEffect } from 'react';
import styled from 'styled-components'
import {BsPersonCircle} from 'react-icons/bs';
import {FiLogOut} from 'react-icons/fi';
import {get_login,logOut  } from '../store/slices/loginSlice';
import { useDispatch, useSelector } from 'react-redux/es/exports';
import Alert from './Alert';
//STYLES BUTTON

const StyledHeader=styled.header`
   width:100%;
   display:flex;
    justify-content:space-between;
    align-items:center;
    height:9vh;
  
`;
const StyledCategory=styled.p`
margin:0px;
font-size:40px;
@media all and (max-width:700px){
        margin-left:20vw;
}
@media all and (max-width:700px){
    font-size: 26px;
}
`;
const StyledPerson=styled.div`
margin:0px;
margin-right:42px;
display:flex;
justify-content:center;
align-items:center;
svg{
     margin-bottom:3px;
     margin-left:15px;
     width:35px;
     height:35px;
     color:${({color})=>color}; 
 
       
}
span{
    display:flex;
    justify-content;
    svg{
        cursor:pointer;
        width:25px;
        height:25px;
        font-weight:700;
    }
}



`;
const StyledPP2=styled.p`
    margin:0;
    font-size: 14px;
    margin-bottom:3px;
    text-align:right;
`;
const StyledPP3=styled.p`
    margin:0;
    font-size: 12px;
    color:#9F9F9F;
    text-align:right;
   
`;
const StyledContainPerson =styled.div`
   margin:0px;
   display:flex;
   flex-direction:column;
   justify-content:center;
   transition:all 0.5s ease;
`;
const StyledHr =styled.div`
    margin:0px;
   margin-bottom:20px;
   color:rgba(0, 0, 0, 0.03);
   margin-right:42px;
  
   border: 1px solid rgba(0, 0, 0, 0.03);
`;

export default function Button({text}){
    const [isDesktop, setIsDesktop]= useState(window.innerWidth);
    const stateLogin= useSelector(stateLogin=>stateLogin)
    const [right, setRight]= useState(false);
    const dispatch= useDispatch()
    const [guardado,setGuardado]=useState(false)
    const [rol,setRol]=useState('ROL')
    const checkOut=()=>{
        setGuardado(true)
    }
    useEffect(()=>{
                if(isDesktop>700){
                    setRight(true)
                }else{
                    setRight(false)
                }
        
     },[])
     const exitAlert =()=>{
        setGuardado(false)
    }
    const handleClickButton=()=>{
        setGuardado(false)
        dispatch(logOut()) 
    }
    useEffect(()=>{
        if(stateLogin.login.user.vendors.category==='1'){
            setRol('Vendedor JR')

        }else if(stateLogin.login.user.vendors.category==='2'){
            setRol('Vendedor SR')
        }else if(stateLogin.login.user.vendors.category==='3'){
            setRol('Jefe de equipo')
        }else if(stateLogin.login.user.vendors.category==='4'){
            setRol('Gerente')

        }else if(stateLogin.login.user.vendors.category==='5'){
            setRol('Admin')

        }
    
      },[stateLogin]);
    
    return(<>
            <StyledHeader >
                <StyledCategory> {text}
                </StyledCategory>
             
                <StyledPerson color="#C4C4C4">{right?<StyledContainPerson><StyledPP2>{stateLogin.login.user.vendors?stateLogin.login.user.vendors.name+' '+stateLogin.login.user.vendors.lastname:stateLogin.login.user.vendors.name}</StyledPP2><StyledPP3>{rol}</StyledPP3></StyledContainPerson>:""}<BsPersonCircle/><span onClick={checkOut}><FiLogOut/></span></StyledPerson>
                

            </StyledHeader>
            <StyledHr></StyledHr>
            <Alert alert={{action:guardado,type:"logOut",exit:exitAlert,title:"¿Desea cerrar sesión?",text:"Al continuar se cerrara sesión y se redirigirá a la pantalla de incio de sesión.",button:"Cerrar sesión",handleClickButton:handleClickButton}} />
            </>
    );

}