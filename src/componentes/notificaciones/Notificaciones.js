import React, { useState,useEffect } from 'react';
import styled from 'styled-components'
import ButtonMenu from '../ButtonMenu';
import { fetchUtil } from '../../util/fetchUtil';
import spinner from '../../img/spinner.gif'
import { Url } from '../../util/rutas';
import { useDispatch, useSelector } from 'react-redux/es/exports';
//STYLES 

const StyledContainer=styled.main`
    h1{
        font-size:30px;
    }
    overflow-x: hidden;
    padding:20px;
    background-color:white;
    width:calc(100% - 42px);
    margin:0px;
    height:100%;
    box-shadow: 0px 4px 16px rgba(0, 0, 0, 0.05);
    border-radius: 0px 14px 0px 0px;
    gap:16px;
    display:flex;
    flex-direction:column;
    span{
        color:#FF7528;
    }
    p{
        font-weight: 400;
        font-size: 12px;
        color: #606060;
        margin-bottom:10px;
    }
    h3{
        font-size: 20px;
        margin-bottom:4px;
    }
    div{
        box-shadow: 0px 4px 16px rgba(0, 0, 0, 0.05);
        border-radius: 8px;
        width:500px;
        padding-top:10px;
        padding-left:20px;
    }
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


export default function Notificaciones(){
    let api= fetchUtil();
    const stateLogin= useSelector(stateLogin=>stateLogin)
    let url=Url('events/eventTime')
    let url22=Url('client')
    const [disabled,setDisabled]=useState(false)
    const [clientes,setClientes]=useState()
    const [data, setData]=useState([])
    const [contratos,setContratos]=useState()

    useEffect(()=>{
        api.get(url22,{headers:
            {"Content-Type":"application/json",
                "x-access-token":stateLogin.login.user.token,
                "Accept":"*/*",
                "Accept-Encoding":"gzip, deflate, br"
             }
                 }).then(res2=>{
            if(!res2.message){
                setClientes(res2)
                api.get(url,{headers:
                    {"Content-Type":"application/json",
                        "x-access-token":stateLogin.login.user.token,
                        "Accept":"*/*",
                        "Accept-Encoding":"gzip, deflate, br"
                     }
                         }).then(res=>{
                    if(!res.message){
                       setContratos(res)
                       let data=[]
                       res.forEach(element=>{
                        let nombre= res2.filter(el=>el.id==element.cliente)
                        let pussh={
                            nota:element.nota,
                            hora:element.hora,
                            tipo:element.tipo,
                            dia:element.dia,
                            estado:element.estado,
                            clienteNombre:nombre[0]?nombre[0].cliente.nombre:'',
                            clienteApellido:nombre[0]?nombre[0].cliente.apellido:'',
                        }
                               data.push(pussh)
                       })
                       setData(data)
                     } 
                    })
             }
            }) 
   

        
    },[])
    const handleClickMenuButtom=(e)=>{
          
    }    
    return(
            <>
            <StyledContainMenu>
             <ButtonMenu handleClickMenuButtom={handleClickMenuButtom} text="Alarmas" disabledd={disabled}></ButtonMenu>
            
            </StyledContainMenu>
            <StyledContainer  >
                    <h1>Eventos del día{' ('+data.length+')'}</h1>
                    {data.length>0?data.map((element)=>
                    
                    <div key={element.id}>
                      
                        <p>{element.dia+' a las '}<span>{element.hora}</span></p>
                        <h3>{'Cliente: '}<span>{element.clienteNombre+' '+element.clienteApellido}</span></h3>
                        <h3>{'Evento: '}<span>{element.tipo}</span></h3>
                        <p>{element.nota}</p>
                        </div>):''}
            </StyledContainer>
            <StyledContainer2  >
            </StyledContainer2>
            </>
    );

}