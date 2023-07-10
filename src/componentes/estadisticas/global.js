import React, { useState,useEffect } from "react";
import styled from 'styled-components'
import { useSelector } from 'react-redux/es/exports';
import { fetchUtil } from '../../util/fetchUtil';
import spinner from '../../img/spinner.gif'
import { Url } from '../../util/rutas'
import BarChartGlobales from "./barchartGlobales";

const StyledInicio = styled.section`
    width:100%;
    height:auto;
    .loading{
        width:100%;
        display:flex;
        justify-content:center;
        algin-items:center;
        margin:0px;
        img{
            margin:0px;
        width:100px;
        height:100px;
       
        }
    }
    .puntos{
        cursor:pointer;
        margin:0px;
    }
    .nombreYapellido{
        font-family: 'Roboto';
        font-style: normal;
        font-weight: 400;
        font-size: 14px;
        color: #000000;
    }
    .itumiV{
        color: #606060;

    }
   `;
const EstadisticasGlobal = () => {
    const [loading, setLoading] = useState(true)
    const [data, setData] = useState({
        cargas: {
            data: [
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
            data: [
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
            data: [
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
    const stateLogin = useSelector(stateLogin => stateLogin)

    let api = fetchUtil();
    let urlCargas = Url('sta/cargas')
    let urlContratos = Url('sta/contratos')
    let urlEventos = Url('sta/eventos')

    const callApi = async () => {
        try {
            const headers = {
                "Content-Type": "application/json",
                "x-access-token": stateLogin.login.user.token,
                "Accept": "*/*",
                "Accept-Encoding": "gzip, deflate, br",
            };

            const [responseCargas, responseContratos, responseEventos] = await Promise.all([
                api.post(urlCargas, { body: {}, headers }),
                api.post(urlContratos, { body: {}, headers }),
                api.post(urlEventos, { body: {}, headers }),
            ]);
            setData({ cargas: responseCargas, contratos: responseContratos, eventos: responseEventos });
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

  const [opcionSeleccionada, setOpcionSeleccionada] = useState('opcion1');

  const handleOpcionSeleccionada = (event) => {
    setOpcionSeleccionada(event.target.value);
  };
      useEffect(() => {
                if(loading){
                    callApi();
                }
                
              }, []);
    return (
        <StyledInicio>
            {
                
                loading ? <div className='loading'> <img src={spinner}/> </div> :
                <>
                 <form style={{display:"flex", marginTop:"16px", marginBottom:"16px"}}>
                            <h1 style={{marginRight:"16px"}}>Opciones de visualización:</h1>
                        <div style={{marginRight:"16px"}}>
                          <input
                            type="radio"
                            id="opcion1"
                            name="opcion"
                            value="opcion1"
                            checked={opcionSeleccionada === 'opcion1'}
                            onChange={handleOpcionSeleccionada}
                          />
                         
                          <label style={{marginLeft:"6px"}} htmlFor="opcion1">agrupados</label>
                        </div>
                        <div>
                          <input
                            type="radio"
                            id="opcion2"
                            name="opcion"
                            value="opcion2"
                            checked={opcionSeleccionada === 'opcion2'}
                            onChange={handleOpcionSeleccionada}
                            />
                          <label style={{marginLeft:"6px"}} htmlFor="opcion2">individual</label>
                        </div>
                      </form>
                      {
                        data===undefined?"":
                <BarChartGlobales data={data} view={opcionSeleccionada}/>
                      }
                    </>
            }
        </StyledInicio>
    );
};

export default EstadisticasGlobal;