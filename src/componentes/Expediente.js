import React, { useState,useRef,useEffect } from 'react';
import styled from 'styled-components'
import Union from './../img/Union.svg'
import Input from  './Input'
import { useSelector } from 'react-redux/es/exports';
import { Url } from './../util/rutas';
import { fetchUtil } from './../util/fetchUtil';

const StyledDark=styled.div`
    overflow:hidden;
    width:100vw;
    height:100vh;
    background-color:rgba(0,0,0,0.4);
    backdrop-filter:blur(2px);
    z-index:12333;
    left:0px;
    top:0px;
    position:fixed;
    margin:0px;
    transition:all 0.5s ease;
    box-shadow: 0px 4px 16px rgba(0, 0, 0, 0.05);
    display:none;
    justify-content:center;
    align-items:center;
    z-index:123333123213212;
    @media all and (max-width:700px){
        align-items:end;
    }
`;
const StyledBigContain=styled.div`
        width:450px;
        height:600px;
        background-color:white;
        border-radius:14px;
        overflow:auto;
        overflow-x:hidden;
        bottom:0px;
        max-height:95vh;
        padding:10px 20px;
        transition:all 0.4s ease;
        z-index:123333123213212;
        .contactoHeader{
            display:flex;
            justify-content:space-between;
            align-items:center;
            padding-bottom:10px;
            margin-bottom:10px;
            border-bottom: 1px solid rgba(0, 0, 0, 0.03);
            h4{
                color: #FF7528;
                font-weight: 400;
                font-size: 32px;
                margin:0px;
            }
            img{
                margin:0px;
                cursor:pointer;
            }
        }
        .containMenu{
            nav{
                margin-bottom:10px;
                ul{
                    list-style:none;
                    display:flex;
                    justify-content:center;
                    align-items:center;
                    width:300px;
                    background-color:#F6F6F6;
                    height: 35px;
                    border-radius: 6px;
                    
                    li{
                        width: 98px;
                        height: 32px;
                        cursor:pointer;
                        display:flex;
                        justify-content:center;
                        align-items:center;
                        margin:0px;
                        color: #606060;
                        background-color:#F6F6F6;
                    }
                }
            }
            p{
                color: #606060;
                font-size:12px;
                text-align:center;
            }
            
            
        }
        .datosContain{
            width:100%;
            position:absolute;
            transition:all 1s ease;
            padding:10px;
            font-weight: 400;
            font-size: 14px;
            color: #606060;
            p{
                margin-bottom:5px;
            }
            input{
                height:35px;
                background:#F7F7F7;
                margin-top:2px;
                margin-bottom:8px;
            }
        }
        .datosContainCrediticios{
           width:100%;
           position:absolute;
           margin-left:120%;
           transition:all 1s ease;
           .permuta{
              input{background-color:#4CAF50;color:white;}
           }
        }
        .datosContainContrato{
            width:100%;
            position:absolute;
            margin-left:200%;
            transition:all 1s ease;
        }
        .names{
            display:flex;
            justify-content:space-between;
            margin:0px;
            width:100%;
            div{
                width:95%;
                margin:0px;
               
            }
        }
    .containPages{
        display:flex;
        width:100%;
        position:relative;
      
    }
    @media all and (max-width:700px){
        width:100%;
    }
    .styledMenuLi{
        background-color:white !important;
        border-radius:8px;
        box-shadow:1px 2px 3px rgba(0, 0, 0, 0.1);
    }
`;

