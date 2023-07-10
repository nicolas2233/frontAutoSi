import React, { useState } from 'react';
import styled from 'styled-components'
import ButtonMenu from '../ButtonMenu';
import Contacto from './Contacto';
import Calendario from './Calendario';
import Historial from './Historial';
import Eventos from './Eventos';


//STYLES 

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
    overflow-x: auto !important;
    
}
`;


export default function Clientes(){

    const [disabledCalendario,setDisabledCalendario]=useState(true)
    const [disabledContactos,setDisabledContactos]=useState(false)
    const [disabledHistorial,setDisabledHistorial]=useState(true)
    const [disabledEventos,setDisabledEventos]=useState(true)


    const handleClickMenuButtom=(e)=>{
            if(e.target.textContent=="Calendario"){
                setDisabledCalendario(false)
                setDisabledContactos(true)
                setDisabledHistorial(true)
                setDisabledEventos(true)
            }else if(e.target.textContent=="Contactos"){
                setDisabledCalendario(true)
                setDisabledContactos(false)
                setDisabledHistorial(true)
                setDisabledEventos(true)
            }else if(e.target.textContent=="Contratos"){
                setDisabledHistorial(false)
                setDisabledCalendario(true)
                setDisabledContactos(true)
                setDisabledEventos(true)
            }else{
                setDisabledHistorial(true)
                setDisabledCalendario(true)
                setDisabledContactos(true)
                setDisabledEventos(false)
            }
    }    
    return(
            <>
            <StyledContainMenu>
            <ButtonMenu handleClickMenuButtom={handleClickMenuButtom} text="Contactos" disabledd={disabledContactos}></ButtonMenu>
             <ButtonMenu handleClickMenuButtom={handleClickMenuButtom} text="Calendario" disabledd={disabledCalendario}></ButtonMenu>
            <ButtonMenu handleClickMenuButtom={handleClickMenuButtom} text="Contratos" disabledd={disabledHistorial}></ButtonMenu>
            <ButtonMenu handleClickMenuButtom={handleClickMenuButtom} text="Eventos" disabledd={disabledEventos}></ButtonMenu>

            </StyledContainMenu>
            {!disabledContactos?<Contacto ></Contacto>:""}
            {!disabledCalendario?<Calendario ></Calendario>:""}
            {!disabledHistorial?<Historial ></Historial>:""}
            {!disabledEventos?<Eventos ></Eventos>:""}

            <StyledContainer2  >
            </StyledContainer2>
            </>
    );

}