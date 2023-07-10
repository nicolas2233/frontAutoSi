import React, { useEffect, useState } from 'react';
import styled from 'styled-components'
import {BsPersonCircle} from 'react-icons/bs';
import { useSelector } from 'react-redux/es/exports';


//STYLES 

const StyledInicio=styled.section`
    width:100%;
    height:auto;
    display:flex;
    h3{
        font-weight: 400;
        font-size: 20px;
    }
   @media all and (max-width:1000px){
            flex-direction:column;
   }
`;
const StyledContainer=styled.div`
    width:50%;
    height:auto;
    padding:20px;
    padding-top:10px;
    padding-left:25px;
    border-right:2px solid rgba(0,0,0,0.1);
    div{
        display:flex;
        flex-wrap:wrap;
        
      
    }
   
    @media all and (max-width:1000px){
        width:100%;
        border:none;
        }
        
    
    
`;
const StyledContainer2=styled.div`
    width:50%;
    height:auto;
    padding:20px;
    padding-top:10px;
    padding-left:25px;
    @media all and (max-width:1000px){
        width:100%;
        }
    div{
        width:100%;
    }
    
    
`;

const StyledDivSubtitule2=styled.div`
   padding-left:7%;
   display:flex;
   justify-content:start; 
   align-items:center;
   width:50%; 
   svg{
        margin-right:10px;
        margin-left:0px;
        width:55px;
        height:55px;
        color:${({color})=>color}; 
    
          
   }
   margin-bottom:22px;
   border-radius:8px;
   box-shadow: 0px 4px 10px  rgba(0, 0, 0, 0.05);
   height:auto;
   @media all and (max-width:700px){
    width:100%;

    }
`;
const StyledPP2=styled.p`
    margin:0;
    font-size: 16px;
    margin-bottom:3px;
   
`;
const StyledPP3=styled.p`
    margin:0;
    margin-bottom:2px;
    font-size: 12px;
    color:#9F9F9F;
   
`;
const StyledContainPerson =styled.div`
   margin-left:5px;
   display:flex;
   flex-direction:column;
   transition:all 0.5s ease;
   @media all and (max-width:700px){
    width:70%;

    }
`;


export default function Equipo(){

    const groupLogin= useSelector(stateGroup=>stateGroup)
    const [stateMem,setStateMem]=useState([])
    const [idLider,setIdLider]=useState(parseInt(groupLogin.group.group.members?groupLogin.group.group.members.lider:''))
    const [lider,setLider]=useState([])
    useEffect(()=>{

        if(groupLogin.group.group.members){
            let data=groupLogin.group.group.members.vendors.filter((e)=>e.id!==idLider)
            setStateMem(data)
            let data2=groupLogin.group.group.members.vendors.filter((e)=>e.id===idLider)
            setLider(data2) 
        }
        
    },[])

    return(
            <StyledInicio>
                                <StyledContainer>
                                <h3>Equipo:{groupLogin.group.group.members?groupLogin.group.group.name:' Actualmente no tienes equipo'}</h3>
                                
                                <br/>
                                <div>
                                {stateMem?stateMem.map((e,key)=>                                <StyledDivSubtitule2 key={key} color="#CCB700"><BsPersonCircle/><StyledContainPerson><StyledPP2>{e.name+', '+e.lastname}</StyledPP2><StyledPP3>+{e.phone}</StyledPP3><StyledPP3>{e.category==='1'?'Vendedor JR':e.category==='2'?'Vendedor SR':e.category==='3'?'Jefe de equipo':e.category==='4'?'Gerente':'Rol'}</StyledPP3></StyledContainPerson></StyledDivSubtitule2>
                                ):""}

                               
                                </div>
                                </StyledContainer>
                                
                                <StyledContainer2>
                                {groupLogin.group.group.members?<h3>Tú lider de equipo</h3>:''}
                                
                                <br/>
                                {lider[0]?
                                <StyledDivSubtitule2 color="#AD1D12"><BsPersonCircle/><StyledContainPerson><StyledPP2>{lider[0].name}</StyledPP2><StyledPP3>+{lider[0].phone}</StyledPP3><StyledPP3>{lider[0].category==='1'?'Vendedor JR':lider[0].category==='2'?'Vendedor SR':lider[0].category==='3'?'Jefe de equipo':lider[0].category==='4'?'Gerente':'Rol'}</StyledPP3></StyledContainPerson></StyledDivSubtitule2>:'' }
                            

                                </StyledContainer2>
            </StyledInicio>
    );

}