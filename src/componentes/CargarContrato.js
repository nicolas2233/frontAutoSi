import React, { useState,useRef,useEffect } from 'react';
import styled from 'styled-components'
import Union from './../img/Union.svg'
import Button from './Button.js'
import { fetchUtil } from './../util/fetchUtil';
import { useDispatch, useSelector } from 'react-redux/es/exports';
import { Url} from '../util/rutas'
import spinner from './../img/spinner.gif'
import Alert from './Alert';
import Select from './Select.js'
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

export default function CargarContrato({datos}){
    const [miembro,setMiembro]=useState("")
    const [buscador,setBuscador]=useState([])
    const [dataGet,setDataGet]=useState([])
    const [datosContrato,setDatosContrato]=useState({})
    const [loading,setLoading]=useState(false)
    const [guardar, setGuardar]=useState(false)

    const stateLogin= useSelector(stateLogin=>stateLogin)
    let api= fetchUtil();
    let url=Url('client/personal')
    let url33=Url('contrato')
    const expedienteMove=useRef()
    const alertDark=useRef()
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
    const exitAlert=()=>{
        setGuardar(false)
        datos.exit()
    }
    const handleClickButton=()=>{
        setGuardar(false)
        datos.exit()
    }
    //acionar
    useEffect(()=>{
        if(datos.action){
            moveUp()
        }else if(datos.action===false){
            moveDown()
        }
    },[datos.action])
    useEffect(()=>{ 
        
         api.get(url33,{headers:
        {"Content-Type":"application/json",
            "x-access-token":stateLogin.login.user.token,
            "Accept":"*",
            "Accept-Encoding":"gzip, deflate, br"
         }
             }).then(res=>{
        if(!res.message){
            setDataGet(res)
         } 
        })
        function padTo2Digits(num) {
            return num.toString().padStart(2, '0');
          }
          
          function formatDate(date) {
            console.log(">>>>>>>>>>>>>>>>>>>>>>>>>>>><<",date)
            return [
                date.getFullYear(),
                padTo2Digits(date.getMonth() + 1),
                padTo2Digits(date.getDate()),
            ].join('-');
          }
          setDatosContrato({})
          setDatosContrato({...datosContrato,dia:formatDate(new Date())})
        
          
   },[])
    const handleSelectMiembro=(e)=>{
        let valore=e.value
        setMiembro(valore)
        let contactoGet=datos.dataClientes.filter(element => 
            (element.cliente.nombre+', '+element.cliente.apellido+' ; '+element.telefono)===valore
          );
         
         /* setDatosContrato({
             cliente_Id: contactoGet[0].cliente_Id,
                cuil: contactoGet[0].cliente.Personale.cuil,
              domicilio:contactoGet[0].cliente.Personale.domicilio,
              edad: contactoGet[0].cliente.Personale.edad,
              email: contactoGet[0].cliente.Personale.email,
              ingreso:contactoGet[0].cliente.Personale.laboral.ingreso,
              situacion:contactoGet[0].cliente.Personale.laboral.situacion, 
          }) */
          setDatosContrato({...datosContrato,cliente:contactoGet[0].cliente_Id.toString()})
        } 
        useEffect(()=>{
            let names=[]
            datos.dataClientes.forEach(element => {
                names.push(element.cliente.nombre+', '+element.cliente.apellido+' ; '+element.telefono)
            });
            setBuscador(names)
        },[datos.dataClientes])

      
        
            const handleSubmitContrato=()=>{
                let numbers=/^[0-9]+$/;
          
                    let sus=parseInt(datosContrato.suscripcion)?parseInt(datosContrato.suscripcion):0
                    let sell=parseInt(datosContrato.sellado)?parseInt(datosContrato.sellado):0
                    let otor=parseInt(datosContrato.otorgado)?parseInt(datosContrato.otorgado):0
                    let deuda = sus+sell-otor
                    setDatosContrato({...datosContrato,adeudado:deuda.toString()})
                
                if(miembro===''|| miembro===false|| miembro===null||miembro===undefined){
                        alert('Seleccion un cliente')
                } else if(!numbers.test(datosContrato.numeroContrato)||!numbers.test(datosContrato.suscripcion)||!numbers.test(datosContrato.sellado)||!numbers.test(datosContrato.otorgado)){
                        alert('Verifique que los datos ingresados, en los que corresponden sean numéricos')
                }else{
                    setLoading(true)
                    let objectPost=datosContrato
                    objectPost.adeudado=deuda.toString()
                    api.post(url33,{body:objectPost,headers:
                     {"Content-Type":"application/json",
                         "x-access-token":stateLogin.login.user.token,
                         "Accept":"",
                         "Accept-Encoding":"gzip, deflate, br"
                      }
                 }).then(res=>{
                    setLoading(false)
                    setGuardar(true)
                     if(!res.message){
                            
         
                      }
                     }) 
                }
                
                
            }
       
  
    return(
            <>
                <StyledDark ref={alertDark} >
                <StyledBigContain ref={expedienteMove}>
                        <div className='contactoHeader'>
                                 <h4>Cargar Contrato</h4>
                                 <img onClick={()=>{datos.exit();setDatosContrato({})}} src={Union} alt="Exit"/>
                        </div>
                        <label>Cliente</label>
                        <div className='selectCargarDatos'><Select options={{text:"Buscar miembro",value:miembro,setValue:handleSelectMiembro,array:buscador}}/></div>
                           
                        <div className='containCargarDatos'>
                             <div className='cargarDatosDisplay'>
                                <div>
                                    <label htmlFor='cuil'>N° Contrato</label>
                                    <input value={datosContrato.numeroContrato?datosContrato.numeroContrato:''}  onChange={(e)=>{setDatosContrato({...datosContrato,numeroContrato:e.target.value})}} placeholder='58841' type='text' id='cuil'/>
                                </div>
                                <div>
                                         <label htmlFor='dia'>Día</label>
                                        <input value={datosContrato.dia} disabled placeholder='Dia' type='text'id='dia'/>
                                </div>
                            </div>
                          
                     
                          
                            <label >Método de pago</label>
                            <select value={datosContrato.metodopago?datosContrato.metodopago:'Selecciona un método de pago'}  onChange={(e)=>{setDatosContrato({...datosContrato,metodopago:e.target.value})}} >
                                    <option disabled selected>Selecciona un método de pago</option>
                                    <option value={'Efectivo'}>Efectivo</option>
                                    <option value={'Tarjeta de crédito'}>Tarjeta de crédito</option>
                                    <option value={'Tarjeta de débito'}>Tarjeta de débito</option>
                                    <option value={'Transferencia'}>Transferencia</option>
                             </select>
                             <div className='cargarDatosDisplay'>
                                <div>
                                    <label htmlFor='sus'>Precio suscripción</label>
                                    <input value={datosContrato.suscripcion?datosContrato.suscripcion:''}  onChange={(e)=>{setDatosContrato({...datosContrato,suscripcion:e.target.value})}}  placeholder='ARG' type='text' id='sus'/>
                                </div>
                                <div>
                                    <label htmlFor='sellado'>Precio de sellado</label>
                                    <input value={datosContrato.sellado?datosContrato.sellado:''}  onChange={(e)=>{setDatosContrato({...datosContrato,sellado:e.target.value})}}  placeholder='ARG' type='text' id='sellado'/>
                                </div>
                            </div>
                           
                             <label htmlFor='dondeSe'>Pago otorgado</label>
                            <input value={datosContrato.otorgado?datosContrato.otorgado:''}  onChange={(e)=>{setDatosContrato({...datosContrato,otorgado:e.target.value})}}  placeholder='ARS' type='text'id='DondeSe'/>
                            <label  htmlFor='monto'>Monto adeudado</label>
                            <input disabled  value={(parseInt(datosContrato.suscripcion)+parseInt(datosContrato.sellado)-parseInt(datosContrato.otorgado))?(parseInt(datosContrato.suscripcion)+parseInt(datosContrato.sellado)-parseInt(datosContrato.otorgado)):'0'}  onChange={(e)=>{setDatosContrato({...datosContrato,adeudado:datosContrato.suscripcion-datosContrato.otorgado})}}  placeholder='Monto adeudado' type='text' id='monto'/>
                        </div>
                        {
                            loading?<div className='loading'><img  src={spinner}/></div>:''
                        } 
                        <div onClick={handleSubmitContrato} className='cargarDatosButon'><Button text='Cargar'></Button></div>
                       
                        <Alert alert={{action:guardar,type:"add",exit:exitAlert,title:"¡Datos cargados!",text:"Cada vez que cargues información sobre un cliente podes visualizarla dentro de su expediente situado en la lista de contactos. También podes ver la trayectoria de cada cliente en el historial.",button:"Volver",handleClickButton:handleClickButton}} />

                          
                </StyledBigContain>
                </StyledDark>

            </>
    );

    }