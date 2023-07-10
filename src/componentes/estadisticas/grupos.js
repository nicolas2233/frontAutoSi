import React,{ useState,useEffect }  from "react";
import styled from 'styled-components'
import { useSelector } from 'react-redux/es/exports';
import { fetchUtil } from '../../util/fetchUtil';
import spinner from '../../img/spinner.gif'
import { Url } from '../../util/rutas'
import BarChartCargas from "./barchartCargas";
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

 
const EstadisticasGrupos = () => {
    let api = fetchUtil();
    let urlGrupos= Url('group')
    const [miembro,setMiembro]=useState([{id:0,nombre:""}])
    const [miembro2,setMiembro2]=useState([{id:0,nombre:""}])
    const [ids,setIds]=useState()
    const [ids2,setIds2]=useState()
    const [name,setName]=useState({nombre:""})
    const [name2,setName2]=useState({nombre:""})
    const category=(category)=>{
             if(category==="1"){
                return "JR"
             }
             if(category==="2"){
                return "SR"
             }
             if(category==="3"){
                return "Jefe de equipo"
             }
             if(category==="4"){
                return "gerente"
             }
             if(category==="5"){
                return "admin"
             }
         }
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
    const [data2, setData2] = useState({
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
    const [carga, setCarga]=useState(false)
    const [carga2, setCarga2]=useState(false)
    const [group, setGroup]=useState(
                [{
                    id: null,
                    name: "No hay equipos",
                    lider: "-",
                    createdAt: "",
                    updatedAt: "",
                    vendors: []
                    }]
                )
    
    const stateLogin = useSelector(stateLogin => stateLogin)

    const callApiGroup = async () =>{
                const responseGrupos = await api.get(urlGrupos,
                 {headers:{"Content-Type":"application/json",
                 "x-access-token":stateLogin.login.user.token,
                 "Accept":"*/*",
                 "Accept-Encoding":"gzip, deflate, br"
              }})
                 setGroup(responseGrupos)
                 setLoading(false);
        }     
 const handlePersonChange = (event) => {
                if(event.target.value==="nada"){
                    const vendors=[]
                    setMiembro(vendors)
                    setIds(undefined)
                    setName({nombre:"grupos"})
                }else{
                const grupo = JSON.parse(event.target.value)
               setName({nombre:grupo.name})
               const vendors=[]
                for (let i = 0; i < grupo.vendors.length; i++) {
                    if(grupo.vendors[i].id===Number(grupo.lider)){
                        vendors[i]= {
                            id:grupo.vendors[i].id,
                            nombre:grupo.vendors[i].name+" "+grupo.vendors[i].lastname+" - "+category(grupo.vendors[i].category)
                        };
                    }else{
                    vendors[i]= {
                        id:grupo.vendors[i].id,
                        nombre:grupo.vendors[i].name+" "+grupo.vendors[i].lastname+" - "+category(grupo.vendors[i].category) 
                    };
                    }
                                 } 
                 const arrIds=vendors.map((item)=>Number(item.id))
                 setIds(arrIds)
                 setMiembro(vendors)
                 setCarga(true)
                                }
              };
              const handlePersonChange2 = (event) => {
                if(event.target.value==="nada"){
                    const vendors=[]
                    setMiembro2(vendors)
                    setIds2(undefined)
                    setName2({nombre:"grupos"})
                }else{
                const grupo = JSON.parse(event.target.value)
               setName2({nombre:grupo.name})
               const vendors=[]
                for (let i = 0; i < grupo.vendors.length; i++) {
                    if(grupo.vendors[i].id===Number(grupo.lider)){
                        vendors[i]= {
                            id:grupo.vendors[i].id,
                            nombre:grupo.vendors[i].name+" "+grupo.vendors[i].lastname+" - "+category(grupo.vendors[i].category)
                        };
                    }else{
                    vendors[i]= {
                        id:grupo.vendors[i].id,
                        nombre:grupo.vendors[i].name+" "+grupo.vendors[i].lastname+" - "+category(grupo.vendors[i].category) 
                    };
                    }
                                 } 
                 const arrIds=vendors.map((item)=>Number(item.id))
                 setIds2(arrIds)
                 setMiembro2(vendors)
                 setCarga2(true)
                                }
              };
                  let urlCargas=Url('sta/cargas')
                  let urlContratos=Url('sta/contratos')
                  let urlEventos=Url('sta/eventos')
               const callApi = async (entrada) => {
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
              
                  setData({ cargas: responseCargas, contratos: responseContratos, eventos: responseEventos });
                } catch (error) {
                  console.error(error);
                } finally {
                    setCarga(false);
                }
              }
              const callApi2 = async (entrada) => {
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
              
                  setData2({ cargas: responseCargas, contratos: responseContratos, eventos: responseEventos });
                } catch (error) {
                  console.error(error);
                } finally {
                    setCarga(false);
                }
              }
              const [opcionSeleccionada, setOpcionSeleccionada] = useState('opcion1');

              const handleOpcionSeleccionada = (event) => {
                setOpcionSeleccionada(event.target.value);
              };

        useEffect(() => {
            if(loading){
                callApiGroup();
            }
            if(carga){
                callApi(ids)
            }
            if(carga2){
                callApi2(ids2)
            }  
          }, [ids,ids2]);


    return (
        <StyledInicio>
            <div style={{display:"flex", justifyContent:"space-between"}}>
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
            <div>
                        <h2>Seleccione para comparar</h2>
                        <select defaultValue={"nada"} id="select-grupo" onChange={handlePersonChange2}>
                    <option value="nada">grupos</option>
                    {group.map((item) => (
                        <option key={item.name} value={JSON.stringify(item)}>
                            {item.name}
                        </option>
                    ))}
                </select>
                    </div> 
                    </div>
            {ids !== undefined && !carga ?
                <>
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
                        <BarChartCargas data={data} view={opcionSeleccionada} nombre={name.nombre} data2={data2} nombre2={name2.nombre}/>
                         <div style={{display:"flex", flexDirection:"row", justifyContent:"space-evenly", marginTop:"18px"}}>
                            {miembro2.length>1?
                            <>
                            <div>
                             <h1>{name.nombre}</h1>
                            {
                                miembro.map((item)=>(
                                    <div>
                                        <h2>NOMBRE: <label>{item.nombre}</label></h2>
                                    </div>
                                ))
                            }
                            </div>
                            <div >
                             <h1>{name2.nombre}</h1>
                            {
                                miembro2.map((item)=>(
                                    <div>
                                    
                                        <h2>NOMBRE: <label>{item.nombre}</label></h2>
                                    </div>
                                ))
                            }
                            </div>
                        </> :
                        <>
                        <div style={{marginTop:"18px", marginLeft:"18px"}}>

                        {
                            miembro.map((item)=>(
                                <div>
                                    <h2>NOMBRE: <label>{item.nombre}</label></h2>
                                </div>
                            ))
                        }
                        </div>
                        </>
                        }
                            {/* {
                                miembro.map((item)=>(
                                    <div>
                                        <h2>ID: <label>{item.id}</label></h2>
                                        <h2>NOMBRE: <label>{item.nombre}</label></h2>
                                    </div>
                                ))
                            }
                            {
                                miembro2.map((item)=>(
                                    <div>
                                        <h2>ID: <label>{item.id}</label></h2>
                                        <h2>NOMBRE: <label>{item.nombre}</label></h2>
                                    </div>
                                ))
                            } */}
                         </div>
                    
                    </>
                    }
 </>
            :""}
        </StyledInicio>
    );
};

