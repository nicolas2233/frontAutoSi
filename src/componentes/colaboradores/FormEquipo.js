import React, { useState,useRef,useEffect } from 'react';
import styled from 'styled-components'
import Union from './../../img/Union.svg'
import Input from '../Input';
import Select from './../Select';
import Button from '../Button';
import {MdPersonAddAlt} from 'react-icons/md';
import Alert from '../Alert';
import { fetchUtil } from '../../util/fetchUtil';
import spinner from '../../img/spinner.gif'
import {Url} from '../../util/rutas'
import { useDispatch, useSelector } from 'react-redux/es/exports';

const StyledDark=styled.div`
    overflow:hidden;
    width:100vw;
    height:100vh;
    background-color:rgba(0,0,0,0.4);
    backdrop-filter:blur(2px);
    z-index:12333;
    left:0px;
    top:0px;
    position:fixed;
    margin:0px;
    transition:all 0.5s ease;
    box-shadow: 0px 4px 16px rgba(0, 0, 0, 0.05);
    display:none;
    justify-content:center;
    align-items:center;
    z-index:123333123213212;
    @media all and (max-width:700px){
        align-items:end;
    }
`;
const StyledBigContain=styled.div`
        width:450px;
        height:auto;
        background-color:white;
        border-radius:14px;
        overflow:auto;
        overflow-x:hidden;
        bottom:0px;
        max-height:95vh;
        padding:10px 20px;
        transition:all 0.4s ease;
        z-index:123333123213212;
        
        
    @media all and (max-width:700px){
        width:100%;
  
input{
    margin-top:4px;
    margin-bottom:15px;
}
.datosHeader{
    margin-bottom:15px;
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
    
}
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

.datosContain{
    padding:10px;
    font-weight: 400;
    font-size: 16px;
    color: #606060;
    p{
        margin-bottom:5px;
    }
    input{
        height:34px;
        background:#F7F7F7;
        margin-bottom:10px;
    }
    .Select{
         height:40px;
          margin-top:4px;
          margin-bottom:15px;
    }
}

.buttonsEdit{
            display:flex;
            justify-content:space-between;
            align-items:center;
            div{
                margin:0px;
                width:140px;
                height:54px;
                
            }
        .eliminarEmpleado button{
             background:#F02849;
             &:hover{
                opacity:0.8;
             }
        }
        }
        .containButtons{
            margin-top:10px;
        }

        .classLider{
            
            border-radius:10px;
            width:100%;
            padding:2px;
            strong{
                color:black;
            }
            margin-bottom:15px;
        }
        .quitar{
            color:red;
            cursor:pointer;
        }
        .errorForm{
            color:red;
            padding:10px 0px;
        }
        .loading{
            img{
                width:35px;
                height:35px;
            }
          
            
        }
       .addcss{
        margin-bottom:7px;
       }
       .classLider{
        font-size:14px;
       }
`;
const StyledContainButton=styled.div`
   width:175px;
   margin:0px;
   height:54px;
   position:relative;
   left: 55%;

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
   
       
    svg{
    
        left:30%;
       }
    background:#FF7528;
    width:100%;
    left: 0%;
    display:flex;
    justify-content:center;
    align-items:center;
    border-radius:8px;
    cursor:pointer;
    
   }
   
`;

