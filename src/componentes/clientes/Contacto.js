import React, { useEffect, useRef, useState } from 'react';
import styled from 'styled-components'
import Button from '../Button';
import {AiOutlineSearch} from 'react-icons/ai';
import {MdPersonAddAlt} from 'react-icons/md';
import Input from '../Input';
import {BsTriangleFill} from 'react-icons/bs';
import Menor from '../../img/menor.svg';
import Mayor from '../../img/mayor.svg'
import Union from '../../img/Union.svg'
import {FiPhone} from 'react-icons/fi';
import {AiOutlineWhatsApp} from 'react-icons/ai';
import {MdOutlineModeEdit} from 'react-icons/md';
import Alert from '../Alert'
import Expediente from '../Expediente';
import Select from './../Select';
import { fetchUtil } from '../../util/fetchUtil';
import { useDispatch, useSelector } from 'react-redux/es/exports';
import spinner from '../../img/spinner.gif'
import { Url} from '../../util/rutas'
//STYLES 
const StyledBigContainer=styled.section`
    padding:20px;
    background-color:white;
    width:${({calc})=>calc};
    transition:all 0.7s ease;
    margin:0px;
    height:100%;
    border-radius: 0px 14px 0px 0px;
    position:relative;
    div{
        margin:0px auto;
    }
    @media all and (max-width:900px){
        width:calc(100% - 42px)
    }
    @media all and (max-width:700px){
        width:100%;
        border-radius: 14px 14px 0px 0px;     
    }
    .errorForm{
        color:red;
        padding:10px 0px;
    }
    .loading{
        width:100%;
        display:flex;
        justify-content:center;
        
    }
`;
const StyledContainer=styled.section`
   
`;
const StyledHeaderContacto=styled.div`
   width:100%;
   padding:20px;
   padding-left:0px;
   padding-right:0px;
   display:flex;
   justify-content:space-between;
   align-items:center;
`;
const StyledBuscador=styled.div`
   width:30%;
   margin:0px !important;
   height:54px;
   background: #F7F7F7;
   width:328px;
   position:relative;
   input{
    color:#606060;
    font-size: 14px;
    background: #F7F7F7;
   }
   svg{
    position:absolute;
    width:19px;
    height:19px;
    z-index:1;
    right:15px;
    top:20px;
    color:#606060;
    
   }
   @media all and (min-width:900px){
    @media all and (max-width:1150px){
        width:230px;
    }
   }
   @media all and (max-width:700px){
    width:230px;
   }
`;
const StyledHeaderCards=styled.div`
   width:100%;
   padding:20px;
   height:54px;
   display:flex;
   background-color:#F6F6F6;
   justify-content:space-between;
   align-items:center;
   position:relative;
   padding-right:50px;
   margin:0px;
   p{
    margin:0px;
    color:black;
    font-size: 14px;
   }
   svg{
    margin:0px;
   }
   .triangulos{
    display:none;
    flex-direction:column;
    position:absolute;
    z-index:1;
    left:85%;
    .triangulo2{
        transform:rotate(180deg);
        
    }
    .triangulo1{
        color:#D3D3D3;
        
    }
    svg{
        width:11px;
        height:8px;
    }
   }
   @media all and (max-width:1000px){
    .triangulos{
        left:65%;
    }
   }
   @media all and (max-width:700px){
    .triangulos{
        left:45%;
    }
   }
`;
const StyledContainButton=styled.div`
   width:145px;
   margin:0px !important;
   height:54px;
   position:relative;
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
    width:54px;
    heigth:54px;
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
const StyledContainButton3=styled.div`
   width:145px;
   margin:0px;
   height:54px;
   position:relative;
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
   
        svg{
            left:35%;
            top:16px;
        }
   
   }
   
`;
const StyledContainButtonIcon=styled.div`
width:50px;
margin:0px;
height:54px;
position:relative;
svg{
 position:absolute;
 width:22px;
 z-index:1;
 color:white;
 height:20px;
 top:16px;
 left:13px;
}   
a{
    width:100%;
     height:100%; 
}
@media all and (max-width:900px){
    width:150px;
}
`;
const StyledContainButton2=styled.div`
width:150px;
margin:0px;
height:54px;
position:relative;
@media all and (max-width:410px){
    width:100px;
}
`;

const StyledContainClient=styled.div`
   width:100%;
   padding:0px;
   padding-top:0px;