export default EstadisticasGrupos;





















// const StyledBigContain=styled.div`
//         width:450px;
//         height:auto;
//         background-color:white;
//         border-radius:14px;
//         overflow:auto;
//         overflow-x:hidden;
//         bottom:0px;
//         max-height:95vh;
//         padding:10px 20px;
//         transition:all 0.4s ease;
//         z-index:123333123213212;
        
        
//     @media all and (max-width:700px){
//         width:100%;
  
// input{
//     margin-top:4px;
//     margin-bottom:15px;
// }
// .datosHeader{
//     margin-bottom:15px;
// }

// .containButtons{
//     display:flex;
//     justify-content:space-between;
//     align-items:center;
//     margin-top:20px;
//     @media all and (max-width:900px){
//         display:grid;
//         width:100%;
//         grid-template-columns:1fr 1fr;
//         gap:10px; 
//         grid-template-rows: auto auto;
//         >div{
//             grid-column:1/3;
           
           
//             div{
//                 width:96%;
                
//                 justify-self: center;
//                 height:40px;
//                 svg{
//                     top:10px;
//                 }
//                 button{
//                     font-size:14px;}
//             }
//         }
    
//     }
//     div{
//         display:flex;
//         justify-content:center;
//         align-items:center;
//         margin:0px;
       
