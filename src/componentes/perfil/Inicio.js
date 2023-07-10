import React, { useState,useEffect } from 'react';
import styled from 'styled-components'
import {BsPersonCircle} from 'react-icons/bs';
import Alert from '../Alert';
import { useDispatch, useSelector } from 'react-redux/es/exports';
import { fetchUtil } from '../../util/fetchUtil';
import spinner from '../../img/spinner.gif'
import { Url } from '../../util/rutas'

//STYLES 

const StyledInicio=styled.section`
    width:100%;
    height:auto;
    display:flex;
   @media all and (max-width:900px){
            flex-direction:column;
   }
`;
const StyledContainer=styled.div`
    width:48%;
    height:auto;
    padding:20px;
    padding-top:10px;
    padding-right:25px;
    border-right:2px solid rgba(0,0,0,0.1);
    @media all and (max-width:900px){
        width:100%;
        border:none;
        }
    h3{
        font-weight: 400;
        font-size: 32px;
    }
    p{
        font-size: 16px;
        color: #606060;
    }
    span{
        cursor:pointer;
        color:#FF7528;
        text-decoration:underline;
    }
`;
const StyledContainer2=styled.div`
    width:50%;
    height:auto;
    padding:20px;
    padding-top:10px;
    padding-left:25px;
    h3{
        font-weight: 400;
        font-size: 20px;
    }
    p{
        color: #606060;
        font-size: 14px;
        margin-bottom:15px;
    }
    @media all and (max-width:900px){
        width:100%;
        
   }
`;
const StyledCardPerson=styled.div`
   padding-left:7%;
   display:flex;
   flex-direction:column; 
   justify-content:center;
   margin-bottom:12px;
   border-radius:8px;
   box-shadow: 0px 4px 16px rgba(0, 0, 0, 0.05);
   height:130px;
   svg{
        margin-right:10px;
        margin-left:0px;
        width:75px;
        height:75px;
        color:${({color})=>color};  
   }
   
   .cardPerson{
                display:flex;
                margin:0px;
   }
   .contact{
            margin:0px;
            margin-bottom:10px;
            font-size: 18px;
            color:black;
   }
   .countPerson{
                margin-left:15px;
                display:flex;
                flex-direction:column;
                justify-content:center;
                transition:all 0.5s ease;
   }
   .number{
                color:${({color})=>color};
                 margin:0;
                 font-size: 30px;
                 margin-bottom:3px;
   }
   .nextNumber{
                margin:0;
                font-size: 14px;
                color:#9F9F9F;
   }
   span{
         color:${({color})=>color};
   }
`;



