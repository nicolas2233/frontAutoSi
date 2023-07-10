import React, { useState } from 'react';
import styled from 'styled-components'
import ButtonMenu from '../ButtonMenu';
import DatosPersonales from './DatosPersonales';
import Equipo from './Equipo';
import Inicio from './Inicio';
//STYLES 

const StyledContainer=styled.main`
    
    overflow-x: hidden;
    padding:20px;
    background-color:white;
    width:calc(100% - 42px);
    margin:0px;
    height:100%;
    box-shadow: 0px 4px 16px rgba(0, 0, 0, 0.05);
    border-radius: 0px 14px 0px 0px;
    @media all and (max-width:700px){
        width:100%;
        border-radius: 14px 14px 0px 0px;
    }
   
    
`;
const StyledContainer2=styled.div`
background-color:rgba(0,0,0,0.4);
backdrop-filter:blur(2px);
   position:fixed;
   width:100vw;
   height:100vh;
   display:none;
`;
const StyledContainMenu=styled.div`
  display:flex;
  margin:0px;
  @media all and (max-width:700px){
    margin-left:10px;

}
`;


export default function Pefil({handleClickVendedor}){

    const [disabledInicio,setDisabledInicio]=useState(false)
    const [disabledDatosPersonales,setDisabledDatosPersonales]=useState(true)
    const [disabledEquipo,setDisabledEquipo]=useState(true)

    const handleClickMenuButtom=(e)=>{
            if(e.target.textContent==="Inicio"){
                setDisabledInicio(false)
                setDisabledDatosPersonales(true)
                setDisabledEquipo(true)
            }else if(e.target.textContent==="Datos personales"){
                setDisabledInicio(true)
                setDisabledDatosPersonales(false)
                setDisabledEquipo(true)
            }else{
                setDisabledInicio(true)
                setDisabledDatosPersonales(true)
                setDisabledEquipo(false)
            }
    }    
    return(
            <>
            <StyledContainMenu>
             <ButtonMenu handleClickMenuButtom={handleClickMenuButtom} text="Inicio" disabledd={disabledInicio}></ButtonMenu>
            <ButtonMenu handleClickMenuButtom={handleClickMenuButtom} text="Datos personales" disabledd={disabledDatosPersonales}></ButtonMenu>
            <ButtonMenu handleClickMenuButtom={handleClickMenuButtom} text="Equipo" disabledd={disabledEquipo}></ButtonMenu>

            </StyledContainMenu>
            <StyledContainer  >
           {!disabledInicio?<Inicio handleClickVendedor={handleClickVendedor} ></Inicio>:""}
            {!disabledDatosPersonales?<DatosPersonales></DatosPersonales>:""}
            {!disabledEquipo?<Equipo></Equipo>:""}

            </StyledContainer>
            <StyledContainer2  >
            </StyledContainer2>
            </>
    );

}