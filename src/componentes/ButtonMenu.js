import React, { useState } from 'react';
import styled from 'styled-components'


//STYLES BUTTON

const StyledButton=styled.button`
    padding:17px 18px;
    margin:0px;
    background:${(props)=>props.disabledd ?  "rgba(0, 0, 0, 0.03)" : "#FFFFFF"} ;
    border-radius: 8px 8px 0px 0px;
    font-size: 16px;
    color:${(props)=>props.disabledd ?  "#606060" : "#FF7528"};
    border:none;
    cursor:pointer;
    &:hover{
        color:#FF7528;
    }
    margin-right:6px;
    
`;


export default function ButtonMenu({text,disabledd,handleClickMenuButtom}){

    return(
            <StyledButton onClick={handleClickMenuButtom} disabledd={disabledd?disabledd:false}  type="submit" >
            {text}
            </StyledButton>
    );

}