import React, { useState } from 'react';
import styled from 'styled-components'
import ButtonMenu from '../ButtonMenu';
import EstadisticasGrupos from './grupos';
import EstadisticasVendedores from './vendedores';
import EstadisticasGlobal from './global';
import { useSelector } from 'react-redux/es/exports';
import EstadisticaVendedor from './vendedor';
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
const StyledContainMenu=styled.div`
  display:flex;
  margin:0px;
  @media all and (max-width:700px){
    margin-left:10px;

}
`;
export default function Estadisticas(){
   
    const [grupo,setGrupo]=useState(true)
    const [vendors,setVendors]=useState(true)
    const [global,setGlobal]=useState(false)
    const stateLogin= useSelector(stateLogin=>stateLogin)
    const handleClickMenuButtom=(e)=>{
        if(e.target.textContent==="Global"){
            setGlobal(false)
            setGrupo(true)
            setVendors(true)
        }else if(e.target.textContent==="Grupos"){
            setGlobal(true)
            setGrupo(false)
            setVendors(true)
        }else if(e.target.textContent==="Vendedores"){
            setGlobal(true)
            setGrupo(true)
            setVendors(false)
        }
    }    
    return(
            <>
          {  
           stateLogin.login.user.vendors.category==="5" || stateLogin.login.user.vendors.category==="3" || stateLogin.login.user.vendors.category==="4"?
           <StyledContainMenu>
                <ButtonMenu handleClickMenuButtom={handleClickMenuButtom} text="Global" disabledd={global}></ButtonMenu>
                <ButtonMenu handleClickMenuButtom={handleClickMenuButtom} text="Grupos" disabledd={grupo}></ButtonMenu>   
                <ButtonMenu handleClickMenuButtom={handleClickMenuButtom} text="Vendedores" disabledd={vendors}></ButtonMenu>
            </StyledContainMenu>    
                :""
            } 
            {
                stateLogin.login.user.vendors.category==="1" || stateLogin.login.user.vendors.category==="2"?
                <StyledContainMenu>
                <ButtonMenu handleClickMenuButtom={handleClickMenuButtom} text="Global" disabledd={global}></ButtonMenu>
            </StyledContainMenu>    
                :""
            }
            <StyledContainer>
            {!global&&(stateLogin.login.user.vendors.category==="5")?<EstadisticasGlobal></EstadisticasGlobal>:""}
            {!grupo&&(stateLogin.login.user.vendors.category==="5")?<EstadisticasGrupos></EstadisticasGrupos>:""}
            {!vendors&&(stateLogin.login.user.vendors.category==="5")?<EstadisticasVendedores></EstadisticasVendedores>:""}
            
            {!global&&(stateLogin.login.user.vendors.category==="1" || stateLogin.login.user.vendors.category==="2")?<EstadisticaVendedor></EstadisticaVendedor>:""}
            
            {!global&&(stateLogin.login.user.vendors.category==="3" || stateLogin.login.user.vendors.category==="4")?<EstadisticasGlobal></EstadisticasGlobal>:""}
            {!grupo&&(stateLogin.login.user.vendors.category==="3" || stateLogin.login.user.vendors.category==="4")?<EstadisticasGrupos></EstadisticasGrupos>:""}
            {!vendors&&(stateLogin.login.user.vendors.category==="3" || stateLogin.login.user.vendors.category==="4")?<EstadisticasVendedores></EstadisticasVendedores>:""}
              </StyledContainer>
            </>
    );

}