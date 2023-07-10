import React, { useState } from 'react';
import styled from 'styled-components'
import Select from 'react-select'

//STYLES SELECT

const StyledContainSelect=styled.div`
      width:100%;
      height:100%;
      .Select{
        width:100%;
        height:100%;
        background-color: #F7F7F7;
        font-size:14px;
        .css-1s2u09g-control{
            background-color: #F7F7F7;
            border: 1px solid rgba(0, 0, 0, 0.2);
            border-radius: 8px;
            height:100%;
            &:hover{
                border-color:#FD7022 !important;
                box-shadow: 0 0 1px #FD7022 !important;
            }
        }
        .css-1pahdxg-control{
                height:100%;
                background-color: #F7F7F7;
                border-color:#FD7022 !important;
                box-shadow: 0 0 1px #FD7022 !important;
        }
        .css-319lph-ValueContainer{
            padding:0px 8px;
        }
        .css-6j8wv5-Input{
            margin:0px;
            padding:0px;
        }
        .css-26l3qy-menu{
            background-color:  #F7F7F7;
            z-index:123123122;
            div{
                color:black;
                background-color: rgba(0, 0, 0, 0.02);
                z-index:123123122;
                cursor:pointer;
            }
        }
        .css-tlfecz-indicatorContainer{
            cursor:pointer;
        }
      }

`;


export default function SelectGeneric({options}){
    

    return(
            <>    
                <StyledContainSelect >
                     <Select className='Select'
                        defaultValue={options.text?{label:options.text,value:options.text}:""}
                        options={options.array?options.array.map((option)=>({label:option,value:option})):""}
                        onChange={options.setValue?options.setValue:""}
                       
                     ></Select>
                </StyledContainSelect>
            </>
    );

}