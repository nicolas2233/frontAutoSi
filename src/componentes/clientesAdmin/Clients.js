import React, { useState, useEffect} from 'react';
import styled from 'styled-components'
import Expediente from '../Expediente';
import Button from '../Button';
import {MdPersonAddAlt} from 'react-icons/md';
import DataTable from 'react-data-table-component';
import puntos from '../../img/puntos.svg'
import DataTableExtensions from 'react-data-table-component-extensions';
import 'react-data-table-component-extensions/dist/index.css';
import download from '../../img/download.png';
import print from '../../img/prints.png';
import search from '../../img/search.svg';
import { useDispatch, useSelector } from 'react-redux/es/exports';
import { fetchUtil } from '../../util/fetchUtil';
import { Url} from '../../util/rutas'
import spinner from '../../img/spinner.gif'

//STYLES 

const StyledInicio=styled.section`
    width:100%;
    height:auto;
    
    .puntos{
        cursor:pointer;
        margin:0px;
    }
    .rdt_TableBody{
        width:100%;
        margin:0px;
        color: #606060;
        div{
            margin:0px;
        }
    }
    .rdt_TableHeadRow{
        width:100%;
        margin:0px;
        background: #F7F7F7;
        font-family: 'Roboto';
        font-style: normal;
        font-weight: 500;
        font-size: 14px;
        color: #000000;
        div{
            margin:0px;
        }
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
    
    .empleado{
        display:none;
        flex-direction:column;
        justify-content:center;
        position:absolute;
        z-index:123123123;
        left:-20%;
        top:-70%;
        height:70px;
        background-color:#F7F7F7;
        box-shadow: 0px 4px 16px rgba(0, 0, 0, 0.1);
        @media all and (max-width:1100px){
            height:90px;
        }
        @media all and (max-width:750px){
            height:90px;
            width:120%;
            left:-10%;
        }
        div{
            padding:5px 20px;
            font-family: 'Roboto';
            font-style: normal;
            font-weight: 500;
            font-size: 14px;
            cursor:pointer;
        }
    }
    .data-table-extensions{
        height:80px;
        align-items:center;
        padding-left:0px;
        @media all and (max-width:400px){
            padding-right:0px;
        }
    }
    .data-table-extensions > .data-table-extensions-action > button.download{
        background-image:url(${download});
        background-size:contain;
        margin-top:10px;
    } 
    .data-table-extensions > .data-table-extensions-action > button.print{
        background-image:url(${print});
        background-size:contain;
        background-position: left 0px;
        margin-top:10px;
    }
    .data-table-extensions > .data-table-extensions-action > .dropdown button{
        color:#FF7528;
    }
    .data-table-extensions > .data-table-extensions-action > button.download:hover::after{
        color:#FF7528;
    }
    .data-table-extensions > .data-table-extensions-action > button.print:hover::after{
        color:#FF7528;

    }
    .data-table-extensions > .data-table-extensions-filter{
        border: 1px solid rgba(0,0,0,0.2);
        border-radius: 8px;
        height: 54px;
        background: #F7F7F7;
        width: 328px;
        display:flex;
        align-items:center;
        justify-content:space-around;
        flex-direction:row-reverse;
        color: rgb(96, 96, 96);
        @media all and (max-width:850px){
            width:240px;
        }
        @media all and (max-width:450px){
            width:200px;
        }
        @media all and (max-width:365px){
            width:170px;
        }
        
        &:hover{
            border: 2px solid #FD7022;
        }
        &:focus{
            outline:#FD7022;
            border: 2px solid #FD7022;
        }
        input{
            padding-left:5px;
            border-bottom:0;
            color: rgb(96, 96, 96);
            
        }
        label{
            margin-right:15px;
            background-image:url(${search});
            background-size:contain;
        }
    }
   `;
 

