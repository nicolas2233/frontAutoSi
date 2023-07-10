import React, { useRef,useEffect } from 'react';
import styled from 'styled-components'
import Union from './../img/Union.svg'
//import Input from  './Input'

const StyledDark=styled.div`
    overflow:hidden;
    width:100vw;
    height:100vh;
    background-color:rgba(0,0,0,0.4);
    backdrop-filter:blur(2px);
    z-index:12333;
    left:0px;
    top:0px;
    position:fixed;
    margin:0px;
    transition:all 0.5s ease;
    box-shadow: 0px 4px 16px rgba(0, 0, 0, 0.05);
    display:none;
    justify-content:center;
    align-items:center;
    z-index:123333123213212;
    @media all and (max-width:700px){
        align-items:end;
    }
`;
const StyledBigContain=styled.div`
        width:450px;
        height:600px;
        background-color:white;
        border-radius:14px;
        overflow:auto;
        overflow-x:hidden;
        bottom:0px;
        max-height:95vh;
        padding:10px 20px;
        transition:all 0.4s ease;
        z-index:123333123213212;
        .contactoHeader{
            display:flex;
            justify-content:space-between;
            align-items:center;
            padding-bottom:10px;
            margin-bottom:10px;
            border-bottom: 1px solid rgba(0, 0, 0, 0.03);
            h4{
                color: #FF7528;
                font-weight: 400;
                font-size: 32px;
                margin:0px;
            }
            img{
                margin:0px;
                cursor:pointer;
            }
        }
        

    @media all and (max-width:700px){
        width:100%;
    }
 
`;

export default function Evento({expediente}){
    const expedienteMove=useRef()
    const alertDark=useRef()
    // deslizar hacia arriba
    const moveUp = ()=>{
        alertDark.current.style.display="flex"
        setTimeout(function(){
            expedienteMove.current.style.marginBottom="0%"
            
        },0)
    }
    // deslizar hacia abajo
    const moveDown=()=>{
        setTimeout(function(){
        expedienteMove.current.style.marginBottom="-100%"
    },0)
    setTimeout(function(){
        alertDark.current.style.display="none"
    },500)
    }

    //acionar
    useEffect(()=>{
        if(expediente.action){
            moveUp()
        }else if(expediente.action===false){
            moveDown()
        }
    })
   

    return(
            <>
                <StyledDark ref={alertDark} >
                <StyledBigContain ref={expedienteMove}>
                        <div className='contactoHeader'>
                                 <h4>ALFREDO GONZALEZ</h4>
                                 <img onClick={()=>expediente.exit()} src={Union} alt="Exit"/>
                        </div>
                 
                       
                 
                          
                </StyledBigContain>
                </StyledDark>

            </>
    );

}