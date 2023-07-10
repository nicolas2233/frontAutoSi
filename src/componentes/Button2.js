import React, { useState } from 'react';
import styled from 'styled-components'


//STYLES BUTTON

const StyledButton=styled.button`
    width:100%;
    height:100%;
    background:${(props)=>props.disabled ?  "#F7F7F7" : "#FF7528"} ;
    border-radius: 8px;
    color:${(props)=>props.disabled ?  "#9F9F9F" : "white"} ;
    border:none;
    cursor:pointer;
    font-weight: 500;
    font-size: 16px;
    &:hover{
        background: #2196F3;
        color:white;
    }
`;


export default function Button2({text,disabled}){

    return(
            <StyledButton disabled={disabled?disabled:false}  type="submit" >
            {text}
            </StyledButton>
    );

}