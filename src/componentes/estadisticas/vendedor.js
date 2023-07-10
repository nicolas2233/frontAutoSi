import React, { useState,useEffect } from "react";
import styled from 'styled-components'
import SearchBar from "./search";
import { useSelector } from 'react-redux/es/exports';
import { fetchUtil } from '../../util/fetchUtil';
import spinner from '../../img/spinner.gif'
import { Url } from '../../util/rutas'
import BarChartVendedores from"./barchartVendedores"
import BarChartGlobales from "./barchartGlobales";
import BarChartEventos from "./BarChartEventos";

const StyledInicio=styled.section`
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
 
const EstadisticaVendedor = () => {
    const [vendors, setVendors]=useState()
    const [carga, setCarga]=useState(false)
    const [loading, setLoading] = useState(true)
    const [prueba, setPrueba] = useState([])
    const [data, setData] = useState({
        cargas: {
            name:'',
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

    const [responseCargas, responseContratos, responseEventos] = await Promise.all([
      api.post(urlCargas, { body: { id: stateLogin.login.user.vendors.id || null }, headers }),
      api.post(urlContratos, { body: { id: stateLogin.login.user.vendors.id || null }, headers }),
      api.post(urlEventos, { body: { id: stateLogin.login.user.vendors.id || null }, headers }),
    ]);
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
        setData({ cargas: responseCargas, contratos: responseContratos, eventos: responseEventos});
       }
  } catch (error) {
    console.error(error);
  } finally {
    setCarga(false)
    setLoading(false)
  }
}
const [opcionSeleccionada, setOpcionSeleccionada] = useState('opcion1');

const handleOpcionSeleccionada = (event) => {
    setOpcionSeleccionada(event.target.value);
  };
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
    useEffect(() => {
           callApi()
      }, []);

    return (
        <StyledInicio>
            {
               loading ? <div className='loading'> <img src={spinner} /> </div> :
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
              <BarChartGlobales data={data} view={opcionSeleccionada}/>
                  </>
            } 
        </StyledInicio>
    );
  };
  
  export default EstadisticaVendedor;