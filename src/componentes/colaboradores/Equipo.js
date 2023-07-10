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
import FormEquipo from './FormEquipo';
import { fetchUtil } from '../../util/fetchUtil';
import spinner from '../../img/spinner.gif'
import {Url} from '../../util/rutas'
import { useDispatch, useSelector } from 'react-redux/es/exports';


//STYLES 

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
   width:185px;
   margin:0px;
   height:54px;
   position:absolute;
   right:200px;
   @media all and (min-width:850px){
    @media all and (max-width:900px){
    right:150px;
    }}
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
    left:20px;
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
export default function Equipo(){
    let api= fetchUtil();
    let url= Url('group')
    let url2= Url('vendors')
    const [data, setDataList]=useState(
        [{
            id: null,
            name: "No hay equipos",
            lider: "-",
            createdAt: "",
            updatedAt: "",
            vendors: []
            }]
        )
    const [loading,setLoading]=useState(true)
    const [vendedors,setVendedors]=useState([])
    const [add,setAdd]=useState(false)
    const stateLogin= useSelector(stateLogin=>stateLogin)

    useEffect(()=>{
        api.get(url,{headers:{"Content-Type":"application/json",
        "x-access-token":stateLogin.login.user.token,
        "Accept":"*/*",
        "Accept-Encoding":"gzip, deflate, br"
     }}).then(res=>{
            if(res){                
                if(res.length){
                    setLoading(false)
                     setDataList(res)
                }else{
                    setLoading(false)
                    console.log(res)
                }
            }
        })
        api.get(url2,{headers:{"Content-Type":"application/json",
        "x-access-token":stateLogin.login.user.token,
        "Accept":"*/*",
        "Accept-Encoding":"gzip, deflate, br"
     }}).then(res=>{
            if(res){                
                if(res.length){
                     setVendedors(res)
                }else{
                    console.log(res)
                }
            }
        })
    },[])
    const recargarLista=()=>{
        api.get(url,{headers:{"Content-Type":"application/json",
        "x-access-token":stateLogin.login.user.token,
        "Accept":"*/*",
        "Accept-Encoding":"gzip, deflate, br"
     }}).then(res=>{
            if(res){                
                if(res.length){
                    setDataList(res)
                }else{
                    setDataList( [{
                        id: null,
                        name: "No hay equipos",
                        lider: "-",
                        createdAt: "",
                        updatedAt: "",
                        vendors: []
                        }])
                }
            }
        })
    }
    const [seeForm,setSeeFormE]=useState(false)
   const [editEmpleado,setEditEmpleado]=useState(false)
   const [datosGrupo, setDatosGrupo]=useState({
    
    
        id: "",
        name: "",
        lider: "",
        createdAt: "",
        updatedAt: "",
        vendors: []
        
        
   })
    
    const handleClickPuntos=(id)=>{
        let getId='#colaborador'+id
        let colaborador=document.querySelector(getId)
        colaborador.style.display='flex';
        setTimeout(()=>{colaborador.style.display='none';},2000)
    }
    const handleClickEdit=(paramId)=>{
        setAdd(false)
        if(paramId){
            let emp=data.filter(obj=>obj.id===paramId)
            setDatosGrupo({
                id: emp[0].id,
                name: emp[0].name,
                lider: emp[0].lider,
                vendors:  emp[0].vendors  
            }
            )
           
    
            setEditEmpleado(true)
            setSeeFormE(true)
        }
      

        }
        const handleClickEditAdd=(paramId)=>{
            if(paramId){
                let emp=data.filter(obj=>obj.id===paramId)
                setDatosGrupo({
                    id: emp[0].id,
                    name: emp[0].name,
                    lider: emp[0].lider,
                    vendors:  emp[0].vendors  
                }
                )
                setAdd(true)
                setEditEmpleado(false)
                setSeeFormE(true)
            }
         
    
            }
   
    const columns=[
        {
            name:'Nombre de equipo',
            selector:'name',
            sortable:true,
        },
        {
            name:'Jefe de equipo',
            selector:'lider',
            sortable:true,
            cell:row=><>{vendedors.filter(e=>e.id==row.lider)[0]?vendedors.filter(e=>e.id==row.lider)[0].name+", "+vendedors.filter(e=>e.id==row.lider)[0].lastname:""}</>

        },
        {
            name:'Fecha de creación',
            selector:'createdAt',
            sortable:true,
            cell:row=><>{row.createdAt.substring(0,10)}</>
        },
        {
            name:'Cantidad',
            selector:'vendors',
            sortable:true,
            cell:row=><>{row.vendors?parseInt(row.vendors.length):''}</>
        },
        {
            name:'Acción',
            cell:row=><><div className='empleado' id={'colaborador'+row.id}><div onClick={()=>{handleClickEdit(row.id)}} >Editar</div><div onClick={()=>{handleClickEditAdd(row.id)}} >Administrar miembros</div></div><img className='puntos' onClick={()=>{handleClickPuntos(row.id)}} src={puntos}/></>,
            sortable:true,
           
        }
    ]
    const tableData = {
        columns,
        data,
        exportHeaders:true,
        fileName:'empleados',
        filterPlaceholder:'Buscar nombre, mail, etc.'

      };
      const setSeeForm=()=>{
        setAdd(false)
        setEditEmpleado(false)
        setSeeFormE(true) 

    }
    const exitForm=()=>{
        setSeeFormE(false) 
        }

    return(
            <StyledInicio>
                      
                                
                                <StyledContainButton onClick={setSeeForm} ><MdPersonAddAlt/><Button   text="Crear equipo"></Button></StyledContainButton>
                     
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
                        <FormEquipo formEmpleado={{add:add,action:seeForm,exit:exitForm,edit:editEmpleado,grupo:datosGrupo,vendedors:vendedors,recargar:recargarLista}}></FormEquipo>
       
            </StyledInicio>
    );

}