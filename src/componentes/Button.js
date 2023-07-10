import React, { useState } from 'react';
import styled from 'styled-components'


//STYLES BUTTON

const StyledButton=styled.button`
    width:100%;
    height:100%;
    background:${(props)=>props.disabled ?  "rgba(0,0,0,0.5)" : "#FF7528"} ;
    border-radius: 8px;
    font-weight: 500;
    font-size: 16px;
    color:white;
    border:none;
    cursor:pointer;
    &:hover{
        background: #2196F3
    }
`;


export default function Button({text,disabled}){

    return(
            <StyledButton disabled={disabled?disabled:false}  type="submit" >
            {text}
            </StyledButton>
    );

}