//         div{
//             margin-right:10px;
//         }
//     }
//     svg{
//         margin:0px;
       
//     }
    
// }
// }
// .contactoHeader{
//     display:flex;
//     justify-content:space-between;
//     align-items:center;
//     padding-bottom:10px;
//     margin-bottom:20px;
//     border-bottom: 1px solid rgba(0, 0, 0, 0.03);
//     h4{
//         color: #FF7528;
//         font-weight: 400;
//         font-size: 32px;
//         margin:0px;
//     }
//     img{
//         margin:0px;
//         cursor:pointer;
//     }
// }

// .datosContain{
//     padding:10px;
//     font-weight: 400;
//     font-size: 16px;
//     color: #606060;
//     p{
//         margin-bottom:5px;
//     }
//     input{
//         height:34px;
//         background:#F7F7F7;
//         margin-bottom:10px;
//     }
//     .Select{
//          height:40px;
//           margin-top:4px;
//           margin-bottom:15px;
//     }
// }

// .buttonsEdit{
//             display:flex;
//             justify-content:space-between;
//             align-items:center;
//             div{
//                 margin:0px;
//                 width:140px;
//                 height:54px;
                
//             }
//         .eliminarEmpleado button{
//              background:#F02849;
//              &:hover{
//                 opacity:0.8;
//              }
//         }
//         }
//         .containButtons{
//             margin-top:10px;
//         }

//         .classLider{
            
//             border-radius:10px;
//             width:100%;
//             padding:2px;
//             strong{
//                 color:black;
//             }
//             margin-bottom:15px;
//         }
//         .quitar{
//             color:red;
//             cursor:pointer;
//         }
//         .errorForm{
//             color:red;
//             padding:10px 0px;
//         }
//         .loading{
//             img{
//                 width:35px;
//                 height:35px;
//             }
          
            
//         }
//        .addcss{
//         margin-bottom:7px;
//        }
//        .classLider{
//         font-size:14px;
//        }
// `;
// const StyledContainer=styled.main`
    
//     overflow-x: hidden;
//     padding:20px;
//     background-color:white;
//     width:calc(100% - 42px);
//     margin:0px;
//     height:100%;
//     box-shadow: 0px 4px 16px rgba(0, 0, 0, 0.05);
//     border-radius: 0px 14px 0px 0px;
//     @media all and (max-width:700px){
//         width:100%;
//         border-radius: 14px 14px 0px 0px;
//     }
//     .classLider{
            
//         border-radius:10px;
//         width:100%;
//         padding:2px;
//         strong{
//             color:black;
//         }
//         margin-bottom:15px;
//     }
//     .quitar{
//         color:red;
//         cursor:pointer;
//     }
//     .datosContain{
//         padding:10px;
//         font-weight: 400;
//         font-size: 16px;
//         color: #606060;
//         p{
//             margin-bottom:5px;
//         }
//         input{
//             height:34px;
//             background:#F7F7F7;
//             margin-bottom:10px;
//         }

//         .prueba{
//         border: 1px solid rgba(0,0,0,0.2);
//         border-radius: 8px;
//         height: 54px;
//         background: #F7F7F7;
//         width: 328px;
//         display:flex;
//         align-items:center;
//         justify-content:space-around;
//         flex-direction:row-reverse;
//         color: rgb(96, 96, 96);
//       }
// `;
// const StyledContainer2=styled.div`
// background-color:rgba(0,0,0,0.4);
// backdrop-filter:blur(2px);
//    position:fixed;
//    width:100vw;
//    height:100vh;
//    display:none;
// `;
// const StyledContainMenu=styled.div`
//   display:flex;
//   margin:0px;
//   @media all and (max-width:700px){
//     margin-left:10px;

// }
// `;
// const StyledInicio=styled.section`
//     width:100%;
//     height:auto;
    