export default function Expediente({expediente}){
    let url=Url('contrato')
    let url2=Url('contrato/all')
    let api= fetchUtil();

    const stateLogin= useSelector(stateLogin=>stateLogin)
    const [edad,setEdad]=useState('')
    const [contratos,setContratos]=useState([])
    const [clienteContrato,setClienteContrato]=useState({
        id:"",
        numeroContrato:"",
        metodopago:"",
        suscripcion:"",
        sellado:"",
        otorgado:"",
        adeudado:""
    })
    useEffect(()=>{
      
        let category=stateLogin.login.user.vendors.category
        if(category==1||category==2||category==3){
            api.get(url,{headers:
                {"Content-Type":"application/json",
                    "x-access-token":stateLogin.login.user.token,
                    "Accept":"*",
                    "Accept-Encoding":"gzip, deflate, br"
                 }
                     }).then(res=>{
                if(!res.message){
                    
                    setContratos(res)
                }})
        }else{
            api.get(url2,{headers:
                {"Content-Type":"application/json",
                    "x-access-token":stateLogin.login.user.token,
                    "Accept":"*",
                    "Accept-Encoding":"gzip, deflate, br"
                 }
                     }).then(res=>{
                if(!res.message){
                    
                    setContratos(res)
                }})
        }
    },[])
    useEffect(()=>{
        let category=stateLogin.login.user.vendors.category
        if(category==1||category==2||category==3){
            let client=contratos.filter(el=>el.cliente==expediente.datosForm.cliente_Id)
            if(client[client.length-1]){
                
                setClienteContrato(client[client.length-1])
            }
        }else{
            let client=contratos.filter(el=>el.cliente==expediente.datosForm.cliente_Id)
            if(client[client.length-1]){
                
                setClienteContrato(client[client.length-1])
            }
        }
    },[expediente])
    const expedienteMove=useRef()
    const alertDark=useRef()
    const personales=useRef()
    const crediticios=useRef()
    const contrato=useRef()

    //controlar estado page
    const handleClickPage = (namePage)=>{
        let arrayLi=document.querySelectorAll(".containMenu li")
        arrayLi.forEach((element)=>{
            if(namePage==element.textContent){
                element.classList.add("styledMenuLi")
            }else {
                element.classList.remove("styledMenuLi")
            }
        })
        if(namePage==="Personales"){
             crediticios.current.style.marginLeft="120%"
             personales.current.style.marginLeft="0%"
             contrato.current.style.marginLeft="200%"
        }else if(namePage==="Crediticios"){
              crediticios.current.style.marginLeft="0%"
              personales.current.style.marginLeft="-120%"
              contrato.current.style.marginLeft="120%"
        }else if(namePage==="Contrato"){
              crediticios.current.style.marginLeft="-120%"
              personales.current.style.marginLeft="-120%"
              contrato.current.style.marginLeft="0%"
        }
    }
    // deslizar hacia arriba
    const moveUp = ()=>{
        alertDark.current.style.display="flex"
        setTimeout(function(){
            expedienteMove.current.style.marginBottom="0%"
            
        },0)
    }
    // deslizar hacia abajo
    const moveDown=()=>{
        setTimeout(function(){
        expedienteMove.current.style.marginBottom="-100%"
    },0)
    setTimeout(function(){
        alertDark.current.style.display="none"
    },500)
    }
   const calcularEdad=(fecha)=>{
        var hoy = new Date();
        var cumpleanos = new Date(fecha);
        var edad = hoy.getFullYear() - cumpleanos.getFullYear();
        var m = hoy.getMonth() - cumpleanos.getMonth();
    
        if (m < 0 || (m === 0 && hoy.getDate() < cumpleanos.getDate())) {
            edad--;
        }
    
        return edad;
    }
    //acionar
    useEffect(()=>{

        setEdad(calcularEdad(expediente.datosForm.cliente.Personale.edad?expediente.datosForm.cliente.Personale.edad:new Date()))
        if(expediente.action){
            moveUp()
        }else if(expediente.action===false){
            moveDown()
        }
    },[expediente.action])
   

    return(
            <>
                <StyledDark ref={alertDark} >
                <StyledBigContain ref={expedienteMove}>
                        <div className='contactoHeader'>
                                 <h4>{expediente.datosForm.cliente?expediente.datosForm.cliente.nombre+' '+expediente.datosForm.cliente.apellido:''}</h4>
                                 <img onClick={()=>expediente.exit()} src={Union} alt="Exit"/>
                        </div>
                 
                        <div className='containMenu'>
                            <nav>
                                <ul>
                                    <li id="personales" className="styledMenuLi" onClick={()=>handleClickPage("Personales")}>Personales</li>
                                    <li id="crediticios" onClick={()=>handleClickPage("Crediticios")} >Crediticios</li>
                                    <li id="contrato" onClick={()=>handleClickPage("Contrato")}>Contrato</li>
                                </ul>
                            </nav>
                            <p>Fecha de carga: {expediente.datosForm.createdAt.substring(0,10)} </p>
                            <p>Vendedor: {stateLogin.login.user.vendors.name+' '+stateLogin.login.user.vendors.lastname}</p>
                        </div>
                        <div className='containPages'>
                            <div  ref={personales} className='datosContain'>
                              <label>Teléfono</label>
                              <Input input={{disabled:true,value:expediente.datosForm.telefono,name:"telefono",type:"text"}}></Input>
                              <label>¿Dónde se realizo la entrevista?</label>
                              <Input input={{disabled:true,value:expediente.datosForm.conoci,name:"lugarEntrevista",type:"text"}}></Input>
                               <label>Email</label>
                              <Input input={{disabled:true,value:expediente.datosForm.cliente.Personale.email?expediente.datosForm.cliente.Personale.email:'',name:"email",type:"email"}}></Input>
                              <label>Domicilio del cliente</label>
                              <Input input={{disabled:true,value:expediente.datosForm.cliente.Personale.domicilio?expediente.datosForm.cliente.Personale.domicilio:'',name:"domicilio",type:"text"}}></Input>
                              <div className='names'>
                                    <div>
                                            <label>DNI</label>
                                            <Input input={{disabled:true,value:expediente.datosForm.cliente.Personale.cuil?expediente.datosForm.cliente.Personale.cuil:'',name:"cuil",type:"text"}}></Input>
                                    </div>
                                    <div>
                                            <label>Edad del cliente</label>
                                            <Input input={{disabled:true,value:edad?edad:'',name:"edad",type:"text"}}></Input>
                                    </div>
                               </div>  
                               <label>Relación laboral</label>
                               <Input input={{disabled:true,value:expediente.datosForm.cliente.Personale.laboral.situacion?expediente.datosForm.cliente.Personale.laboral.situacion:'',name:"relacionLaboral",type:"text"}}></Input>
                               <label>¿Cuánto gana?</label>
                               <Input input={{disabled:true,value:expediente.datosForm.cliente.Personale.laboral.ingreso?expediente.datosForm.cliente.Personale.laboral.ingreso+'k':'',name:"cuantoGana",type:"text"}}></Input>
                            </div>
                            <div ref={crediticios} className='datosContain datosContainCrediticios'>
                              <label>¿Tiene movilidad?</label>

                              {expediente.datosForm.cliente.Personale.crediticio.Movilidads.map(element=><div className='permuta'><Input  key={element.id} input={{disabled:true,value:element.tipo+': '+element.marca+', '+element.modelo+', '+' '+element.año+'; permuta: '+element.permuta,name:element.id,type:"text"}}></Input></div>)}  
                              <label>¿Haz comprado alguna vez con crédito?</label>
                              <Input input={{disabled:true,value:expediente.datosForm.cliente.Personale.crediticio.credito,name:"creditoBefore",type:"text"}}></Input>
                              <label>¿Dónde adquirió el crédito?</label>
                              <Input input={{disabled:true,value:expediente.datosForm.cliente.Personale.crediticio.donde,name:"creditoWhere",type:"text"}}></Input>
                              <label>¿Tiene algún crédito actual?</label>
                              <Input input={{disabled:true,value:expediente.datosForm.cliente.Personale.crediticio.actual,name:"creditoHave",type:"text"}}></Input>
                              <label>¿Tiene tarjeta de crédito?</label>
                              <Input input={{disabled:true,value:expediente.datosForm.cliente.Personale.crediticio.tc,name:"creditoCard",type:"text"}}></Input>
 
                            </div> 
                            <div ref={contrato} className='datosContain datosContainContrato'>
                               <label>Número de contrato</label>
                               <Input input={{disabled:true,value:clienteContrato.numeroContrato,name:"contrato",type:"text"}}></Input>
                               <label>Método de pago</label>
                               <Input input={{disabled:true,value:clienteContrato.metodopago,name:"metodoPago",type:"text"}}></Input>
                               <div className='names'>
                                    <div>
                                            <label>Precio de suscripción</label>
                                            <Input input={{disabled:true,value:clienteContrato.suscripcion,name:"precioSuscripcion",type:"text"}}></Input>
                                    </div>
                                    <div>
                                            <label>Precio de  sellado</label>
                                            <Input input={{disabled:true,value:clienteContrato.sellado,name:"precioSellado",type:"text"}}></Input>
                                    </div>
                                </div>  
                                <label>Pago otorgado</label>
                                <Input input={{disabled:true,value:clienteContrato.otorgado,name:"pago",type:"text"}}></Input>
                                <label>Monto adeudado y cancelación</label>
                                <Input input={{disabled:true,value:clienteContrato.adeudado,name:"montoAdeudado",type:"text"}}></Input>
                             </div> 
                        </div>
                          
                </StyledBigContain>
                </StyledDark>

            </>
    );

}