const StyledContainButton=styled.div`
   width:145px;
   margin:0px;
   height:54px;
   position:absolute;
   right:200px;
   @media all and (max-width:650px){
    right:120px;
    }
    @media all and (max-width:400px){
        right:95px;

    }
   margin-top:10px;
   svg{
    position:absolute;
    width:28px;
    z-index:1;
    color:white;
    height:23px;
    top:14px;
    left:25px;
   }
   button{
    padding-left:20px;
   }
   @media all and (max-width:700px){
   
        button{
        display:none;
    }
    
    background:#FF7528;
    width:48px;
    heigth:48px;
    @media all and (max-width:365px){
        width:40px;
        heigth:40px;
    }
    
    display:flex;
    justify-content:center;
    align-items:center;
    border-radius:8px;
    cursor:pointer;
    svg{
      position:static;
    }
   }
   
`;
export default function Clients(){
    const stateLogin= useSelector(stateLogin=>stateLogin)
    let api= fetchUtil();
    let url=Url('client/all')
    let url2=Url('vendors')
    const [seeExpediente,setSeeExpedient]=useState(false)
    const [loading,setLoading]=useState(true)


    const [clientes,setClientes]=useState()
    const [contratos,setContratos]=useState()
    const [data,setData]=useState([])

    const [clientu,setCliente]=useState(  {
        id: 1,
        conoci: "Gmail",
        horario: "Tarde",
        telefono: "02612175626",
        vendedor: 34,
        createdAt: "2022-10-26T21:05:22.040Z",
        updatedAt: "2022-10-26T21:05:22.040Z",
        cliente_Id: 1,
        cliente: {
            id: 1,
            nombre: "Romeo",
            apellido: "Gómez",
            telefono: "02612175626",
            createdAt: "2022-10-26T21:05:22.035Z",
            updatedAt: "2022-10-26T21:05:22.043Z",
            personales_Id: 1,
            carga_Id: 1,
            event_Id: null,
            Personale: {
                id: 1,
                email: null,
                domicilio: null,
                cuil: null,
                edad: null,
                createdAt: "2022-10-26T21:05:22.029Z",
                updatedAt: "2022-10-26T21:05:22.044Z",
                laboral_Id: 1,
                crediticio_Id: 1,
                cliente_Id: 1,
                crediticio: {
                    id: 1,
                    permuta: null,
                    credito: null,
                    donde: null,
                    actual: null,
                    tc: null,
                    createdAt: "2022-10-26T21:05:21.982Z",
                    updatedAt: "2022-10-26T21:05:22.044Z",
                    personales_Id: 1,
                    Movilidads: []
                },
                laboral: {
                    id: 1,
                    situacion: null,
                    ingreso: null,
                    createdAt: "2022-10-26T21:05:22.025Z",
                    updatedAt: "2022-10-26T21:05:22.044Z",
                    personales_Id: 1
                }
            }
        }
    });
    
   useEffect(()=>{
    api.get(url,{headers:
        {"Content-Type":"application/json",
            "x-access-token":stateLogin.login.user.token,
            "Accept":"*/*",
            "Accept-Encoding":"gzip, deflate, br"
         }
             }).then(res2=>{
        if(!res2.message){
            setClientes(res2)
            api.get(url2,{headers:
                {"Content-Type":"application/json",
                    "x-access-token":stateLogin.login.user.token,
                    "Accept":"*",
                    "Accept-Encoding":"gzip, deflate, br"
                 }
                     }).then(res=>{
                if(!res.message){
                   setContratos(res)
                    setLoading(false)
                   let data2=[]
                   res2.forEach(element=>{
                    let nombre= res.filter(el=>el.id==element.vendedor)
                    let categoryNum=nombre[0]?nombre[0].category:''
                    let category= categoryNum=='1'?'Vendedor JR':categoryNum=='2'?'Vendedor SR':categoryNum=='3'?'Jefe de equipo':categoryNum=='4'?'Gerente':categoryNum=='5'?'Administrador':''
                           let pussh={
                               id:element?element.id:'',
                               nombre:element.cliente?element.cliente.nombre:'',
                               apellido:element.cliente?element.cliente.apellido:'',
                               fecha:element.cliente?element.cliente.createdAt.substring(0, 10):'',
                               vendedorNombre:nombre[0]?nombre[0].name:'',
                               vendedorApellido:nombre[0]?nombre[0].lastname:'',
                               vendedorCategory:category,
                           }
                           data2.push(pussh)
                   })
                   setData(data2)
                 } 
                })
         }
        }) 


    
},[])
    
    const handleClickPuntos=(id)=>{
        let getId='#colaborador'+id
        let colaborador=document.querySelector(getId)
        colaborador.style.display='flex';
        setTimeout(()=>{colaborador.style.display='none';},2000)
    }
   
    const handleClickEdit=(paramId)=>{
        
        let cliente=clientes.filter(el=>el.id==paramId)
        setCliente(cliente[0])
        setSeeExpedient(true)
        }
   
    const columns=[
        {
            name:'Nombre Cliente',
            selector:'nombre',
            sortable:true,
           
        },
        {
            name:'Apellido Cliente',
            selector:'apellido',
            sortable:true
        },
        {
            name:'Creación',
            selector:'fecha',
            sortable:true
        },
        {
            name:'Nombre Vendedor',
            selector:'vendedorNombre',
            sortable:true,
          
        },{
            name:'Apellido Vendedor',
            selector:'vendedorApellido',
            sortable:true,
          
        },{
            name:'Rol Vendedor',
            selector:'vendedorCategory',
            sortable:true,
          
        },
        {
            name:'Acción',
            cell:row=><><div className='empleado' id={'colaborador'+row.id}><div onClick={()=>{handleClickEdit(row.id)}} >Ver formulario</div><div >Transferir</div></div><img className='puntos' onClick={()=>{handleClickPuntos(row.id)}} src={puntos}/></>,
            sortable:true,
           
        }
    ]
    const tableData = {
        columns,
        data,
        exportHeaders:true,
        fileName:'empleados',
        filterPlaceholder:'Buscar nombre, fecha, etc.'

      };
  
        const exitExpediente=()=>{
            setSeeExpedient(false)
            }

    return(
            <StyledInicio>
                      
                                
                     
                      <DataTableExtensions
                       {...tableData}
                       
                        >
                      <DataTable
                       
                        pagination
                        paginationComponentOptions={{
                            rowsPerPageText:'Filas por Página',
                            rangeSeparatorText:'de',
                            selectAllRowsItem:true,
                            selectAllRowsItemText:'Todos'
                        }}
                        noHeader
                        defaultSortField="id"
                        defaultSortAsc={false}
                        highlightOnHover
                      
                        >
                        
                        </DataTable> 
                        </DataTableExtensions> 
                        {
                            loading?<div className='loading'><img  src={spinner}/></div>:''
                        }  
                <Expediente expediente={{action:seeExpediente,exit:exitExpediente,datosForm:clientu}}></Expediente>
            </StyledInicio>
    );

}