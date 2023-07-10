import React, { useEffect, useState } from 'react';
import styled from 'styled-components'
import logoImage from './../img/logo.svg'
import team from './../img/team.svg'
import { VscHome } from 'react-icons/vsc';
import { MdOutlineContacts } from 'react-icons/md';
import { MdOutlineBarChart } from 'react-icons/md';
import { BiCommentDetail } from 'react-icons/bi';
import {CgBell } from 'react-icons/cg';
import {BsArrowUpShort,} from 'react-icons/bs';
import {BsPersonCircle} from 'react-icons/bs';
import {BsPeople} from 'react-icons/bs';
import {FiFolder} from 'react-icons/fi';
import { Url } from './../util/rutas';
import {BsPerson} from 'react-icons/bs';


import { fetchUtil } from './../util/fetchUtil';

import { useDispatch, useSelector } from 'react-redux/es/exports';




//STYLES 

const StyledContainer=styled.div`
    width:${({width})=>width};
    min-height:${({ height})=> height || "100vh"};
    background-color:${({ backgroundColor})=> backgroundColor || "white"};
    position:relative;
  
    left:0px;
    margin:0px;
    top:0px;
    transition:all 0.5s ease;
    box-shadow: 0px 4px 16px rgba(0, 0, 0, 0.05);
    margin-right:20px;
    @media all and (max-width:800px){
        position:absolute;
        z-index:280;
       

    }
`;
const StyledContainer2=styled.div`
    width:100vw;
    height:100vh;
    background-color:rgba(0,0,0,0.4);
    backdrop-filter:blur(2px);
    position:fixed;
    left:0vw;
    margin:0px;
    top:0px;
    transition:all 0.5s ease;
    box-shadow: 0px 4px 16px rgba(0, 0, 0, 0.05);
    margin-right:20px;
    display:none;
    z-index:265;

    @media all and (max-width:800px){
        display:${({displayBlack})=>displayBlack};
    }
`;
const StyledDivDown=styled.div`
    width:${({widthDown})=>widthDown};
    height:100%;
    background-color: #EB6114;
    opacity:${({opacity})=>opacity || "0.9"};
    border-radius: 0px 0px 50% 0px;
    cursor:pointer;
    color:white;
    display:flex;
    justify-content:center;
    align-items:center;
    svg{
        width:100%;
        height:75%;
        font-weight:bold;
        transform:rotate(${({rotate})=>rotate});
    }
`;
const StyledDivLogo=styled.div`
    width:77%;
    height:100%;
    background-color:#FF7528;
    display:${({display})=>display};
    align-items:center;
    img{
        height:60%;
        margin-left:15%;
        @media all and (max-width:1200px){
            width:70%;
        }
        @media all and (max-width:900px){
            width:60%;
        }

    }
`;
const StyledDivTop=styled.div`
    display:flex;
    height:9vh;
`;
const StyledMyPanel=styled.div`
    margin-top:5vh;
    padding-left:10%;
    padding-right:10%;
    display:${({displayPanel})=>displayPanel};
    flex-direction:column;
    align-items:center;

`;
const StyledTitle=styled.div`
    font-weight: 500;
    font-size: 24px;
    margin-bottom:22px;
`;
const StyledTitle2=styled.div`
    font-weight: 500;
    font-size: 24px;
    margin:0px;
   
`;
const StyledDivSubtitule=styled.div`
   padding-left:7%;
   display:flex;
   justify-content:start; 
   align-items:center;
   color:#D3D3D3;
    cursor:pointer;
   margin-bottom:16px;
   svg{
        margin-right:10px;
        margin-left:0px;
        width:20px;
        height:20px;
        color:${({color})=>color || "#D3D3D3"}
        
    }
    p{
        color:${({color})=>color || "#D3D3D3"}
    }
    &:hover{
        p{
        color:#FF7528;
        }
        svg{
            color:#FF7528;
        }
    }
    
  
  
`;
const StyledDivSubtitule2=styled.div`
   padding-left:7%;
   display:flex;
   justify-content:start; 
   align-items:center;
   svg{
        margin-right:10px;
        margin-left:0px;
        width:30px;
        height:30px;
        color:${({color})=>color}; 
    
          
   }
   margin-bottom:12px;
   border-radius:8px;
   box-shadow: 0px 4px 16px rgba(0, 0, 0, 0.05);
   height:50px;
`;
const StyledMyTeam=styled.div`
    margin-top:5vh;
    padding-left:10%;
    padding-right:10%;
    display:${({displayPanel})=>displayPanel};
    flex-direction:column;
    align-items:center;
    transition:all 1s ease;
`;
const StyledPP=styled.p`
    margin:0;
    font-weight: 500;
    font-size: 14px;
   
`;
const StyledPP2=styled.p`
    margin:0;
    font-size: 14px;
    margin-bottom:3px;
   
`;
const StyledPP3=styled.p`
    margin:0;
    font-size: 12px;
    color:#9F9F9F;
   
`;
const StyledImgTeam =styled.img`
   margin:0px;
   margin-right:10px;
   
`;
const StyledDivTitle =styled.div`
    margin-bottom:22px;
   display:flex;
   transition:all 0.5s ease;
`;
const StyledContainPerson =styled.div`
   margin-left:5px;
   display:flex;
   flex-direction:column;
   transition:all 0.5s ease;
`;