`;
const StyledCardClient=styled.div`
   display:flex;
   justify-content:space-between;
   align-items:center;
   margin:0px;
   padding-bottom:10px;
   border-bottom:solid 1px rgba(0,0,0,0.08);
   margin-top:10px;
   padding-top:10px;
   padding-left:20px;
   padding-right:10px;
   cursor:pointer;
   div{
    margin:0px;
    display:flex;
    flex-direction:column;
   }
   p{
    margin:0px;
   }
   .nombre{
    font-size: 14px;
    margin-bottom:5px;
   }
   .dni{
    font-size: 12px;
    color: #606060;
    font-weight:300;
   }
   .tel{
    font-size: 14px;
    color: #606060;
   }
`;
const StyledNum=styled.div`

width: 27px;
height: 32px;
background:${({background})=>background};
border-radius: 8px;
color: ${({color})=>color};
display:flex;
justify-content:center;
align-items:center;
cursor:pointer;
`
const StyledContainNum=styled.div`

    display:flex;
    width:300px;
    margin-top:30px !important;
`
const StyledButton=styled.button`
width: 44px;
height: 32px;
background: #F7F7F7;
border-radius: 8px;
display: flex;
justify-content: center;
align-items: center;
color:black;
font-weight:600;
font-size:22px;
border:none;
cursor:pointer;
`;
const StyledContainCard=styled.section`
display:block;
position:absolute;
transition:all 0.7s ease;
right:-90%;
background:white;
border-radius:8px;
padding:20px;
z-index:12;
margin:0%;
width:85%;
height:auto;
top:0%;

