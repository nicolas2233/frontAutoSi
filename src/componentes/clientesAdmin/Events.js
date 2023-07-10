import React, { useState,useEffect } from 'react';
import styled from 'styled-components'
import Button from '../Button';
import {MdPersonAddAlt} from 'react-icons/md';
import DataTable from 'react-data-table-component';
import puntos from '../../img/puntos.svg'
import DataTableExtensions from 'react-data-table-component-extensions';
import 'react-data-table-component-extensions/dist/index.css';
import download from '../../img/download.png';
import print from '../../img/prints.png';
import search from '../../img/search.svg';
import { fetchUtil } from '../../util/fetchUtil';
import spinner from '../../img/spinner.gif'
import { Url } from '../../util/rutas';
import { useDispatch, useSelector } from 'react-redux/es/exports';

//STYLES

const StyledInicio=styled.section`
    width:100%;
    height:auto;
    min-height:450px;
    padding:20px;
    background-color:white;
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
    #cell-9-undefined div{
        background-color:rgba(255, 117, 40, 0.15);
        color:rgba(255, 117, 40, 1);
        border-radius:8px;
        padding:10px;
    }
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
        height:50px;
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
export default function Events(){
    let api= fetchUtil();
    const stateLogin= useSelector(stateLogin=>stateLogin)
    let url=Url('events/all')
    let url22=Url('vendors')
    let url33=Url('client/all')
    const [clientes,setClientes]=useState()
    const [contratos,setContratos]=useState()
    const [data, setData]=useState(
        [{id:'3',clienteNombre:"",clienteApellido:"",dia:"",hora:'',nota:'',tipo:"",estado:""}]
        )
    const [loading,setLoading]=useState(false)
    useEffect(()=>{
        setLoading(true)
        api.get(url22,{headers:
            {"Content-Type":"application/json",
                "x-access-token":stateLogin.login.user.token,
                "Accept":"*/*",
                "Accept-Encoding":"gzip, deflate, br"
             }
                 }).then(res2=>{
            if(!res2.message){
                setClientes(res2)
                api.get(url33,{headers:
                    {"Content-Type":"application/json",
                        "x-access-token":stateLogin.login.user.token,
                        "Accept":"*/*",
                        "Accept-Encoding":"gzip, deflate, br"
                     }
                         }).then(res3=>{
                api.get(url,{headers:
                    {"Content-Type":"application/json",
                        "x-access-token":stateLogin.login.user.token,
                        "Accept":"*",
                        "Accept-Encoding":"gzip, deflate, br"
                     }
                         }).then(res=>{
                    if(!res.message){
                       setContratos(res)
                       setLoading(false)
                       let data=[]
                       res.forEach(element=>{
                        function formatDate(date) {
                            const partes = date.split("/");
                            const dia = partes[0];
                            const mes = partes[1];
                            const año = partes[2];
                            return `${año}-${mes}-${dia}`
                          }
                        let nombre= res2.filter(el=>el.id===element.vendedor)
                        let nombre3= res3.filter(el=>el.id==element.cliente)
                        let categoryNum=nombre[0]?nombre[0].category:''
                        let category= categoryNum=='1'?'Vendedor JR':categoryNum=='2'?'Vendedor SR':categoryNum=='3'?'Jefe de equipo':categoryNum=='4'?'Gerente':categoryNum=='5'?'Administrador':''
                               let pussh={
                                   nota:element.nota,
                                   hora:element.hora,
                                   tipo:element.tipo,
                                   dia:formatDate(element.dia),
                                   estado:element.estado,
                                   clienteNombre:nombre[0]?nombre[0].name:'',
                                   clienteApellido:nombre[0]?nombre[0].lastname:'',
                                   clienteNombre2:nombre3[0]?nombre3[0].cliente.nombre:'',
                                   clienteApellido2:nombre3[0]?nombre3[0].cliente.apellido:'',
                                   vendedorCategory:category

                               }
                               data.push(pussh)
                       })
                       setData(data)
                     } 
                    })})
             }
            }) 
   

        
    },[])
   
   
    
  
   
   
  
    const columns=[
        {
            name:'N.Vendedor',
            selector:'clienteNombre',
            sortable:true,
        },
        {
            name:'A.Vendedor',
            selector:'clienteApellido',
            sortable:true
        },
        {
            name:'C.Vendedor',
            selector:'vendedorCategory',
            sortable:true,
        },
        {
            name:'Fecha',
            selector:'dia',
            sortable:true,

        },
        {
            name:'Hora',
            selector:'hora',
            sortable:true,

        },
        {
            name:'N.Cliente',
            selector:'clienteNombre2',
            sortable:true,
        },
        {
            name:'A.Cliente',
            selector:'clienteApellido2',
            sortable:true
        },
        {
            name:'Nota',
            selector:'nota',
            sortable:true,

        },
        {
            name:'Tipo',
            selector:'tipo',
            sortable:true,

        },
        {
            name:'Estado',
            selector:'estado',
            sortable:true,

        }
        
    ]
    const tableData = {
        columns,
        data,
        exportHeaders:true,
        fileName:'empleados',
        filterPlaceholder:'Buscar nombre, tipo, etc.'

      };
    

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
                      
       
            </StyledInicio>
    );

}