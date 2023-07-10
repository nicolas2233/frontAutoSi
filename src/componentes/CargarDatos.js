import React, { useState,useRef,useEffect } from 'react';
import styled from 'styled-components'
import Union from './../img/Union.svg'
import Button from './Button.js'
import Select from './Select.js'
import { useDispatch, useSelector } from 'react-redux/es/exports';
import { fetchUtil } from './../util/fetchUtil';
import Alert from './Alert';
import spinner from './../img/spinner.gif'
import { Url} from '../util/rutas'
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
        

    @media all and (max-width:700px){
        width:100%;
    }
 
`;

export default function CargarDatos({datos}){
    const [miembro,setMiembro]=useState("")
    const [buscador,setBuscador]=useState([])
    const [datosPersonales,setDatosPersonales]=useState({})
    const [guardar, setGuardar]=useState(false)
    const [loading,setLoading]=useState(false)
    const expedienteMove=useRef()
    const alertDark=useRef()
    const stateLogin= useSelector(stateLogin=>stateLogin)
    let api= fetchUtil();
    let url=Url('client/personal')
    let url2=Url('client/laboral')
    const exitAlert=()=>{
        setGuardar(false)
        datos.exit()
    }
    const handleClickButton=()=>{
        setGuardar(false)
        datos.exit()
    }
    const cargarDatosSubmit=()=>{
        setLoading(true)
        let objetoPut={
            id:datosPersonales.cliente_Id,
            cuil: datosPersonales.cuil,
          /*   direccion: "Dirección" */
            domicilio: datosPersonales.domicilio,
            edad: datosPersonales.edad,
            email:datosPersonales.email

        }
        let objetoPutLaboral={
            id:datosPersonales.cliente_Id,
            ingreso: datosPersonales.ingreso,
            situacion: datosPersonales.situacion,
        }
           api.put(url2,{body:objetoPutLaboral,headers:
                    {"Content-Type":"application/json",
                        "x-access-token":stateLogin.login.user.token,
                        "Accept":"",
                        "Accept-Encoding":"gzip, deflate, br"
                     }
                }).then(res=>{
                    if(!res.message){
                     }
                    }) 
                    api.put(url,{body:objetoPut,headers:
                        {"Content-Type":"application/json",
                            "x-access-token":stateLogin.login.user.token,
                            "Accept":"",
                            "Accept-Encoding":"gzip, deflate, br"
                         }
                    }).then(res=>{
                        datos.recargar()
                        setGuardar(true)
                        setLoading(false)
                        if(!res.message){
                            
                         }
                        }) 
    }
    // deslizar hacia arriba
    const moveUp = ()=>{
        alertDark.current.style.display="flex"
        setTimeout(function(){
            expedienteMove.current.style.marginBottom="0%"
            
        },400)
    }
    // deslizar hacia abajo
    const moveDown=()=>{
        setTimeout(function(){
        expedienteMove.current.style.marginBottom="-100%"
    },0)
    setTimeout(function(){
        alertDark.current.style.display="none"
    },800)
    }

    //acionar
    useEffect(()=>{
        if(datos.action){
            moveUp()
        }else if(datos.action===false){
            moveDown()
        }
    },[datos.action])
   
    const handleSelectMiembro=(e)=>{
        let valore=e.value
        setMiembro(valore)
        let contactoGet=datos.dataClientes.filter(element => 
          (element.cliente.nombre+', '+element.cliente.apellido+' ; '+element.telefono)===valore
        );
        setDatosPersonales({
            cliente_Id: contactoGet[0].cliente_Id,
            cuil: contactoGet[0].cliente.Personale.cuil,
            domicilio:contactoGet[0].cliente.Personale.domicilio,
            edad: contactoGet[0].cliente.Personale.edad,
            email: contactoGet[0].cliente.Personale.email,
            ingreso:contactoGet[0].cliente.Personale.laboral.ingreso,
            situacion:contactoGet[0].cliente.Personale.laboral.situacion,
        }) 
        } 
        useEffect(()=>{
            let names=[]
            datos.dataClientes.forEach(element => {
                names.push(element.cliente.nombre+', '+element.cliente.apellido+' ; '+element.telefono)
            });
            setBuscador(names)
        },[datos.dataClientes])
    return(
            <>
                <StyledDark ref={alertDark} >
                <StyledBigContain ref={expedienteMove}>
                        <div className='contactoHeader'>
                                 <h4>Datos Personales</h4>
                                 <img onClick={()=>{datos.exit()}} src={Union} alt="Exit"/>
                        </div>
                        <label>Cliente</label>
                        <div className='selectCargarDatos'><Select options={{text:"Buscar miembro",value:miembro,setValue:handleSelectMiembro,array:buscador}}/></div>
                           
                        <div className='containCargarDatos'>
                            
                           {/*  <label htmlFor='dondeSe'>¿Dónde se realizo la entrevista?</label>
                            <input value={datosPersonales.direccion?datosPersonales.direccion:''}  onChange={(e)=>{setDatosPersonales({...datosPersonales,direccion:e.target.value})}} placeholder='Dirección' type='text'id='DondeSe'/> */}
                            <label  htmlFor='email'>Email</label>
                            <input value={datosPersonales.email?datosPersonales.email:''}  onChange={(e)=>{setDatosPersonales({...datosPersonales,email:e.target.value})}}  placeholder='ejemplo@gmail.com' type='text' id='email'/>
                            <label htmlFor='domicilio'>Domicilio del cliente</label>
                            <input value={datosPersonales.domicilio?datosPersonales.domicilio:''}  onChange={(e)=>{setDatosPersonales({...datosPersonales,domicilio:e.target.value})}} placeholder='Calle y número, departamento, provincia' type='text' id='domicilio'/>
                            <div className='cargarDatosDisplay'>
                                <div>
                                    <label htmlFor='cuil'>DNI</label>
                                    <input value={datosPersonales.cuil?datosPersonales.cuil:''}  onChange={(e)=>{setDatosPersonales({...datosPersonales,cuil:e.target.value})}} placeholder='39881678' type='text' id='cuil'/>
                                </div>
                                <div>
                                    <label htmlFor='nacimiento'>Fecha de Nacimiento</label>
                                    <input value={datosPersonales.edad?datosPersonales.edad:''}  onChange={(e)=>{setDatosPersonales({...datosPersonales,edad:e.target.value})}} type='date' id='nacimiento'/>
                                </div>
                            </div>
                            <label >Relación laboral</label>
                            <select value={datosPersonales.situacion?datosPersonales.situacion:'Selecciona relación'}  onChange={(e)=>{setDatosPersonales({...datosPersonales,situacion:e.target.value})}} >
                                    <option disabled selected>Selecciona relación</option>
                                    <option value={'Relación de dependencia'}>Relación de dependencia</option>
                                    <option value={'Monotributista'}>Monotributista</option>
                                    <option value={'Informal'}>Informal</option>
                                    <option value={'Autónomo'}>Autónomo</option>
                             </select>
                             <label >¿Cuanto gana?</label>
                            <select value={datosPersonales.ingreso?datosPersonales.ingreso:'Selecciona rango'}  onChange={(e)=>{setDatosPersonales({...datosPersonales,ingreso:e.target.value})}} >
                                    <option disabled selected>Selecciona rango</option>
                                    <option value={'50-70'}>50-70k</option>
                                    <option value={'70-100'}>70-100k</option>
                                    <option value={'100-140'}>100-140k</option>
                                    <option value={'140-190'}>140-190k</option>
                                    <option value={'190-250'}>190-250k</option>
                                    <option value={'250'}>Mayor 250k</option>
                             </select>
                        </div>
                        {
                            loading?<div className='loading'><img  src={spinner}/></div>:''
                        } 
                        <div onClick={cargarDatosSubmit} className='cargarDatosButon'><Button text='Cargar'></Button></div>
                       
                 
                        <Alert alert={{action:guardar,type:"add",exit:exitAlert,title:"¡Datos cargados!",text:"Cada vez que cargues información sobre un cliente podes visualizarla dentro de su expediente situado en la lista de contactos. También podes ver la trayectoria de cada cliente en el historial.",button:"Volver",handleClickButton:handleClickButton}} />
  
                </StyledBigContain>
                </StyledDark>

            </>
    );

}