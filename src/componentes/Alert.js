import React, { useEffect, useRef, useState } from 'react';
import styled from 'styled-components'
import Union from './../img/Union.svg'
import Check from './../img/check.svg'
import Remove from './../img/remove.svg'
import Button from './Button';
import {AiOutlineLogout} from 'react-icons/ai'
import {BsFillPersonDashFill} from 'react-icons/bs'


//STYLES BUTTON

const StyledAlert=styled.div`
margin-bottom:-200%;
display: flex;
flex-direction: column;
align-items: flex-end;
padding: 20px;
gap: 8px;
transition:all 0.4s ease;
z-index:1233344;
width: 452px;
height: auto;
position:relative;
background: #FFFFFF;
box-shadow: 0px 4px 16px rgba(0, 0, 0, 0.05);
border-radius: 14px;
.red{
    color:#F02849;
}
    .alertContainCruz{
        height:50px;
        width:100%;
        display:flex;
        align-items:center;
        justify-content:flex-end;
        .alertCruz{
           margin:0px;
           cursor:pointer;
          }
    }
    .alertContain{
        display: flex;
        flex-direction: column;
        align-items: center;
        padding: 20px;
        padding-top:0px;
        gap: 40px;
        width: 412px;
        height: auto;
        .alertContent{
            display: flex;
            flex-direction: column;
            align-items: center;
            padding: 0px;
            gap: 20px;
            width: 310px;
            height: auto;  
            .alertIcon{
                display: flex;
                flex-direction: column;
                justify-content: center;
                align-items: center;
                width: 72px;
                height: 72px;
            }  
            .alertTitle{
                
            }
            .alertText{
                font-family: 'Roboto';
                font-style: normal;
                font-weight: 400;
                font-size: 16px;
                line-height: 20px;
                text-align: center;
                color: #606060;
            }
                    
        }
        .containButton{
            height:50px;
            width:100%;
        }
                   
    }
    

@media all and (max-width:700px){
        width:100%;
        .alertContain{
            width:auto;
        }
    }

 @media all and (max-height:500px){
    transform:scale(0.7)
 }
 @media all and (max-height:340px){
    transform:scale(0.65)
 }


`;
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
    @media all and (max-width:700px){
        align-items:end;
    }
`;
const StyledAlertTitle=styled.h6`
font-family: 'Roboto';
font-style: normal;
font-weight: 400;
font-size: 32px;
line-height: 40px;
text-align: center;
margin:0px;
color:${({colortake})=>colortake} ;
`;

export default function Alert({alert}){ 
    const alertMove=useRef()
    const alertDark=useRef()

    // deslizar hacia arriba
    const moveUp = ()=>{
        alertDark.current.style.display="flex"
        setTimeout(function(){
            alertMove.current.style.marginBottom="0%"
            
        },0)
    }
    // deslizar hacia abajo
    const moveDown=()=>{
        setTimeout(function(){
        alertMove.current.style.marginBottom="-200%"
    },0)
    setTimeout(function(){
        alertDark.current.style.display="none"
    },500)
    }

    //acionar
    useEffect(()=>{
        if(alert.action){
            moveUp()
        }else if(alert.action===false){
            moveDown()
        }
    })
   

    return(
        <>
            <StyledDark ref={alertDark} >
                
             <StyledAlert ref={alertMove}>
                        <div className='alertContainCruz'>
                        <img onClick={()=>alert.exit()} className='alertCruz'  src={Union}/>
                        </div>
                        
                        <div className='alertContain'>
                                <div className='alertContent'>
                                {alert.type==="add"?<img className='alertIcon' src={Check}/>:alert.type==="remove"?<img className='alertIcon' src={Remove}/>:alert.type==="logOut"?<AiOutlineLogout className='alertIcon red' />:alert.type==="questionRemove"?<BsFillPersonDashFill className='alertIcon red' />:""}
                                             <StyledAlertTitle className='alertTitle' colortake={alert.type==="add"?"#4CAF50":"#F02849"} >{alert.title}</StyledAlertTitle>
                                             <p className='alertText'>{alert.text}</p>
                                </div>
                                <div onClick={()=>alert.handleClickButton()} className='containButton'>
                                <Button  text={alert.button}></Button>
                                </div>

                        </div>
             </StyledAlert>
             </StyledDark>
            </>
    );

}