export default function Vendedor({handleClickVendedor,whereHere}){

    const [isDesktop, setIsDesktop]= useState(window.innerWidth);
    const [width,setWidth]= useState("17vw");
    const [backgroundColor,setBackgroundColor]= useState("white");
    const [opacity,setOpacity]= useState("0.9");
    const stateLogin= useSelector(stateLogin=>stateLogin)
    const [height,setHeight]= useState("100vh");
    const [widthDown,setWidthDown]= useState("23%");
    const [display,setDisplay]= useState("flex");
    const [displayPanel,setDisplayPanel]= useState("block");
    const [displayBlack,setDisplayBlack]= useState("none");
    const [right,setRight]= useState(true);
    const [rotate,setRotate]= useState("270deg");
    let api= fetchUtil();
    let url=Url('events/eventTime')
    let url22=Url('client')
    const [disabled,setDisabled]=useState(false)
    const [clientes,setClientes]=useState()
    const [data, setData]=useState([])
    const [contratos,setContratos]=useState()

    useEffect(()=>{
        api.get(url22,{headers:
            {"Content-Type":"application/json",
                "x-access-token":stateLogin.login.user.token,
                "Accept":"*/*",
                "Accept-Encoding":"gzip, deflate, br"
             }
                 }).then(res2=>{
            if(!res2.message){
                setClientes(res2)
                api.get(url,{headers:
                    {"Content-Type":"application/json",
                        "x-access-token":stateLogin.login.user.token,
                        "Accept":"*",
                        "Accept-Encoding":"gzip, deflate, br"
                     }
                         }).then(res=>{
                    if(!res.message){
                       setContratos(res)
                       let data=[]
                       res.forEach(element=>{
                        let nombre= res2.filter(el=>el.id==element.cliente)
                        let pussh={
                            nota:element.nota,
                            hora:element.hora,
                            tipo:element.tipo,
                            dia:element.dia,
                            estado:element.estado,
                            clienteNombre:nombre[0]?nombre[0].cliente.nombre:'',
                            clienteApellido:nombre[0]?nombre[0].cliente.apellido:'',
                        }
                               data.push(pussh)
                       })
                       setData(data)
                     } 
                    })
             }
            }) 
   

        
    },[])
    const handleClickVendedorPerfil=()=>{
       handleClickVendedor("perfil")
    }
    const handleClickVendedorColaboradores=()=>{
        handleClickVendedor("colaboradores")
     }
    const handleClickVendedorClientes=()=>{
        handleClickVendedor("clientes")
    }
    const handleClickVendedorClientes2=()=>{
        handleClickVendedor("clientes2")
    }
    const handleClickVendedorEstadistica=()=>{
        handleClickVendedor("estadistica")
    }
    const handleClickVendedorNotificacione=()=>{
        handleClickVendedor("notificacion")
    }
    const handleClickVendedorAyuda=()=>{
        handleClickVendedor("ayuda")
    }
    const handleClickVendedorFormulario=()=>{
        handleClickVendedor("formulario")
    }
    useEffect(()=>{
        
       if(isDesktop>800){
        setWidth("17vw")
       }else{
       
        setWidth("58vw")
       }
    },[])
   
    useEffect(()=>{
        
       
        const moveWidht=()=>{
            setIsDesktop(window.innerWidth)
           
        }    
            window.addEventListener("resize",moveWidht) 
    })
    const handleClickWidth=()=>{

            if(isDesktop>800){
                if(width==="17vw"){
                    setRotate("90deg")
                    setWidthDown("100%")
                    setWidth("5vw")
                    setDisplay("none")
                    setRight(false)
                    setDisplayPanel("flex")
                    setDisplayBlack("none")
                    setHeight("100vh")
                    setBackgroundColor("white")
                    setOpacity("0.9")
                }else{
                    setRotate("270deg")
                    setWidth("17vw")
                    setWidthDown("23%")
                    setDisplay("flex")
                    setRight(true)
                    setDisplayPanel("block")
                    setDisplayBlack("block")
                    setHeight("100vh")
                    setBackgroundColor("white")
                    setOpacity("0.9")
                }
            }else{
                if(width==="58vw"){
                    setRotate("90deg")
                    setWidthDown("100%")
                    setWidth("15vw")
                    setDisplay("none")
                    setDisplayBlack("none")
                    setRight(false)
                    setHeight("auto")
                    setDisplayPanel("none")
                    setBackgroundColor("rgba(0,0,0,0)")
                    setOpacity("1")
                }else{
                    setRotate("270deg")
                    setWidth("58vw")
                    setWidthDown("23%")
                    setDisplay("flex")
                    setRight(true)
                    setDisplayPanel("block")
                    setDisplayBlack("block")
                    setHeight("100vh")
                    setBackgroundColor("white")
                    setOpacity("0.9")
                }
                
            }
           

    }
    const [stateMem,setStateMem]=useState([])
    const [idLider,setIdLider]=useState(null)
    const [lider,setLider]=useState([])
    useEffect(()=>{
         if(stateLogin.group.group.members){
             setIdLider(parseInt(stateLogin.group.group.members.lider))
            let data=stateLogin.group.group.members.vendors.filter((e)=>e.id!==idLider)
            setStateMem(data)
            let data2=stateLogin.group.group.members.vendors.filter((e)=>e.id===idLider)
            setLider(data2) 
        }else{
            setLider([])
            setIdLider(null)
            setStateMem([])
        }
        
    },[stateLogin])
    return(<>
            <StyledContainer backgroundColor={backgroundColor} height={height} width={width}>
                                <StyledDivTop>
                                                  <StyledDivLogo display={display}>
                                                    <img src={logoImage}/>
                                                  </StyledDivLogo>
                                                  <StyledDivDown opacity={opacity} rotate={rotate} widthDown={widthDown} onClick={handleClickWidth}><BsArrowUpShort /></StyledDivDown>
                                </StyledDivTop>
                                <StyledMyPanel displayPanel={displayPanel}>
                                                    {right?<StyledTitle>Mi panel</StyledTitle>:""}
                                                    {stateLogin.login.user.vendors.category!=="6" && stateLogin.login.user.vendors.category!=="7" ?<StyledDivSubtitule color={whereHere==="perfil"?"#FF7528":"#D3D3D3"} onClick={handleClickVendedorPerfil}> <VscHome/>{right?<StyledPP>Mi perfil</StyledPP>:""}</StyledDivSubtitule>:''}
                                                    {stateLogin.login.user.vendors.category=="4"||stateLogin.login.user.vendors.category==="5"?<StyledDivSubtitule color={whereHere==="colaboradores"?"#FF7528":"#D3D3D3"} onClick={handleClickVendedorColaboradores}><BsPeople/>{right?<StyledPP>Colaboradores</StyledPP>:""}</StyledDivSubtitule>:""}
                                                    <StyledDivSubtitule color={whereHere==="clientes"?"#FF7528":"#D3D3D3"} onClick={handleClickVendedorClientes}><BsPerson/>{right?<StyledPP>Mis clientes</StyledPP>:""}</StyledDivSubtitule>
                                                    {stateLogin.login.user.vendors.category=="4"||stateLogin.login.user.vendors.category==="5"? <StyledDivSubtitule color={whereHere==="clientes2"?"#FF7528":"#D3D3D3"} onClick={handleClickVendedorClientes2}><MdOutlineContacts/>{right?<StyledPP>Clientes</StyledPP>:""}</StyledDivSubtitule>:''}
                                                    {stateLogin.login.user.vendors.category=="5"||stateLogin.login.user.vendors.category=="4"?<StyledDivSubtitule color={whereHere==="formulario"?"#FF7528":"#D3D3D3"} onClick={handleClickVendedorFormulario}><FiFolder/>{right?<StyledPP>Contratos</StyledPP>:""}</StyledDivSubtitule>:''}

                                                    <StyledDivSubtitule color={whereHere==="estadistica"?"#FF7528":"#D3D3D3"} onClick={handleClickVendedorEstadistica}><MdOutlineBarChart/>{right?<StyledPP>Estadísticas</StyledPP>:""}</StyledDivSubtitule>
                                                    {stateLogin.login.user.vendors.category!=="5"?<StyledDivSubtitule color={whereHere==="notificacion"?"#FF7528":"#D3D3D3"} onClick={handleClickVendedorNotificacione}><CgBell/>{right?<StyledPP>Notificaciones{' ('+data.length+')'}</StyledPP>:""}</StyledDivSubtitule>:''}

                                                    <StyledDivSubtitule color={whereHere==="ayuda"?"#FF7528":"#D3D3D3"} onClick={handleClickVendedorAyuda}><BiCommentDetail/>{right?<StyledPP>Ayuda</StyledPP>:""}</StyledDivSubtitule>


                                </StyledMyPanel>
                             {stateLogin.login.user.vendors.category=="4"||stateLogin.login.user.vendors.category==="5"?'':<StyledMyTeam displayPanel={displayPanel}>
                                                    {right?<StyledDivTitle><StyledImgTeam src={team}/><StyledTitle2>Mi equipo</StyledTitle2></StyledDivTitle>:""}
                                                    {lider[0]?<StyledDivSubtitule2 color="#AD1D12"  ><BsPersonCircle/>{right?<StyledContainPerson><StyledPP2>{lider[0].name}</StyledPP2><StyledPP3>{lider[0].category==='1'?'Vendedor JR':lider[0].category==='2'?'Vendedor SR':lider[0].category==='3'?'Jefe de equipo':lider[0].category==='4'?'Gerente':'Rol'}</StyledPP3></StyledContainPerson>:""}</StyledDivSubtitule2>
:''}

                                                    {stateMem?stateMem.map((e,key)=> <StyledDivSubtitule2 key={key} color="#0D8DF2"><BsPersonCircle/>{right?<StyledContainPerson><StyledPP2>{e.name}</StyledPP2><StyledPP3>{e.category==='1'?'Vendedor JR':e.category==='2'?'Vendedor SR':e.category==='3'?'Jefe de equipo':e.category==='4'?'Gerente':'Rol'}</StyledPP3></StyledContainPerson>:""}</StyledDivSubtitule2>
):''}

                                </StyledMyTeam>}
            </StyledContainer>
            <StyledContainer2 displayBlack={ displayBlack}>
            </StyledContainer2>
            </>
    );

}