@media all and (max-width:900px){
    transition:all 1s ease;
    left:0%;
    margin-bottom:${({display})=>display==="none"?"-100vh":"0%"};
    bottom:0px;
    top:auto;
    width:100vw;
    position:fixed;
    z-index:123333;
    overflow:auto;
    max-height:90vh;
}
.contactoHeader{
    display:flex;
    justify-content:space-between;
    align-items:center;
    padding-bottom:10px;
    margin-bottom:20px;
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
input{
    margin-top:4px;
    margin-bottom:15px;
}
.datosHeader{
    margin-bottom:20px;
}
.datosContain{
    padding:10px;
    font-weight: 400;
    font-size: 16px;
    color: #606060;
    p{
        margin-bottom:5px;
    }
    input{
        height:40px;
        background:#F7F7F7;
    }
    .Select{
         height:40px;
          margin-top:4px;
          margin-bottom:15px;
    }
}
.containButtons{
    display:flex;
    justify-content:space-between;
    align-items:center;
    margin-top:20px;
    @media all and (max-width:900px){
        display:grid;
        width:100%;
        grid-template-columns:1fr 1fr;
        gap:10px; 
        grid-template-rows: auto auto;
        >div{
            grid-column:1/3;
            display:grid !important;
            grid-template-columns:1fr 1fr; 
            grid-template-rows: auto auto;
            .expediente{
                grid-row:2/3;
                grid-column:1/3;
                width:80%;
                margin-top:10px;
                margin-bottom:10px;
            }
            div{
                width:96%;
                
                justify-self: center;
                height:40px;
                svg{
                    top:10px;
                }
                button{
                    font-size:14px;}
            }
        }
        .edit{
            cursor:pointer;
            grid-column:1/3;
            grid-row:2/3;
            color:#606060;
            justify-self: center;
            font-size:16px;
            maring:0px;
            gap:0px;
            margin-top:10px;
            maring-bottom:30px;
        }
    }
    div{
        display:flex;
        justify-content:center;
        align-items:center;
        margin:0px;
       
        div{
            margin-right:10px;
        }
    }
    svg{
        margin:0px;
       
    }
    .edit{
        svg{
            width:25px;
            height:25px;
            cursor:pointer;
        }
    }

}


`;
const StyledContainEditCard=styled.section`
display:block;
transition:all 0.5s ease;
background:white;
border-radius:8px;
padding:20px;
z-index:12;
width:40%;
left:29%;
position:fixed;
z-index:12333312321321;
overflow:auto;
bottom:0px;
max-height:95vh;
margin-bottom:${({display})=>display==="none"?"-100vh":"20vh"};
@media all and (max-height:550px){
    margin-bottom:${({display})=>display==="none"?"-100vh":"0%"};
}
@media all and (max-height:750px){
    margin-bottom:${({display})=>display==="none"?"-100vh":"10vh"};
}
@media all and (max-width:900px){
    left:0%;
    width:100%;
    margin-bottom:${({display})=>display==="none"?"-100vh":"0%"};

}
span{
    color:#FF7528;
}
.contactoHeader{
    display:flex;
    justify-content:space-between;
    align-items:center;
    padding-bottom:10px;
    margin-bottom:20px;
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
input{
    margin-top:4px;
    margin-bottom:15px;
}
label{
    color:black;
}
.names{
    display:flex;
    justify-content:space-between;
    margin:0px;
    width:100%;
    div{
        width:95%;
        margin:0px;
       
    }
}
.datosContain{
    padding:10px;
    font-weight: 400;
    font-size: 16px;
    color: #606060;
    p{
        margin-bottom:5px;
    }
    input{
        height:40px;
        background:#F7F7F7;
    }
    .Select{
        height:40px;
         margin-top:4px;
         margin-bottom:15px;
   }
}
.eliminar{
    font-size:16px;
    color: #F02849;
    font-weight:500;
    margin-left:5px;
    cursor:pointer;
}
.containButtons{
    display:flex;
    justify-content:space-between;
    align-items:center;
    margin-top:30px;
    @media all and (max-width:900px){
        display:grid;
        width:100%;
        grid-template-columns:100%;
        grid-template-rows:auto auto;
        gap:40px;
        .eliminar{
            grid-row: 2/3;
            margin-bottom:30px;
            align-self: center;
            text-align:center;
        }
        div{
            width:100%;
        }
    }
    div{
        margin:0px; 
    }
}
    

}


`;
const StyledDark=styled.div`
    width:110vw;
    height:100vh;
    background-color:rgba(0,0,0,0.4);
    backdrop-filter:blur(2px);
    z-index:12333;
    display:${({displayBlack})=>displayBlack};
    position:fixed;
    margin:0px;
    top:0px;
    left:-10%;
    transition:all 0.5s ease;
    box-shadow: 0px 4px 16px rgba(0, 0, 0, 0.05);
    @media all and (max-width:900px){
        display:${({displayBlack})=>displayBlack};
    }
    
`;

export default function Contacto(){
    let api= fetchUtil();
    let url=Url('client')
    const stateLogin= useSelector(stateLogin=>stateLogin)
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
    const [page, setPage]=useState(1)
    const [widthW, setWidth]=useState(true)
    const [add, setAdd]=useState(true)
    const [seeExpediente,setSeeExpedient]=useState(false)
    const [numberpages,setnumberPages]=useState([])
    const [buscarContacto, setBuscarContacto]=useState("")
    const [cardYes, setCardYes]=useState(false)
    const [cardEdit, setCardEdit]=useState(false)
    const [calc,setCalc]=useState(true)
    const [data, setData]= useState([
        {
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
    }])
    const [showData,setShowData]=useState([])
    const [pwrong,setPWrong]=useState(false);
    const [errorForm,setErrorForm]=useState('');
    const [agregado,setAgregado]=useState(false)
    const [guardado,setGuardado]=useState(false)
    const [abre,setAbre]=useState(false)
    const [abre2,setAbre2]=useState(false)
    const [loading,setLoading]=useState(false)

        const setSeeForm=()=>{
            setSeeExpedient(true)
        }
        const exitExpediente=()=>{
            setSeeExpedient(false)
            }
       const setAgrega =()=>{
      
        let objectPost={
             nombre:clientu.cliente.nombre,
             apellido:clientu.cliente.apellido,
             telefono:clientu.telefono,
             conoci:clientu.conoci,
             horario:clientu.horario,
        }
      
        if(objectPost.nombre==="" || objectPost.apellido===""|| objectPost.telefono===""|| objectPost.conoci===""|| objectPost.horario===""){
            setPWrong(true)
            setErrorForm('Todos los datos son obligatorios') 
        }else{
          setLoading(true)
            api.post(url,{body:objectPost,headers:
                {"Content-Type":"application/json",
                    "x-access-token":stateLogin.login.user.token,
                    "Accept":"*/*",
                    "Accept-Encoding":"gzip, deflate, br"
                 }
            }).then(res=>{
                if(!res.message){
                    setCardEdit(false)
                    setAgregado(true)  
                    llenarArrayContactos(page)
                    setLoading(false)                
                 }else{
                    setPWrong(true)
                    setLoading(false)
                    setErrorForm("Ya existe un usuario registrado con ese email")
                 }
                
                }) 
        }
        }

        const setGuarda=()=>{
             let objectPut={
                id:clientu.id,
                nombre:clientu.cliente.nombre,
                apellido:clientu.cliente.apellido,
                telefono:clientu.telefono,
                conoci:clientu.conoci,
                horario:clientu.horario,
        }
      
        if(objectPut.nombre==="" || objectPut.apellido===""|| objectPut.telefono===""|| objectPut.conoci===""|| objectPut.horario==""){
            setPWrong(true)
            setErrorForm('Todos los datos son obligatorios') 
        }else{
            setLoading(true)          
            api.put(url,{body:objectPut,headers:
                {"Content-Type":"application/json",
                    "x-access-token":stateLogin.login.user.token,
                    "Accept":"*/*",
                    "Accept-Encoding":"gzip, deflate, br"
                 }
            }).then(res=>{
                if(!res.message){
                    console.log(objectPut)
                    setGuardado(true)
                    setCardEdit(false)
                    setCardYes(false)
                    setLoading(false)   
                    llenarArrayContactos(page)       
                 }else{
                    console.log(objectPut)
                    setGuardado(true)
                    setCardEdit(false)
                    setCardYes(false)
                    setLoading(false)   
                 }
                
                })
        }
        
        }
       const exitAlert =()=>{
            setAgregado(false)
            setGuardado(false)
            setAbre(false)
            setAbre2(false)


        }
        const handleClickButton=()=>{
            setAgregado(false)
            setGuardado(false)
            setAbre(false)
            setAbre2(false)

        }
    //change del buscador
    const handleBuscar=(e)=>{
        setBuscarContacto(e.target.value)
        let nuevaData=data
        let mostraData=[]
        mostraData=nuevaData.filter(element=>element.cliente.nombre.toLocaleLowerCase().includes(e.target.value.toLocaleLowerCase())||element.cliente.apellido.toLocaleLowerCase().includes(e.target.value.toLocaleLowerCase()))
        setShowData(mostraData)
    }
    //change de los input 
    const handleChange=(e)=>{
    setCliente(prev=>({...prev,[e.target.name]:e.target.value}))
    }
    const handleChangeApellido=(e)=>{
          let cambio=clientu
          cambio.cliente.apellido=e.target.value      
         setCliente(prev=>({...prev,[clientu.cliente.apellido]:e.target.value}))

        }
        const handleChangeNombre=(e)=>{
            let cambio=clientu
            cambio.cliente.nombre=e.target.value  
             setCliente(prev=>({...prev,[clientu.cliente.nombre]:e.target.value}))
    
            }
      // Inicializa los contactos a mostrar en la primer pagina
      useEffect(()=>{
           
            itWidth()
            
            llenarArrayContactos(page)
      },[])
      // detecta width 
      const itWidth=()=>{
        let it=window.innerWidth
        if(it>900){
            setWidth(true)
        }else{
            setWidth(false)

        }
        
      }
      // setea la pagina donde se encuentra actualmente
      const setSetPages=(res)=>{
        
        let num = res.length/6;
        let numsPages=[]
        for(let i=0;i<num;i++){
            if(i<3){
                numsPages.push(i+1)
            }
        }
        
        setnumberPages(numsPages)
        
      }
      //Funcion que capta los contactos segun la pagina que se encuentre
      const llenarArrayContactos=(page)=>{
        setLoading(true)
        api.get(url,{headers:
            {"Content-Type":"application/json",
                "x-access-token":stateLogin.login.user.token,
                "Accept":"*/*",
                "Accept-Encoding":"gzip, deflate, br"
             }
        }).then(res=>{
            setLoading(false)
            if(!res.message){
                    setData(res)
                    let newArray=[] 
                    let arrayi=res
                    setLoading(false)
                    for(let i=(page*6)-6;i<page*6;i++){
                        if(arrayi[i]){
                            newArray.push(arrayi[i])
                        }
                    }
                    setShowData(newArray)
                    setSetPages(res)

             }
            }) 
       
  }
    // Mostrar los contactos segun la pagina marcada en el Click
     const pagina=(pagin)=>{
    setPage(pagin)
    llenarArrayContactos(pagin) 
    }
        // Mostrar numeracion de paginas posteriores
        const nextPage=()=>{
            let numLeng = (data.length/6);
            let num = numberpages;
            let numsPages=[]
            if(num[2]<numLeng){
            for(let i=0;i<3;i++){
                if(num[i]+2<=numLeng){
                numsPages.push(num[i]+3)}
            }
            setnumberPages(numsPages)
            }
          }
    // Mostrar numeracion de paginas anteriores
    const beforePage=()=>{
    let num = numberpages;
    let numsPages=[]
    if(num[0]!==1){
    for(let i=0;i<3;i++){
        if(num[i]){
            numsPages.push(num[i]-3)
        }else{
            numsPages.push(numsPages[i-1]+1)
        }         
    }
    setnumberPages(numsPages)
    }
    }
      //CLICK EN CONTACTO
      const returnCardClient=(contacto)=>{
        setCardYes(true)
        setCliente(contacto)
        handleCal("yes")      
        limpiarSeleccion()
        seleccionarContacto(contacto)
        itWidth()
        setAbre(true)
      }
      //EXIT DEL CONTACTO
      const exit=()=>{
        setCardYes(false)
        handleCal("no")
        limpiarSeleccion()
        setAbre2(false)
        setAbre(false)


      }
      //LIMPIAR LA SELECCION DEL CONTACTO
      const limpiarSeleccion=()=>{
        let nombres= document.querySelectorAll(".nombre")
        nombres.forEach(element=>{
            element.style.color="black"
        })
        let contactosBorder= document.querySelectorAll(".contactoClass")
        contactosBorder.forEach(element=>{
            element.style.border="none"
            element.style.boxShadow="0px 0px 0px 0px"
        })
      }
       //SELECCION DE CONTACTO
      const seleccionarContacto=(contacto)=>{
        let nombre= "#nombre"+contacto.id
        let nombreTake= document.querySelector(nombre)
        nombreTake.style.color="#FF7528"
        let contactoBorder= "#contacto"+contacto.id
        let contactoTake= document.querySelector(contactoBorder)
        contactoTake.style.borderRight="solid 6px #FF7528"
        contactoTake.style.boxShadow= "0px 0px 10px rgba(0, 0, 0, 0.1)";
      }
         // cambia el width al seleccionar contacto
         const handleCal=(param)=>{ 
            if(param==="yes"){
                setCalc(false)
            }else{
                setCalc(true)
            }
        }
        //EDITAR CONTACTO
        const handleEdit=(param)=>{
            setCardEdit(true)
            if(param==="edit"){
                setAdd(false)
                setAbre2(true)
            }else{
                setCliente({
                    id: 1,
                    conoci: "",
                    horario: "",
                    telefono: "",
                    vendedor: 34,
                    createdAt: "",
                    updatedAt: "",
                    cliente_Id: 1,
                    cliente: {
                        id: 1,
                        nombre: "",
                        apellido: "",
                        telefono: "",
                        createdAt: "",
                        updatedAt: "",
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
                })
                setAdd(true)
                setPWrong(false)
                setAbre2(false)
            }
            
        }
         //EXIT DEL EDIT
        const exitEdit=()=>{
        setCardEdit(false)
        setCardYes(false)
        handleCal("no")
        limpiarSeleccion() 
        setAbre(false)
        setAbre2(false)

      }
      const handleSelectHorario=(e)=>{
        let valore=e.value
        setCliente(prev=>({...prev,horario:valore}))
        } 
        const handleSelectDondeConoci=(e)=>{
            let valore=e.value
            setCliente(prev=>({...prev,conoci:valore}))
            } 
    return(
        <>
             < StyledBigContainer calc={calc?"calc(100% - 42px)":"calc(55% - 42px)"} >
                    <StyledContainer  >
                      
                      <StyledHeaderContacto>
                                <StyledBuscador>
                                                <Input input={{placeholder:"Buscar nombre, email, etc.",value:buscarContacto,name:"cliente",type:"text",setValue:handleBuscar}}></Input>
                                                <AiOutlineSearch/>
                                </StyledBuscador>
                                <StyledContainButton  onClick={()=>handleEdit("add")}><MdPersonAddAlt/><Button   text="Agregar"></Button></StyledContainButton>
                      </StyledHeaderContacto>
                      {
                           showData.length?
                      <StyledHeaderCards>
                        <p>Contacto({data.length})</p>
                      
                        <div className='triangulos'>
                                <div className='triangulo1'><BsTriangleFill/></div>
                                <div className='triangulo2'><BsTriangleFill/></div>
                        </div>
                        
                        <p>Teléfono</p>
                      </StyledHeaderCards>
                      :''}
                      <StyledContainClient>
                      
                    
                           {  
                           showData.length?showData.map((contacto)=>
                            <StyledCardClient id={"contacto"+contacto.id} className="contactoClass" key={contacto.id} onClick={()=>{returnCardClient(contacto)}}>
                            <div> 
                                <p id={"nombre"+contacto.id} className="nombre">{contacto.cliente.nombre+" "+contacto.cliente.apellido}</p>
                                <p className="dni">DNI: {contacto.cliente.Personale.cuil}</p>
                            </div>
                            <p id={"tel"+contacto.id} className="tel">{contacto.telefono}</p>
                         </StyledCardClient>
                           )
                         :''}
                       
                       {
                            loading?<div className='loading'><img  src={spinner}/></div>:''
                        }   
                        <StyledContainNum>
                        <StyledButton onClick={()=>beforePage()}><img src={Menor} /></StyledButton>
                        {
                            numberpages.map((numPage)=><StyledNum color={page==numPage?"white":" #606060"}  background={page==numPage?"#FF7528":"#F7F7F7"} onClick={()=>pagina(numPage)}>{numPage}</StyledNum>)
                        } <StyledButton onClick={()=>nextPage()}><img src={Mayor}/></StyledButton>
                        </StyledContainNum>
                      </StyledContainClient>
                      
                    </StyledContainer>
                    <StyledContainCard display={cardYes?"block":"none"}>
                
                    <div className='contactoHeader'>
                        <h4>{clientu.cliente.nombre+" "+clientu.cliente.apellido}</h4>
                        <img onClick={()=>exit()} src={Union} alt="Exit"/>
                    </div>
                    <div className='datosContain'>
                    <label>Fecha de creación</label>
                    <Input input={{disabled:true,value:clientu.createdAt.substring(0,10),name:"createDate",type:"text"}}></Input>
                    <label>Teléfono</label>
                    <Input input={{disabled:true,value:clientu.telefono,name:"tel",type:"text"}}></Input>
                    <label>Dónde lo conocí</label>
                    {abre?<Select options={{text:clientu.conoci,value:clientu.conoci}}/>:''}
                    <label>Horario para llamar</label>
                    {abre?<Select options={{text:clientu.horario,value:clientu.horario}}/>:''}
                    <div className='containButtons'>
                        <div>
                        <StyledContainButtonIcon><a target="_blank"  href={"tel:"+clientu.telefono}><FiPhone/><Button text={widthW?"":"Llamar"} ></Button></a></StyledContainButtonIcon>
                        <StyledContainButtonIcon><a target="_blank"  href={"https://api.whatsapp.com/send?phone="+clientu.telefono}><AiOutlineWhatsApp/><Button text={widthW?"":"Whatsapp"}></Button></a></StyledContainButtonIcon>
                        <StyledContainButton2 onClick={setSeeForm} className='expediente'><Button text="Ver formularios"></Button></StyledContainButton2>
                        </div>
                        <div onClick={()=>handleEdit("edit")} className='edit'>
                        <MdOutlineModeEdit/>
                        {widthW?"":"Editar"}
                        </div>

                    </div>
                    </div>

                
                    </StyledContainCard>
                    <StyledContainEditCard display={cardEdit?"block":"none"}>
                
                <div className='contactoHeader'>
                    <h4>{add?"Nuevo contacto":"Editar contacto"}</h4>
                    <img onClick={()=>exitEdit()} src={Union} alt="Exit"/>
                </div>
                <div className='datosContain'>
                <div className='names'>
                    <div>
                                <label>Nombre<span >*</span></label>
                                <Input input={{disabled:add?false:true,value:clientu.cliente.nombre,name:"nombre",type:"text",setValue:handleChangeNombre}}></Input>
                    </div>
                    <div>
                              <label>Apellido<span >*</span></label>
                              <Input input={{disabled:add?false:true,value:clientu.cliente.apellido,name:"apellido",type:"text",setValue:handleChangeApellido}}></Input>
                    </div>
                </div>
                <label>Teléfono<span >*</span></label>
                <Input input={{disabled:false,value:clientu.telefono,name:"telefono",type:"text",setValue:handleChange}}></Input>
                <label>Dónde lo conocí <span > *</span></label>
                   {abre2?<Select options={{text:clientu.conoci,value:clientu.conoci,setValue:handleSelectDondeConoci,array:["Facebook de la empresa","Instagram de la empresa","Gmail de la empresa","Referido de otro cliente","Referido de la empresa","Contacto propio","En persona en la empresa","Otro"]}}/>:''}
                   {add?<Select options={{text:'Donde lo conoci',value:clientu.conoci,setValue:handleSelectDondeConoci,array:["Facebook de la empresa","Instagram de la empresa","Gmail de la empresa","Referido de otro cliente","Referido de la empresa","Contacto propio","En persona en la empresa","Otro"]}}/>:''}

                    <label>Horario para llamar <span > *</span></label>
                    <Select options={{text:"Turno",value:clientu.horario,setValue:handleSelectHorario,array:["Mañana","Tarde","Noche"]}}/>
                    {pwrong?<div className='errorForm'>{errorForm}</div>:""}
                    {
                            loading?<div className='loading'><img  src={spinner}/></div>:''
                        }   
               <div className='containButtons'>
                    
                    <div  className='eliminar'>
                    </div>
                    <div>
                    
                    {add?<StyledContainButton3 onClick={setAgrega}><MdPersonAddAlt/><Button text="Agregar"></Button></StyledContainButton3>:<StyledContainButton2 onClick={setGuarda}><Button text="Guardar"></Button></StyledContainButton2>}
                    </div>

                </div>
                
                </div>

            
                </StyledContainEditCard>
                    <StyledDark displayBlack={(cardYes&&!widthW) || cardEdit?"block":"none"}></StyledDark>

           </StyledBigContainer>

           <Alert alert={{action:agregado,type:"add",exit:exitAlert,title:"¡Agregado!",text:"Ahora podés ver este cliente en tu lista de contactos y realizar acciones como: llamarlo, cargar datos y editarlo en caso de ser necesario.",button:"Volver a contactos",handleClickButton:handleClickButton}} />
           <Alert alert={{action:guardado,type:"add",exit:exitAlert,title:"¡Guardado!",text:"Ahora podés ver este cliente en tu lista de contactos y realizar acciones como: llamarlo, cargar datos y editarlo en caso de ser necesario.",button:"Volver a contactos",handleClickButton:handleClickButton}} />
           <Expediente expediente={{action:seeExpediente,exit:exitExpediente,datosForm:clientu}}></Expediente>
           </>
    );

}