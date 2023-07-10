import React, { useState,useEffect } from "react";
import styled from 'styled-components'
import SearchBar from "./search";
import { useSelector } from 'react-redux/es/exports';
import { fetchUtil } from '../../util/fetchUtil';
import spinner from '../../img/spinner.gif'
import { Url } from '../../util/rutas'
import BarChartVendedores from"./barchartVendedores"

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
 
const EstadisticasVendedores = () => {
    const [vendors, setVendors]=useState()
    const [carga, setCarga]=useState(false)
    const [loading, setLoading] = useState(true)
    const [prueba, setPrueba] = useState([])
    const [data, setData] = useState([{
        cargas: {
            name:'',
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
    }]);
    const stateLogin = useSelector(stateLogin => stateLogin)
    let api = fetchUtil();
    let urlCargas=Url('sta/cargas')
    let urlContratos=Url('sta/contratos')
    let urlEventos=Url('sta/eventos')


 const callApi = async (entrada, name) => {
  try {
    const headers = {
      "Content-Type": "application/json",
      "x-access-token": stateLogin.login.user.token,
      Accept: "*/*",
      "Accept-Encoding": "gzip, deflate, br",
    };

    const [responseCargas, responseContratos, responseEventos] = await Promise.all([
      api.post(urlCargas, { body: { id: entrada || null }, headers }),
      api.post(urlContratos, { body: { id: entrada || null }, headers }),
      api.post(urlEventos, { body: { id: entrada || null }, headers }),
    ]);
    if (responseCargas.data.length === 0 && responseContratos.data.length === 0 && responseEventos.data.length === 0) {
         setData([{ cargas: responseCargas, contratos: responseContratos, eventos: responseEventos, name:name }]);
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
        setData((prevState) => [...prevState,{ cargas: responseCargas, contratos: responseContratos, eventos: responseEventos, name:name }]);
       }
  } catch (error) {
    console.error(error);
  } finally {
    setCarga(false)
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

const handleVendor=(value)=>{
       setVendors(value)
}
const resetStatus=()=>{
  setData([]);
}
    useEffect(() => {
      if(vendors!==undefined){
        resetStatus()
           if(vendors.length!==0){
            vendors.map((i)=>(callApi(i.id , i.name)))
           }
          }
      }, [vendors]);

    return (
        <StyledInicio>
            <SearchBar addVendor={handleVendor}></SearchBar>
            {
               loading ? <div className='loading'> <img src={spinner} /> </div> : <BarChartVendedores data={data}/>
            } 
        </StyledInicio>
    );
  };
  
  export default EstadisticasVendedores;
























{/* <SearchBar addVendor={handleVendor}></SearchBar>
        
<p className='m-1'>Gráfico de Cargas</p>   
<div> <h2>Grupos</h2>
 <select defaultValue={"nada"} id="select-grupo" onChange={handlePersonChange}>
    <option value="nada">grupos</option>
    {group.map((item) => (
      <option key={item.name} value={JSON.stringify(item)}>
        {item.name}
      </option>
    ))}
  </select> 
</div>
   {
    loading?<div className='loading'><img  src={spinner}/></div>:<BarChartCargas data={data.cargas} name={name}/>
}
{
    miembro.length>0?<div>{miembro.map((item) => (
        <h3>{item.nombre}</h3>
      ))}</div>:""
}           
{
}
      <hr className='m-3 mb-2'/>
      <div>
          <p className='m-2'>Gráfico de Contratos</p>
          {
    loading?<div className='loading'><img  src={spinner}/></div>:<BarChartContratos data={data.contratos}/>
    }
      </div>
      <hr className='m-3 mb-2'/>
      <div>
          <p className='m-2'>Gráfico de Eventos</p>
          {
    loading?<div className='loading'><img  src={spinner}/></div>:<BarChartEventos data={data.eventos}/>
    }
              </div> */}



            //   useEffect(() => {
            //     setLoading(true);
              
            //     if (!estado) {
            //       callApiGroup();
            //     }
            //     if(estado2===true){
            //      callApi(ids);
            //     }
                
            //   }, [ids]);


            // const callApi = async (entrada) => {
            //     try {
            //       const headers = {
            //         "Content-Type": "application/json",
            //         "x-access-token": stateLogin.login.user.token,
            //         Accept: "*/*",
            //         "Accept-Encoding": "gzip, deflate, br",
            //       };
              
            //       const [responseCargas, responseContratos, responseEventos] = await Promise.all([
            //         api.post(urlCargas, { body: { id: entrada || null }, headers }),
            //         api.post(urlContratos, { body: { id: null }, headers }),
            //         api.post(urlEventos, { body: { id: entrada || null }, headers }),
            //       ]);
              
            //       setData({ cargas: responseCargas, contratos: responseContratos, eventos: responseEventos });
            //       setEstado2(true)
            //     } catch (error) {
            //       console.error(error);
            //     } finally {
            //       setLoading(false);
            //     }
            //   }

            // const callApiGroup = async () =>{
            //     const responseGrupos = await api.get(urlGrupos,
            //      {headers:{"Content-Type":"application/json",
            //      "x-access-token":stateLogin.login.user.token,
            //      "Accept":"*/*",
            //      "Accept-Encoding":"gzip, deflate, br"
            //   }})
            //      setEstado(true)
            //      setGroup(responseGrupos)
            //  }
         


            // const handlePersonChange = (event) => {
       
            //     if(event.target.value==="nada"){
            //         const vendors=[]
            //         setMiembro(vendors)
            //         setIds(undefined)
            //         setName({nombre:"grupos"})
            //     }else{
            //     const grupo = JSON.parse(event.target.value)
            //    setName({nombre:grupo.name})
            //    const vendors=[]
            //     for (let i = 0; i < grupo.vendors.length; i++) {
            //         if(grupo.vendors[i].id===Number(grupo.lider)){
            //             vendors[i]= {
            //                 id:grupo.vendors[i].id,
            //                 nombre:grupo.vendors[i].name+" "+grupo.vendors[i].lastname+" - "+category(grupo.vendors[i].category)
            //             };
            //         }else{
            //         vendors[i]= {
            //             id:grupo.vendors[i].id,
            //             nombre:grupo.vendors[i].name+" "+grupo.vendors[i].lastname+" - "+category(grupo.vendors[i].category) 
            //         };
            //         }
            //                      }
                  
            //      const arrIds=vendors.map((item)=>Number(item.id))
            //      setIds(arrIds)
            //      setEstado2(true)
            //      setMiembro(vendors)
            //                     }
            //   };
              
        

//             const [estado,setEstado]=useState(false)
//     const [estado2,setEstado2]=useState(true)

//     const [miembro,setMiembro]=useState([{id:0,nombre:""}])
//     const [vendedors,setVendedors]=useState()
//     const [loading,setLoading]=useState(true)
//     const [ids,setIds]=useState()
//     const [selectedItems, setSelectedItems] = useState([])
//     const [name,setName]=useState({nombre:""})
//     const [group, setGroup]=useState(
//         [{
//             id: null,
//             name: "No hay equipos",
//             lider: "-",
//             createdAt: "",
//             updatedAt: "",
//             vendors: []
//             }]
//         )
//     const [data, setData] = useState({
//         cargas: {
//           datos: [
//             {
//               anio: "",
//               mes: "",
//               total: 0,
//               dias: [""],
//               contratos: [0],
//             },
//           ],
//         },
//         contratos: {
//           datos: [
//             {
//               anio: "",
//               mes: "",
//               total: 0,
//               dias: [""],
//               contratos: [0],
//             },
//           ],
//         },
//         eventos: {
//           datos: [
//             {
//               anio: "",
//               mes: "",
//               total: 0,
//               dias: [""],
//               contratos: [0],
//             },
//           ],
//         },
//       });
//       const stateLogin= useSelector(stateLogin=>stateLogin)

//  let api= fetchUtil();
//     let urlCargas=Url('sta/cargas')
//     let urlvenCargas=Url('sta/venCargas')

//     let urlContratos=Url('sta/contratos')
//     let urlEventos=Url('sta/eventos')
//     let urlGrupos= Url('group')
//     let urlVendors= Url('vendors') 
//  const category=(category)=>{
//      if(category==="1"){
//         return "JR"
//      }
//      if(category==="2"){
//         return "SR"
//      }
//      if(category==="3"){
//         return "Jefe de equipo"
//      }
//      if(category==="4"){
//         return "gerente"
//      }
//      if(category==="5"){
//         return "admin"
//      }
//  }
