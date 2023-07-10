import React, { useState,useRef,useEffect } from 'react';
import styled from 'styled-components'
import Union from './../img/Union.svg'
import Button from './Button.js'
import Select from './Select.js'
import { fetchUtil } from './../util/fetchUtil';
import spinner from './../img/spinner.gif'
import Alert from './Alert';
import { useDispatch, useSelector } from 'react-redux/es/exports';
import { AiOutlineToTop } from 'react-icons/ai';
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

export default function CargarCrediticios({datos}){
    const [miembro,setMiembro]=useState("")
    const [buscador,setBuscador]=useState([])
    const [datosCrediticios,setDatosCrediticios]=useState({})
    const [creditoAgencia,setCreditoAgencia]=useState(false)
    const [guardar, setGuardar]=useState(false)
    const [loading,setLoading]=useState(false)
    const [loading2,setLoading2]=useState(false)
    const [loading3,setLoading3]=useState(false)

    const [movi,setMovi]=useState(false)
    const expedienteMove=useRef()
    const alertDark=useRef()
    const stateLogin= useSelector(stateLogin=>stateLogin)
    let api= fetchUtil();
    let url=Url('client/crediticio')
    let url2=Url('client/movi')
    let url3=Url('client')
    const exitAlert=()=>{
        setGuardar(false)
        datos.exit()
    }
    const handleClickButton=()=>{
        setGuardar(false)
        datos.exit()
    }
    const eliminarVehiculo=(param)=>{
        let objetoDelete={
            idcliente:datosCrediticios.cliente_Id,
            idmovilidad:param
        }
        setLoading3(true)
        api.del(url2,{body:objetoDelete,headers:
            {"Content-Type":"application/json",
                "x-access-token":stateLogin.login.user.token,
                "Accept":"",
                "Accept-Encoding":"gzip, deflate, br"
             }
        }).then(res=>{
            datos.recargar()
            api.get(url3,{headers:
                {"Content-Type":"application/json",
                    "x-access-token":stateLogin.login.user.token,
                    "Accept":"*/*",
                    "Accept-Encoding":"gzip, deflate, br"
                 }
                     }).then(res2=>{
                if(!res2.message){
                    let contactoGet=res2.filter(element => 
                        (element.cliente.nombre+', '+element.cliente.apellido+' ; '+element.telefono)===miembro
                      );
                     
                      setDatosCrediticios({
                          cliente_Id: contactoGet[0].cliente_Id,
                          credito: contactoGet[0].cliente.Personale.crediticio.credito,
                          donde:contactoGet[0].cliente.Personale.crediticio.donde,
                          actual: contactoGet[0].cliente.Personale.crediticio.actual,
                          tc: contactoGet[0].cliente.Personale.crediticio.tc,
                          Movilidads:contactoGet[0].cliente.Personale.crediticio.Movilidads
                      })
                 }
                })
          
            setLoading3(false)

            if(!res.message){
                
             }
            }) 
    }
    const cargarDatosSubmit=()=>{
        if(miembro!==''){
        setLoading2(true)
        let objetoPut={
                id:datosCrediticios.cliente_Id,
                marca:datosCrediticios.marca,
                tipo:datosCrediticios.tipo,
                modelo:datosCrediticios.modelo,
                año:datosCrediticios.anio,
                permuta:datosCrediticios.permuta?datosCrediticios.permuta:'NO'
        }
        api.post(url2,{body:objetoPut,headers:
            {"Content-Type":"application/json",
                "x-access-token":stateLogin.login.user.token,
                "Accept":"",
                "Accept-Encoding":"gzip, deflate, br"
             }
        }).then(res=>{
            datos.recargar()
            
            setLoading2(false)
            setMovi(false)
            api.get(url3,{headers:
                {"Content-Type":"application/json",
                    "x-access-token":stateLogin.login.user.token,
                    "Accept":"*/*",
                    "Accept-Encoding":"gzip, deflate, br"
                 }
                     }).then(res2=>{
                if(!res2.message){
                    let contactoGet=res2.filter(element => 
                        (element.cliente.nombre+', '+element.cliente.apellido+' ; '+element.telefono)===miembro
                      );
                     
                      setDatosCrediticios({
                          cliente_Id: contactoGet[0].cliente_Id,
                          credito: contactoGet[0].cliente.Personale.crediticio.credito,
                          donde:contactoGet[0].cliente.Personale.crediticio.donde,
                          actual: contactoGet[0].cliente.Personale.crediticio.actual,
                          tc: contactoGet[0].cliente.Personale.crediticio.tc,
                          Movilidads:contactoGet[0].cliente.Personale.crediticio.Movilidads
                      })
                 }
                })
            if(!res.message){
                
             }
            }) 
        }else{
                alert('Selecciona un cliente')
        }
    }
    const cargarDatosSubmit2=()=>{
        if(miembro!==''){
            setLoading(true)
            setMovi(false)
            let objetoPut={
                    id:datosCrediticios.cliente_Id,
                    credito:datosCrediticios.credito,
                    donde:datosCrediticios.donde,
                    actual:datosCrediticios.actual,
                    tc:datosCrediticios.tc,
                        }
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
        }else{
            alert('Selecciona un cliente')
         }
        
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
       
        setDatosCrediticios({
            cliente_Id: contactoGet[0].cliente_Id,
            credito: contactoGet[0].cliente.Personale.crediticio.credito,
            donde:contactoGet[0].cliente.Personale.crediticio.donde,
            actual: contactoGet[0].cliente.Personale.crediticio.actual,
            tc: contactoGet[0].cliente.Personale.crediticio.tc,
            Movilidads:contactoGet[0].cliente.Personale.crediticio.Movilidads
        })
        if( contactoGet[0].cliente.Personale.crediticio.credito==='SI'){
            setCreditoAgencia(true)
        }else{
            setCreditoAgencia(false)

        }
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
                                 <h4>Datos Crediticios</h4>
                                 <img onClick={()=>{datos.exit();setDatosCrediticios({})}} src={Union} alt="Exit"/>
                        </div>
                        <label>Cliente</label>
                        <div className='selectCargarDatos'><Select options={{text:"Buscar miembro",value:miembro,setValue:handleSelectMiembro,array:buscador}}/></div>
                       
                        <label >¿Tiene movilidad?</label>
                        {datosCrediticios.Movilidads?datosCrediticios.Movilidads.length>0?datosCrediticios.Movilidads.map(element=><><p className='autoCliente' key={element.id}>{element.tipo+': '+element.marca+', '+element.modelo+', '+' '+element.año+'; permuta: '+element.permuta}</p><p onClick={()=>eliminarVehiculo(element.id)} className='quitarVehiculo'>Quitar vehiculo</p></>):''
                        :''}
                           {
                            loading3?<div className='loading'><img  src={spinner}/></div>:''
                        } 
                        <div className='containCargarDatos '>
                         {/*   <div className='cargarDatosDisplay containCargarDatos23'>
                               <div className='Radio'>
                                  <input checked={datosCrediticios.movilidad==='SI'?true:false} onChange={(e)=>{setDatosCrediticios({...datosCrediticios,movilidad:'SI'})}} type="radio" id="siAuto" name="auto"  />
                                  <label for="siAuto">Si</label>
                           </div>
                           <div className='Radio'>
                                <input checked={datosCrediticios.movilidad==='NO'?true:false} onChange={(e)=>{setDatosCrediticios({...datosCrediticios,movilidad:'NO'})}} type="radio" id="noAuto" name="auto" />
                                <label for="noAuto">No</label>
                             </div>                                               
                         </div> */}  
                         <div onClick={()=>miembro!==''?setMovi(true):alert('selecciona un cliente')} className='cargarDatosButon'><Button text='Agregar auto'></Button></div>
                                             
                            {movi?<>
                            <div className='cargarDatosDisplay'>
                                <div>
                                    <label >Tipo</label>
                                    <select value={datosCrediticios.tipo?datosCrediticios.tipo:'Tipo de vehiculo'}  onChange={(e)=>{setDatosCrediticios({...datosCrediticios,tipo:e.target.value})}} >
                                    <option disabled selected>Tipo de vehiculo</option>
                                            <option value={'Auto'}>Auto</option>
                                            <option value={'Camioneta'}>Camioneta</option>
                                             <option value={'SUV'}>SUV</option>
                                          <option value={'VANS'}>VANS</option>
                                          <option value={'Utilitario'}>Utilitario</option>
                                          <option value={'Moto'}>Moto</option>

                                       </select>                              
                                         </div>
                                <div>
                                    <label >Marca</label>
                                    <select value={datosCrediticios.marca?datosCrediticios.marca:'Selecciona la marca'}  onChange={(e)=>{setDatosCrediticios({...datosCrediticios,marca:e.target.value})}} >
                                        <option disabled selected>Selecciona la marca</option>
                                        <option value={'Audi'}>Audi</option>
                                        <option value={'Alfa Romeo'}>Alfa Romeo</option>
                                        <option value={'Benelli'}> Benelli </option>
                                       <option value={'BMW'}>BMW</option>
                                       <option value={'Chery'}>Chery</option>
                                       <option value={'Chevrolet'}>Chevrolet</option>
                                       <option value={'Chrysler'}>Chrysler</option>
                                       <option value={'Citroen'}>Citroen</option>
                                       <option value={'Corven '}> Corven </option>
                                       <option value={'DS'}>DS</option>
                                       <option value={'Dodge'}>Dodge</option>
                                       <option value={'Ducati'}> Ducati </option>
                                       <option value={'Fiat'}>Fiat</option>
                                       <option value={'Ford'}>Ford</option>
                                       <option value={'Gilera'}> Gilera </option>
                                       <option value={'Honda'}>Honda</option>
                                       <option value={'Hyundai'}>Hyundai</option>
                                       <option value={'Husqvarna'}>Husqvarna</option>
                                       <option value={'Iveco'}>Iveco</option>
                                       <option value={'Iveco'}> Isuzu </option>
                                       <option value={'Husqvarna'}>Jawa</option>
                                       <option value={'Jeep'}>Jeep</option>
                                       <option value={'Kawasaki'}> Kawasaki </option>
                                       <option value={'Keller'}> Keller</option>
                                       <option value={'Kia'}>Kia</option>
                                       <option value={'Land Rover'}>Land Rover</option>
                                       <option value={'Mercedes Benz'}>Mercedes Benz</option>
                                       <option value={'Mini Cooper'}>Mini Cooper</option>
                                       <option value={'Mitsubishi'}>Mitsubishi</option>
                                       <option value={'Motomel'}>Motomel</option>
                                       <option value={'Nissan'}>Nissan</option>
                                       <option value={'Peugeot'}>Peugeot</option>
                                       <option value={'Renault'}>Renault</option>
                                       <option value={'Smart'}>Smart</option>
                                       <option value={'Suzuki'}>Suzuki</option>
                                       <option value={'Toyota'}>Toyota</option>
                                       <option value={'Volkswagen'}>Volkswagen</option>
                                       <option value={'Volvo'}>Volvo</option>
                                       <option value={'Yamaha'}>Yamaha</option>
                                       <option value={'Zanella'}> Zanella </option>
                                       </select>
                                </div>
                            </div>
                            <div className='cargarDatosDisplay'>
                                <div>
                                    <label htmlFor='modelo'>Modelo</label>
                                    <input value={datosCrediticios.modelo?datosCrediticios.modelo:''}  onChange={(e)=>{setDatosCrediticios({...datosCrediticios,modelo:e.target.value})}} placeholder='Escribe modelo' type='text' id='modelo'/>
                                </div>
                                <div>
                                    <label >Año</label>
                                    <select value={datosCrediticios.anio?datosCrediticios.anio:'Selecciona el año'}  onChange={(e)=>{setDatosCrediticios({...datosCrediticios,anio:e.target.value})}} >
                                    <option disabled selected>Selecciona el año</option>
                                    <option value={'1990'}>1990</option>
                                    <option value={'1991'}>1991</option>
                                    <option value={'1992'}>1992</option>
                                    <option value={'1993'}>1993</option>
                                    <option value={'1994'}>1994</option>
                                    <option value={'1995'}>1995</option>
                                    <option value={'1996'}>1996</option>
                                    <option value={'1997'}>1997</option>
                                    <option value={'1998'}>1998</option>
                                    <option value={'1999'}>1999</option>
                                    <option value={'2000'}>2000</option>
                                    <option value={'2001'}>2001</option>
                                    <option value={'2002'}>2002</option>
                                    <option value={'2003'}>2003</option>
                                    <option value={'2004'}>2004</option>
                                    <option value={'2005'}>2005</option>
                                    <option value={'2006'}>2006</option>
                                    <option value={'2007'}>2007</option>
                                    <option value={'2008'}>2008</option>
                                    <option value={'2009'}>2009</option>
                                    <option value={'2010'}>2010</option>
                                    <option value={'2011'}>2011</option>
                                    <option value={'2012'}>2012</option>
                                    <option value={'2013'}>2013</option>
                                    <option value={'2014'}>2014</option>
                                    <option value={'2015'}>2015</option>
                                    <option value={'2016'}>2016</option>
                                    <option value={'2017'}>2017</option>
                                    <option value={'2018'}>2018</option>
                                    <option value={'2019'}>2019</option>
                                    <option value={'2020'}>2020</option>
                                    <option value={'2021'}>2021</option>
                                    <option value={'2022'}>2022</option>
                                    <option value={'2023'}>2023</option>
                                    <option value={'2024'}>2024</option>






                                    
                                       </select>                                </div>
                            </div>
                            <label >¿Lo permuta?</label>
                            <div className='cargarDatosDisplay containCargarDatos23'>
                               <div className='Radio'>
                                  <input checked={datosCrediticios.permuta==='SI'?true:false}  onChange={(e)=>{setDatosCrediticios({...datosCrediticios,permuta:'SI'})}}  type="radio" id="permutasi" name="permuta" />
                                  <label for="permutasi">Si</label>
                           </div>
                           <div className='Radio'>
                                <input checked={datosCrediticios.permuta==='NO'?true:false}  onChange={(e)=>{setDatosCrediticios({...datosCrediticios,permuta:'NO'})}}  type="radio" id="permutano" name="permuta" />
                                <label for="permutano">No</label>
                             </div>                                               
                         </div> 
                         <div className='displayVehi'> 
                         <div  className='cargarDatosButon displayVehi2' onClick={()=>setMovi(false)} ><Button text='Cancelar'></Button></div>
                         <div onClick={cargarDatosSubmit} className='cargarDatosButon'><Button text='Cargar vehiculo'></Button></div>
                         </div>
                                 </> :''}  
                                 {
                            loading2?<div className='loading'><img  src={spinner}/></div>:''
                        } 
                            <label >¿Haz comprado alguna vez con crédito?</label>
                            <div className='cargarDatosDisplay containCargarDatos23'>
                               <div className='Radio'>
                                  <input checked={datosCrediticios.credito==='SI'?true:false} onChange={(e)=>{setDatosCrediticios({...datosCrediticios,credito:'SI'});setCreditoAgencia(true)}} type="radio" id="agencia" name="credito"  />
                                  <label for="agencia">Si</label>
                           </div>
                           <div className='Radio'>
                                <input checked={datosCrediticios.credito==='NO'?true:false} onChange={(e)=>{setDatosCrediticios({...datosCrediticios,credito:'NO'});setCreditoAgencia(false)}} type="radio" id="agencia2" name="credito"/>
                                <label for="agencia2">No</label>
                             </div>                                               
                         </div>   
                          {creditoAgencia?<> <label htmlFor='dondeSe'>¿Dónde adquirió el crédito?</label>
                            <input value={datosCrediticios.donde?datosCrediticios.donde:''}  onChange={(e)=>{setDatosCrediticios({...datosCrediticios,donde:e.target.value})}} placeholder='Nombre de la agencia' type='text'id='DondeSe'/>
                            </>:''}
                            <label >¿Tiene algún crédito actualmente?</label>
                            <div className='cargarDatosDisplay containCargarDatos23'>
                               <div className='Radio'>
                                  <input checked={datosCrediticios.actual==='SI'?true:false}  onChange={(e)=>{setDatosCrediticios({...datosCrediticios,actual:'SI'})}} type="radio" id="siCredito" name="credito2"  />
                                  <label for="siCredito">Si</label>
                           </div>
                           <div className='Radio'>
                                <input checked={datosCrediticios.actual==='NO'?true:false}  onChange={(e)=>{setDatosCrediticios({...datosCrediticios,actual:'NO'})}} type="radio" id="noCredito2" name="credito2" />
                                <label for="noCredito2">No</label>
                             </div>                                               
                         </div>  
                         <label >¿Tiene tarjeta de crédito?</label>
                            <div className='cargarDatosDisplay containCargarDatos23'>
                               <div className='Radio'>
                                  <input checked={datosCrediticios.tc==='SI'?true:false}  onChange={(e)=>{setDatosCrediticios({...datosCrediticios,tc:'SI'})}} type="radio" id="siTarjeta" name="tarjeta" />
                                  <label for="siTarjeta">Si</label>
                           </div>
                           <div className='Radio'>
                                <input checked={datosCrediticios.tc==='NO'?true:false}  onChange={(e)=>{setDatosCrediticios({...datosCrediticios,tc:'NO'})}} type="radio" id="noTarjeta" name="tarjeta" />
                                <label for="noTarjeta">No</label>
                             </div>                                               
                         </div>    
                        </div>
                        {
                            loading?<div className='loading'><img  src={spinner}/></div>:''
                        } 
                        <div onClick={cargarDatosSubmit2} className='cargarDatosButon'><Button text='Cargar'></Button></div>
                       
                 
                        <Alert alert={{action:guardar,type:"add",exit:exitAlert,title:"¡Datos cargados!",text:"Cada vez que cargues información sobre un cliente podes visualizarla dentro de su expediente situado en la lista de contactos. También podes ver la trayectoria de cada cliente en el historial.",button:"Volver",handleClickButton:handleClickButton}} />
 
                </StyledBigContain>
                </StyledDark>

            </>
    );

}