export default function FormEquipo({formEmpleado}){
    
    const [guardado, setGuardado]=useState(false)
    const [guardar, setGuardar]=useState(false)
    const [eliminar, setEliminar]=useState(false)
    const [preguntaEliminar, setPreguntaEliminar]=useState(false)
    const [lider,setLider]=useState('')
    const [miembro,setMiembro]=useState([])
    const [buscador,setBuscador]=useState([])
    const [nameTeam,setNameTeam]=useState('')
    const [isEdit,setIsEdit]=useState(false)
    const [loading,setLoading]=useState(false)
    const [pwrong,setPWrong]=useState(false);
    const [errorForm,setErrorForm]=useState('');
    const stateLogin= useSelector(stateLogin=>stateLogin)

    const formMove=useRef()
    const alertDark=useRef()
    let api= fetchUtil();
    let url=Url('group')
    //CREAR EMPLEADO
    const agregarEmpleado=()=>{
        let team={
            name:'',
            idLider:'',
            gerente:stateLogin.login.user.vendors.id.toString(),
            miembros:[]

        }
        if(nameTeam.length>0){
          team.name=nameTeam
        }
        if(lider.length>0){
            let agarro=formEmpleado.vendedors.filter(element=>(element.name+', '+element.lastname+' ; '+element.email)===lider)
            team.idLider=agarro[0].id
        }
        if(miembro.length>0){
            miembro.forEach(miem=>{
                let agarro=formEmpleado.vendedors.filter(element=>(element.name+', '+element.lastname+' ; '+element.email)===miem)
                team.miembros.push(agarro[0].id)
            })
        }
        
        if(nameTeam.length>0&&lider.length>0&&lider.length>0){
            setLoading(true)
            api.post(url,{body:team,headers:{"Content-Type":"application/json",
            "x-access-token":stateLogin.login.user.token,
            "Accept":"*/*",
            "Accept-Encoding":"gzip, deflate, br"
         }}).then(res=>{
                setLoading(false)
                console.log(res)
                if(res.message==="grupo creado satisfactoriamente"){
                     setGuardado(true)                
                 }else{
                    setPWrong(true)
                    setErrorForm('El lider ya pertenece a otro equipo, para reasignarlo deberas primero eliminar de equipo existente')
                 }
                
                }) 
        }else{
            setPWrong(true)
            setErrorForm('Todos los datos son obligatorios')
        }
       
      
        
    }
    //GUARDAR EMPLEADO
      const guardarEmpleado=()=>{
        setLoading(true)

        let datos={
            idGroup:formEmpleado.grupo.id,
            nombre:nameTeam,
            idLider:'',
        }
        let agarro=formEmpleado.vendedors.filter(element=>(element.name+', '+element.lastname+' ; '+element.email)==lider)              
        datos.idLider=agarro[0].id
       

    api.put(url,{body:datos,headers:{"Content-Type":"application/json"}}).then(res=>{
    if(res.message==="grupo actualizado satisfactoriamente"){
        setLoading(false)
        setGuardar(true) 
     }
    else{
        setLoading(false)
        setPWrong(true)
        setErrorForm(res.message)
    }})
    }
     //ELIMINAR EMPLEADO
     const eliminarEmpleado=()=>{
        setPreguntaEliminar(true)

    }
    //SALIR DE GUARDADO
    const exitAlert=()=>{
        setGuardado(false)
        setGuardar(false)
        setEliminar(false)
        setPreguntaEliminar(false)
        formEmpleado.exit()
        formEmpleado.recargar()
        setPWrong(false)

    }
    const exitAlertQuestion=()=>{
        setPreguntaEliminar(false)
    }
    const handleClickButton=()=>{
        setGuardado(false)
        setEliminar(false)
        setGuardar(false)
        setPWrong(false)
        formEmpleado.exit()
        formEmpleado.recargar()
    }
    const handleClickButtonEliminar=()=>{
        setPreguntaEliminar(false)
        setLoading(true)

        let team={
            id:formEmpleado.grupo.id
        }
        api.del(url,{body:team,headers:{"Content-Type":"application/json"}}).then(res=>{
            setLoading(false)
            setEliminar(true)
            
            }) 
    }
    // deslizar hacia arriba
    const moveUp = ()=>{
        alertDark.current.style.display="flex"
        setTimeout(function(){
            formMove.current.style.marginBottom="0%"
            
        },0)
    }
    // deslizar hacia abajo
    const moveDown=()=>{
        setTimeout(function(){
        formMove.current.style.marginBottom="-100%"
    },0)
    setTimeout(function(){
        alertDark.current.style.display="none"
    },300)
    }

    //acionar
    useEffect(()=>{
        if(formEmpleado.action){
            moveUp()
        }else if(formEmpleado.action===false){
            moveDown()
        }
        if(formEmpleado.edit){
            setIsEdit(true)
        }else{
            setIsEdit(false)
        }

    },[formEmpleado])
    useEffect(()=>{
        if(formEmpleado.edit){
               if(formEmpleado.grupo.lider) {let agarro=formEmpleado.vendedors.filter(element=>element.id==formEmpleado.grupo.lider)              
                setLider(agarro[0].name+', '+agarro[0].lastname+' ; '+agarro[0].email)}
              setMiembro([])
                setNameTeam(formEmpleado.grupo.name)
            }else if(formEmpleado.add){
                if(formEmpleado.grupo.lider){
                let agarro=formEmpleado.vendedors.filter(element=>element.id==formEmpleado.grupo.lider)              
                setLider(agarro[0].name+', '+agarro[0].lastname+' ; '+agarro[0].email)
                    }
           let names=[]
           formEmpleado.grupo.vendors.forEach(element => {
            if(formEmpleado.grupo.lider){
                let agarro=formEmpleado.vendedors.filter(element=>element.id==formEmpleado.grupo.lider)              
                setLider(agarro[0].name+', '+agarro[0].lastname+' ; '+agarro[0].email)
                if(agarro[0].id!==element.id){
               names.push(element.name+', '+element.lastname+' ; '+element.email)
                }else{
                    names.push(element.name+', '+element.lastname+' ; '+element.email)
                }}
           });
           setMiembro(names)

        }else{    
           setNameTeam('')
           setMiembro([])
           setLider('')
           setPWrong(false)
        }

    },[formEmpleado])
   
    
    useEffect(()=>{
        let names=[]
        formEmpleado.vendedors.forEach(element => {
            names.push(element.name+', '+element.lastname+' ; '+element.email)
        });
        setBuscador(names)
    },[formEmpleado.vendedors])
         const handleSelect=(e)=>{
            setLider(e.value)

            } 
            const handleSelectMiembro=(e)=>{
                let valore=e.value
              
                setMiembro([...miembro,valore])
                } 
                const handleSelectMiembroAdd=(e)=>{
                    let url44=Url('group/addVendors')
                    setLoading(true)
                    let valore=e.value
                    let agarro=formEmpleado.vendedors.filter(element=>(element.name+', '+element.lastname+' ; '+element.email)==valore)              
                    let addd={
                        idGroup:formEmpleado.grupo.id.toString(),
                        idVendor:agarro[0].id.toString()
                    }
                    api.put(url44,{body:addd,headers:{"Content-Type":"application/json"}}).then(res=>{
                        if(res.message==="el vendedor ya pertenece a un grupo"){
                            setLoading(false)
                            setPWrong(true)
                            setErrorForm(res.message)
                         }
                        else{
                            setLoading(false)
                            setMiembro([...miembro,valore])

                    
                        }})
                
                    } 
                const quita =(param)=>{
                    let filtra= miembro.filter(element=>element!==param)
                    setMiembro(filtra)
                }
                const quitare =(param)=>{
                    setLoading(true)
                    let url44=Url('group/deleteVendors')
                    let agarro=formEmpleado.vendedors.filter(element=>(element.name+', '+element.lastname+' ; '+element.email)==param)              
                    let delet={
                        idVendor:agarro[0].id
                    }
                    api.put(url44,{body:delet,headers:{"Content-Type":"application/json"}}).then(res=>{
                        if(res.message){
                            setLoading(false)
                            let filtra= miembro.filter(element=>element!==param)
                            setMiembro(filtra)
                         }
                        else{
                            setLoading(false)
                            let filtra= miembro.filter(element=>element!==param)
                            setMiembro(filtra)
                    
                        }})
                        
                }

        const handleChangeName=(e)=>{
            
            setNameTeam(e.target.value)
        }
        const exitFormulario=()=>{
            setGuardado(false)
            setGuardar(false)
            setEliminar(false)
            setPreguntaEliminar(false)
            setPWrong(false)
            formEmpleado.exit()
            formEmpleado.recargar()
        }
    return(
            <>
                <StyledDark ref={alertDark} >
                <StyledBigContain ref={formMove}>
              
                        <div className='contactoHeader'>
                                 <h4>{isEdit?'Editar equipo':formEmpleado.add?'Administrar miembros':'Crear equipo'}</h4>
                                 <img onClick={()=>exitFormulario()} src={Union} alt="Exit"/>
                        </div>
                        {formEmpleado.add?<>
                            <div className='addcss'>Agregar miembros </div>
                                <Select  options={{text:"Buscar miembro",value:miembro,setValue:handleSelectMiembroAdd,array:buscador}}/>
                                <br/><br/>
                        {miembro.map((e,key)=><p key={key} className='classLider'><strong>Miembro:  </strong>{e} <span className='quitar' onClick={()=>quitare(e)}> Quitar</span></p>)}
                        {
                            loading?<div className='loading'><img  src={spinner}/></div>:''
                        } 
                                                        {pwrong?<div className='errorForm'>{errorForm}</div>:""}

                        </>: <>
                        <div className='datosContain'>

                                <label>Nombre del equipo</label>
                                {isEdit? <Input input={{disabled:false,value:nameTeam,name:"nombreTeam",type:"text",setValue:handleChangeName}}></Input>:<Input input={{disabled:false,value:nameTeam,name:"nombreTeam",type:"text",setValue:handleChangeName}}></Input>}
                                <label>Jefe del equipo</label>
                                <Select options={{text:"Buscar a un Lider",value:lider,setValue:handleSelect,array:buscador}}/>
                                {lider?<p className='classLider'><strong>Lider:  </strong>{lider}</p>:''}
                               {isEdit?'':<> <label>Agregar miembros</label>
                                <Select options={{text:"Buscar miembro",value:miembro,setValue:handleSelectMiembro,array:buscador}}/></>}
                                {miembro&&!isEdit?miembro.map((element,key)=><p key={key} className='classLider'><strong>Miembro:  </strong>{element} <span className='quitar' onClick={()=>quita(element)}> Quitar</span></p>):''}
                                {pwrong?<div className='errorForm'>{errorForm}</div>:""}
                                {
                            loading?<div className='loading'><img  src={spinner}/></div>:''
                        } 
                       
                        <div className='containButtons'>
                        {isEdit?        <div className='buttonsEdit'>        <div onClick={eliminarEmpleado} className='eliminarEmpleado'><Button  text="Eliminar equipo"></Button></div>
                                                                <div onClick={guardarEmpleado}><Button   text="Guardar equipo"></Button></div>
                             </div>    :                       <StyledContainButton onClick={agregarEmpleado} ><MdPersonAddAlt/><Button   text="Crear equipo"></Button></StyledContainButton>
 }    

                         
                        </div>
                </div>   
                </>}     
                <Alert alert={{action:guardado,type:"add",exit:exitAlert,title:"¡Equipo creado!",text:"Si el colaborador ya existia en otro grupo, para reasignarlo primero se debera quitar donde pertenece actualmente. Ahora vas a poder observar sus rendimientos en el panel de estadísticas.",button:"Volver a equipos",handleClickButton:handleClickButton}} />
                <Alert alert={{action:guardar,type:"add",exit:exitAlert,title:"¡Equipo guardado!",text:"Ahora vas a poder observar sus rendimientos en el panel de estadísticas.",button:"Volver a equipos",handleClickButton:handleClickButton}} />
                <Alert alert={{action:eliminar,type:"remove",exit:exitAlert,title:"¡Equipo eliminado!",text:"",button:"Volver a equipos",handleClickButton:handleClickButton}} />
                <Alert alert={{action:preguntaEliminar,type:"questionRemove",exit:exitAlertQuestion,title:"¿Seguro deseas eliminar el equipo?",text:"Al continuar se eliminará los datos del equipo pero no se perderan los registros de sus actividades",button:"Eliminar equipo",handleClickButton:handleClickButtonEliminar}} />

                </StyledBigContain>
            
                </StyledDark>

            </>
    );

}