import React, { useState } from 'react';
import styled from 'styled-components'
import viewPassword from './../img/viewPassword.svg'
import dontViewPassword from './../img/dontViewPassword.svg'

//STYLES INPUT 
const StyledInput=styled.input`
    width:100%;
    height:100%;
    border: 1px solid rgba(0, 0, 0, 0.2);
    border-radius: 8px;
    padding-left:3%;
    &:hover{
        border: 2px solid #FD7022;
    }
    &:focus{
        outline:#FD7022;
        border: 2px solid #FD7022;
    }
`;
const StyledInputWrong=styled.input`
    width:100%;
    height:100%;
    border: 1px solid #AD1D12;
    border-radius: 8px;
    padding-left:5%;
 
    outline:none;
`;
const StyledP=styled.p`
    color: #AD1D12;
    font-size:14px;
    margin-top:10px;
`;
const StyledImg=styled.img`
    position:absolute;
    width:auto;
    height:auto;
    right:3%;
    top:calc(50% - 7px);
    z-index:2;
    &:hover{
        filter: opacity(1) drop-shadow(0 0 0 black);
    }
`;
const StyledDiv=styled.div`
    position:relative;
    width: 100%;
    height: 100%;
  
`;
export default function Input({input,pWrong}){

    const [seePassword,setSeePassword]=useState("password")
    
    const handleClickViewPassword=()=>{ 
        if(seePassword==="password"){
            
            setSeePassword("text")
        }else{
            setSeePassword("password")
        }
    }
   

    return(
            <>
             {pWrong&&input.name==="password"?<StyledDiv><StyledInputWrong  name={input.name} id={input.name} type={seePassword} value={input.value} onChange={input.setValue?input.setValue:""}/>{seePassword==="text"?<StyledImg onClick={handleClickViewPassword} src={viewPassword} alt="viewPassword"/>:<StyledImg onClick={handleClickViewPassword} src={dontViewPassword} alt="viewPassword"/>}</StyledDiv>:(!pWrong&&input.name==="password")?
             <StyledDiv> <StyledInput  value={input.value} name={input.name} id={input.name} type={seePassword} onChange={input.setValue?input.setValue:""}/>{seePassword==="text"?<StyledImg onClick={handleClickViewPassword} src={viewPassword} alt="viewPassword"/>:seePassword==="password"?<StyledImg onClick={handleClickViewPassword} src={dontViewPassword} alt="viewPassword"/>:""}</StyledDiv>:""}
             {pWrong&&input.name!=="password"?<StyledDiv><StyledInputWrong  value={input.value} name={input.name} id={input.name} type={input.type} onChange={input.setValue?input.setValue:""}/></StyledDiv>:(!pWrong&&input.name!=="password")? <StyledDiv> <StyledInput disabled={input.disabled?true:false} placeholder={input.placeholder} value={input.value} name={input.name} id={input.name} type={input.type} onChange={input.setValue?input.setValue:""}/></StyledDiv>:""}
            {pWrong?<StyledP>{pWrong}</StyledP>:null}
            </>
    );

}