export default function Inicio(){
  const [loading, setLoading] = useState(true)
    const [data, setData] = useState({
        cargas: {
            datos: [
                {
                    anio: "",
                    mes: "",
                    total: 0,
                    dias: [""],
                    contratos: [0],
                },
            ],
        },
        contratos: {
            datos: [
                {
                    anio: "",
                    mes: "",
                    total: 0,
                    dias: [""],
                    contratos: [0],
                },
            ],
        },
        eventos: {
            datos: [
                {
                    anio: "",
                    mes: "",
                    total: 0,
                    dias: [""],
                    contratos: [0],
                },
            ],
        },
    });
    const stateLogin= useSelector(stateLogin=>stateLogin)
    let api = fetchUtil();
    let urlCargas=Url('sta/cargas')
    let urlContratos=Url('sta/contratos')
    let urlEventos=Url('sta/eventos')

    const callApi = async () => {
        try {
          const headers = {
            "Content-Type": "application/json",
            "x-access-token": stateLogin.login.user.token,
            Accept: "*/*",
            "Accept-Encoding": "gzip, deflate, br",
          };
      console.log(stateLogin.login.user.vendors.id)
          const [responseCargas, responseContratos, responseEventos] = await Promise.all([
            api.post(urlCargas, { body: { id: stateLogin.login.user.vendors.id }, headers }),
            api.post(urlContratos, { body: { id: stateLogin.login.user.vendors.id  }, headers }),
            api.post(urlEventos, { body: { id: stateLogin.login.user.vendors.id  }, headers }),
          ])
          if (responseCargas.data.length === 0 && responseContratos.data.length === 0 && responseEventos.data.length === 0) {
               setData({ cargas: responseCargas, contratos: responseContratos, eventos: responseEventos });
              } else {
              if (responseCargas.data.length === 0) {
                const dataArray = createEmptyDataArray(responseCargas, responseContratos, responseEventos, 'cargas');
                responseCargas.data.push(...dataArray);
              }
              
              if (responseContratos.data.length === 0) {
                const dataArray = createEmptyDataArray(responseCargas, responseContratos, responseEventos, 'contratos');
                responseContratos.data.push(...dataArray);
              }
              
              if (responseEventos.data.length === 0) {
                const dataArray = createEmptyDataArray(responseCargas, responseContratos, responseEventos, 'eventos');
                responseEventos.data.push(...dataArray);
              }
              setData({ cargas: responseCargas, contratos: responseContratos, eventos: responseEventos });
             }
        } catch (error) {
          console.error(error);
        } finally {
          contador()
          setLoading(false)

        }
      }
      function createEmptyDataArray(responseCargas, responseContratos, responseEventos, missingDataType) {
        const dataArray = [];
      
        if (missingDataType === 'cargas') {
          const dataToCopyFrom = responseContratos.data.length !== 0 ? responseContratos : responseEventos;
          for (let i = 0; i < dataToCopyFrom.data.length; i++) {
            dataArray.push({
              anio: dataToCopyFrom.data[i].anio,
              mes: dataToCopyFrom.data[i].mes,
              total: 0,
              dias: [],
              contratos: []
            });
          }
        }
      
        if (missingDataType === 'contratos') {
          const dataToCopyFrom = responseCargas.data.length !== 0 ? responseCargas : responseEventos;
          for (let i = 0; i < dataToCopyFrom.data.length; i++) {
            dataArray.push({
              anio: dataToCopyFrom.data[i].anio,
              mes: dataToCopyFrom.data[i].mes,
              total: 0,
              dias: [],
              contratos: []
            });
          }
        }
      
        if (missingDataType === 'eventos') {
          const dataToCopyFrom = responseCargas.data.length !== 0 ? responseCargas : responseContratos;
          for (let i = 0; i < dataToCopyFrom.data.length; i++) {
            dataArray.push({
              anio: dataToCopyFrom.data[i].anio,
              mes: dataToCopyFrom.data[i].mes,
              total: 0,
              dias: [],
              contratos: []
            });
          }
        }
      
        return dataArray;
      }
      const [eventos,setEventos]=useState()
      const [contratos,setContratos]=useState()
      const [cargas,setCargas]=useState()
      const contador=async()=>{
        const a = await data.cargas.data[data.cargas.data.length-1].total
        const b = await data.contratos.data[data.contratos.data.length-1].total
        const c = await data.eventos.data[data.eventos.data.length-1].total 
        setCargas(a)
        setContratos(b)
        setEventos(c)
      }

    const [agregado,setAgregado]=useState(false)
    
       const setAgrega =()=>{
        setAgregado(true)}
       const exit =()=>{
            setAgregado(false)
        }
        useEffect(() => {
          if(loading){
            callApi()
          }
          if(!loading){
            contador()
          }
       }, [loading]);
        
    return(
            <>
            <StyledInicio>
                                <StyledContainer>
                                <h3 onClick={setAgrega}>Hola {stateLogin.login.user.vendors.name}</h3>
                                <br/>
                                <p >Bienvenido a AutoSi, en esta nueva versión vas a tener tu propio listado de contactos, vas a poder programar entrevistas, así como también acceder a los formularios de cada cliente y concretar la venta mediante la carga del contrato.</p>
                                <br/>
                                 </StyledContainer>
                                <StyledContainer2>
                                <h3>Tus datos</h3>
                                <br/>
                                <p>Acá podés observar tu trayectoria como vendedor de AutoSi. Podés ingresar una fecha anterior para ver como estabas desde que comenzaste hasta la fecha.</p>
                                <StyledCardPerson color="#4CAF50"  >
                                        <p className="contact">Contactos<span></span></p>
                                        <div className="cardPerson">
                                        <BsPersonCircle/>
                                                <div className="countPerson">
                                                    <p className="number">{cargas}</p>
                                                    <p className='nextNumber'>Objetivo mensual: 36</p>
                                                </div>
                                        </div>
                                </StyledCardPerson>
                                <StyledCardPerson color="#FFC107"  >
                                        <p className="contact">Entrevistas <span></span></p>
                                        <div className="cardPerson">
                                                <BsPersonCircle/>
                                                <div className="countPerson">
                                                
                                               <p className="number">{eventos}</p>
  
                                                   
                                                    <p className='nextNumber'>Objetivo mensual: 180</p>
                                                </div>
                                        </div>
                                </StyledCardPerson>
                                <StyledCardPerson color="#F02849"  >
                                        <p className="contact">Ventas <span></span></p>
                                        <div className="cardPerson">
                                                <BsPersonCircle/>
                                                <div className="countPerson">
                                                    <p className="number">{contratos}</p>
                                                    <p className='nextNumber'>Objetivo mensual: 12</p>
                                                </div>
                                        </div>
                                        
                                </StyledCardPerson>

                                </StyledContainer2>
                                
            </StyledInicio>
          <Alert alert={{action:agregado,type:"add",exit:exit,title:"¡Agregado!",text:"Ahora podés ver este cliente en tu lista de contactos y realizar acciones como: llamarlo, cargar datos y editarlo en caso de ser necesario.",button:"Volver a contactarnos"}} />
            </>
    );

}