//     .puntos{
//         cursor:pointer;
//         margin:0px;
//     }
//     .rdt_TableBody{
//         width:100%;
//         margin:0px;
//         color: #606060;
//         div{
//             margin:0px;
//         }
//     }
//     .rdt_TableHeadRow{
//         width:100%;
//         margin:0px;
//         background: #F7F7F7;
//         font-family: 'Roboto';
//         font-style: normal;
//         font-weight: 500;
//         font-size: 14px;
//         color: #000000;
//         div{
//             margin:0px;
//         }
//     }
//     .nombreYapellido{
//         font-family: 'Roboto';
//         font-style: normal;
//         font-weight: 400;
//         font-size: 14px;
//         color: #000000;
//     }
//     .itumiV{
//         color: #606060;

//     }
    
//     .empleado{
//         display:none;
//         flex-direction:column;
//         justify-content:center;
//         position:absolute;
//         z-index:123123123;
//         left:-20%;
//         top:-70%;
//         height:70px;
//         background-color:#F7F7F7;
//         box-shadow: 0px 4px 16px rgba(0, 0, 0, 0.1);
//         @media all and (max-width:1100px){
//             height:90px;
//         }
//         @media all and (max-width:750px){
//             height:90px;
//             width:120%;
//             left:-10%;
//         }
//         div{
//             padding:5px 20px;
//             font-family: 'Roboto';
//             font-style: normal;
//             font-weight: 500;
//             font-size: 14px;
//             cursor:pointer;
//         }
//     }
//     .data-table-extensions{
//         height:80px;
//         align-items:center;
//         padding-left:0px;
//         @media all and (max-width:400px){
//             padding-right:0px;
//         }
//     }
//     .data-table-extensions > .data-table-extensions-action > button.download{
//         background-image:url(${download});
//         background-size:contain;
//         margin-top:10px;
//     } 
//     .data-table-extensions > .data-table-extensions-action > button.print{
//         background-image:url(${print});
//         background-size:contain;
//         background-position: left 0px;
//         margin-top:10px;
//     }
//     .data-table-extensions > .data-table-extensions-action > .dropdown button{
//         color:#FF7528;
//     }
//     .data-table-extensions > .data-table-extensions-action > button.download:hover::after{
//         color:#FF7528;
//     }
//     .data-table-extensions > .data-table-extensions-action > button.print:hover::after{
//         color:#FF7528;

//     }
//     .data-table-extensions > .data-table-extensions-filter{
//         border: 1px solid rgba(0,0,0,0.2);
//         border-radius: 8px;
//         height: 54px;
//         background: #F7F7F7;
//         width: 328px;
//         display:flex;
//         align-items:center;
//         justify-content:space-around;
//         flex-direction:row-reverse;
//         color: rgb(96, 96, 96);
//         @media all and (max-width:850px){
//             width:240px;
//         }
//         @media all and (max-width:450px){
//             width:200px;
//         }
//         @media all and (max-width:365px){
//             width:170px;
//         }
        
//         &:hover{
//             border: 2px solid #FD7022;
//         }
//         &:focus{
//             outline:#FD7022;
//             border: 2px solid #FD7022;
//         }
//         input{
//             padding-left:5px;
//             border-bottom:0;
//             color: rgb(96, 96, 96);
            
//         }
//         label{
//             margin-right:15px;
//             background-image:url(${search});
//             background-size:contain;
//         }
//     }
//    `;
 


// const StyledInput=styled.div`
// border: 1px solid rgba(0,0,0,0.2);
// border-radius: 8px;
// height: 54px;
// background: #F7F7F7;
// width: 328px;
// display:flex;
// align-items:center;
// justify-content:space-around;
// flex-direction:row-reverse;
// color: rgb(96, 96, 96);
// @media all and (max-width:850px){
//     width:240px;
// }
// @media all and (max-width:450px){
//     width:200px;
// }
// @media all and (max-width:365px){
//     width:170px;
// }

// &:hover{
//     border: 2px solid #FD7022;
// }
// &:focus{
//     outline:#FD7022;
//     border: 2px solid #FD7022;
// }
// input{
//     padding-left:5px;
//     border-bottom:0;
//     color: rgb(96, 96, 96);
    
// }
// label{
//     margin-right:15px;
//     background-image:url(${search});
//     background-size:contain;
// }
// `