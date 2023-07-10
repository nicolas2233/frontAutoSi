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
.buttonsEdit{
            display:flex;
            justify-content:space-between;
            align-items:center;
            div{
                margin:0px;
                width:100px;
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
        .passwords{
            img{
                top:calc(35% - 7px) !important
            }
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
        .restaurar{
            margin-top:10px;
            margin-bottom:20px;
            cursor:pointer;
            text-decoration:underline;
        }
`;
const StyledContainButton=styled.div`
   width:145px;
   margin:0px;
   height:54px;
   position:relative;
   left: 60%;

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

export default function FormEmpleado({formEmpleado}){
    let api= fetchUtil();
    let url=Url('auth/signup')
    const [abre,setAbre]=useState(false)
    const [object,setObject]=useState({
        id:'',
        name:"",
        lastname:"",
        email:"",
        password:"",
        dni:'',
        phone:'',
        category:"",
        createdAt:"",
        updatedAt:"",
        groupId:null
    })
 
    
  
    const stateLogin= useSelector(stateLogin=>stateLogin)
  
    const [guardado, setGuardado]=useState(false)
    const [guardar, setGuardar]=useState(false)
    const [eliminar, setEliminar]=useState(false)
    const [preguntaEliminar, setPreguntaEliminar]=useState(false)
    const [pwrong,setPWrong]=useState(false);
    const [errorForm,setErrorForm]=useState('');
    const [isEdit,setIsEdit]=useState(false)
    const [loading,setLoading]=useState(false)
    const [restaurarContra,setRestaurarContra]=useState(false)
    const formMove=useRef()
    const alertDark=useRef()
    useEffect(()=>{
        if(formEmpleado.edit){
            setObject(formEmpleado.empleado)
        }
    },[])
    const handleChange=(e)=>{
        setObject(prev=>({...prev,[e.target.name]:e.target.value}))
        }
    const handleSelect=(e)=>{
        let normalizar=e.value;
        if(normalizar==='Vendedor JR'){
            setObject(prev=>({...prev,category:'jr'}))

        }else if(normalizar==='Vendedor Sr'){
            setObject(prev=>({...prev,category:'sr'}))
        }else if(normalizar==='Jefe de equipo'){
            setObject(prev=>({...prev,category:'Jefe de equipo'}))
        }else{
            setObject(prev=>({...prev,category:'gerente'}))
        }
            }  
    //CREAR EMPLEADO
    const agregarEmpleado=()=>{
        
        let objectPost={
            name:object.name,
            lastname:object.lastname,
            email:object.email,
            password:object.password,
            dni:object.dni,
            phone:object.phone,
            category:object.category,
            gerente:stateLogin.login.user.vendors.id.toString()
        }
        let numbers=/^[0-9]+$/;
        let regrets=/^([a-zA-Z0-9_\-\.]+)@[a-z0-9-]+(\.[a-z0-9-]+)*(\.[a-z]{2,3})$/g;
        let regexp_password = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[A-Za-z\d$@$!%*?&]{6,15}/;
        if(object.name=="" || object.lastname=="" || object.email=="" || object.password=="" ||object.dni=="" || object.phone=="" || object.category==""){
            setPWrong(true)
            setErrorForm('Todos los datos son obligatorios') 
        }else if(!regrets.test(object.email)){
            setPWrong(true)
            setErrorForm("Por favor, introduce un correo electrónico valido.")
        }else if(!regexp_password.test(object.password)){
            setPWrong(true)
            setErrorForm("La contraseña debe contener al menos un número, una letra mayúscula, una minuscula y 6 caracteres")
        } else if(!numbers.test(object.dni)|| object.dni.length<7|| object.dni.length>8){
            setPWrong(true)
            setErrorForm("El dni debe contener al menos 7 digitos y solo números")
        }else if(!numbers.test(object.phone)|| object.phone.length<6|| object.phone.length>12){
            setPWrong(true)
            setErrorForm("El telefóno debe contener solo números y ser válido")
        }else{
            setPWrong(false)
            setLoading(true)
            api.post(url,{body:objectPost,headers: {"Content-Type":"application/json",
            "x-access-token":stateLogin.login.user.token,
            "Accept":"*/*",
            "Accept-Encoding":"gzip, deflate, br"
         }}).then(res=>{
                setLoading(false)
                if(!res.message){
                     setGuardado(true)                   
                 }else{
                    setPWrong(true)
                    setErrorForm("Ya existe un usuario registrado con ese email")
                 }
                
                }) 
        }
           

        
       
      
    }
    //GUARDAR EMPLEADO//editar
      const guardarEmpleado=()=>{
       
       
            
        let objectPut={
            id:object.id,
            name:object.name,
            lastname:object.lastname,
            email:object.email,
            password:object.password,
            dni:object.dni,
            phone:object.phone,
            category:object.category
        }
          
            if(object.category==='Vendedor JR'||object.category==='jr'){
                objectPut.category='jr'
                
    
            }else if(object.category==='Vendedor Sr' ||object.category==='sr'){
                objectPut.category='sr'

            }else if(object.category==='Jefe de equipo'){
                objectPut.category='Jefe de equipo'

            }else{
                objectPut.category='gerente'
            }
  
        let url2=Url('vendors/update')

        let numbers=/^[0-9]+$/;
        let regrets=/^([a-zA-Z0-9_\-\.]+)@[a-z0-9-]+(\.[a-z0-9-]+)*(\.[a-z]{2,3})$/g;
        let regexp_password = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[A-Za-z\d$@$!%*?&]{6,15}/;
        if(object.name=="" || object.lastname=="" || object.email=="" || object.password=="" ||object.dni=="" || object.phone=="" || object.category==""){
            setPWrong(true)
            setErrorForm('Todos los datos son obligatorios') 
        }else if(!regrets.test(object.email)){
            setPWrong(true)
            setErrorForm("Por favor, introduce un correo electrónico valido.")
        } else if(!numbers.test(object.phone)|| object.phone.length<6|| object.phone.length>12){
            setPWrong(true)
            setErrorForm("El telefóno debe contener solo números y ser válido")
        }else if(!regexp_password.test(object.password)){
            if(object.password===null){
                setPWrong(false)
                setLoading(true)
                console.log(objectPut)
                api.put(url2,{body:objectPut,headers:{"Content-Type":"application/json"}}).then(res=>{
                    if(!res.message){
                        setLoading(false)
                        setGuardar(true) 
                        setRestaurarContra(false)
                     }else{
                        setPWrong(true)
                        setLoading(false)

                        setErrorForm(res.message)
                     }
                    })
                    

            }
            else{
                setPWrong(true)
                setErrorForm("La contraseña debe contener al menos un número, una letra mayúscula, una minuscula y 6 caracteres")
            }   
        }else{
            setPWrong(false)
            setLoading(true)
            console.log(objectPut)

            api.put(url2,{body:objectPut,headers:{"Content-Type":"application/json"}}).then(res=>{
                if(!res.message){
                    setLoading(false)
                    setGuardar(true) 
                    setRestaurarContra(false)
                 }
                else{
                    setLoading(false)
                    setPWrong(true)
                    setErrorForm(res.message)
                }})
        }
       
       
        
       
        
    }
     //ELIMINAR EMPLEADO
     const eliminarEmpleado=()=>{
        setPreguntaEliminar(true)
        setRestaurarContra(false)

    }
    //SALIR DE GUARDADO
    const exitAlert=()=>{
        setGuardado(false)
        setGuardar(false)
        setEliminar(false)
        setPreguntaEliminar(false)
        formEmpleado.recargar()
        formEmpleado.exit()
        setPWrong(false)

    }
    const exitAlertQuestion=()=>{
        setPreguntaEliminar(false)
    }
    const handleClickButton=()=>{
        setGuardado(false)
        setEliminar(false)
        setGuardar(false)
        formEmpleado.recargar()
        formEmpleado.exit()
        setPWrong(false)
    }
    const handleClickButtonEliminar=()=>{
      
        let url3=Url('vendors')
        let objectId={
            id:object.id,
        }
        api.del(url3,{body:objectId,headers:{"Content-Type":"application/json"}}).then(res=>{
            if(res.message!=="el vendedor es lider de un grupo"){
                
                setPreguntaEliminar(false)
                setEliminar(true)
                 console.log('aca')
             }else{
                setPreguntaEliminar(false)
                setPWrong(true)
                setErrorForm('No es posible eliminarlo ya que es lider de un equipo. Primero cambia de lider')
                console.log('error')

            }
            }) 
       
    }
    // salir form 
    const exitFormulario=()=>{
        setRestaurarContra(false)
        formEmpleado.exit()
        setPWrong(false)
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
    },500)
    }

    //acionar
    useEffect(()=>{
        if(formEmpleado.action){
            setAbre(true)
            moveUp()
        }else if(formEmpleado.action===false){
            setAbre(false)
            moveDown()
        }
        if(formEmpleado.edit){
            setIsEdit(true)
        }else{
           
            setIsEdit(false)
       
        }

    })
    useEffect(()=>{
        if(formEmpleado.edit){
            setObject(formEmpleado.empleado)
            setObject(prev=>({...prev,password:null}))
            
        }else{    
            setObject({
                id:'',
                name:"",
                lastname:"",
                email:"",
                password:"",
                dni:'',
                phone:'',
                category:"",
                createdAt:"",
                updatedAt:"",
                groupId:null
            })
        }

    },[formEmpleado])
   
    const restaurarContraseña =()=>{
        setRestaurarContra(true)
        setObject(prev=>({...prev,password:''}))
    }
   

    return(
            <>
                <StyledDark ref={alertDark} >
                <StyledBigContain ref={formMove}>
                        <div className='contactoHeader'>
                                 <h4>{isEdit?'Editar colaborador':'Agregar Colaborador'}</h4>
                                 <img onClick={()=>exitFormulario()} src={Union} alt="Exit"/>
                        </div>
                    
                        <div className='datosContain'>
                        <div className='names'>
                             <div>
                                <label>Nombre<span >*</span></label>
                                {isEdit? <Input  input={{disabled:false,value:object.name,name:"name",type:"text",setValue:handleChange}}></Input>:<Input  input={{disabled:false,value:object.name,name:"name",type:"text",setValue:handleChange}}></Input>}
                        </div>
                        <div>
                              <label>Apellido<span >*</span></label>
                              {isEdit?<Input input={{disabled:true,value:object.lastname,name:"lastname",type:"text",setValue:handleChange}}></Input>:<Input input={{disabled:false,value:object.lastname,name:"lastname",type:"text",setValue:handleChange}}></Input>}
                            </div>
                         </div>
                                <label>DNI <span >*</span></label>
                                 {isEdit?<Input input={{disabled:true,value:object.dni,name:"dni",type:"text",setValue:handleChange}}></Input>:<Input input={{disabled:false,value:object.dni,name:"dni",type:"text",setValue:handleChange}}></Input>}
                                <label>Teléfono <span >*</span></label>
                                 <Input input={{disabled:false,value:object.phone,name:"phone",type:"text",setValue:handleChange}}></Input>
                                <label>Rol <span >*</span></label>
                               {abre?<Select  options={{text:object.category?formEmpleado.empleado.category:'',value:object.category,setValue:handleSelect,array:stateLogin.login.user?stateLogin.login.user.vendors.category=='5'?["Vendedor JR","Vendedor Sr","Jefe de equipo","Gerente"]:["Vendedor JR","Vendedor Sr","Jefe de equipo"]:["Vendedor JR","Vendedor Sr","Jefe de equipo"]}}/>:''}
                                <label>Email <span >*</span></label>
                                 <Input input={{disabled:false,value:object.email,name:"email",type:"text",setValue:handleChange}}></Input>
                                
                                 {isEdit && !restaurarContra ? <p className='restaurar' onClick={()=>restaurarContraseña()}>¿Deseas restaurar la contraseña?  </p>: <><label>Contraseña <span >*</span></label>
                                 
                                 <span className='passwords'><Input input={{disabled:false,value:object.password,name:"password",type:"password",setValue:handleChange}}>
                                 </Input></span></>}

                                 
                                 {pwrong?<div className='errorForm'>{errorForm}</div>:""}
                                 {
                            loading?<div className='loading'><img  src={spinner}/></div>:''
                        }   
                        <div className='containButtons'>
                        {isEdit?        <div className='buttonsEdit'>        <div onClick={eliminarEmpleado} className='eliminarEmpleado'><Button  text="Eliminar"></Button></div>
                                                                <div onClick={guardarEmpleado}><Button   text="Guardar"></Button></div>
                             </div>    :                       <StyledContainButton onClick={agregarEmpleado} ><MdPersonAddAlt/><Button   text="Agregar"></Button></StyledContainButton>
 }    
                        
                        </div>
                </div>        
                <Alert alert={{action:guardado,type:"add",exit:exitAlert,title:"¡Agregado!",text:"Ahora podés ver al colaborador en tu lista  y realizar acciones como: eliminarlo, cargar datos y editarlo en caso de ser necesario.",button:"Volver a lista general",handleClickButton:handleClickButton}} />
                <Alert alert={{action:guardar,type:"add",exit:exitAlert,title:"¡Guardado!",text:"Ahora podés ver al colaborador en tu lista  y realizar acciones como: eliminarlo, cargar datos y editarlo en caso de ser necesario.",button:"Volver a lista general",handleClickButton:handleClickButton}} />
                <Alert alert={{action:eliminar,type:"remove",exit:exitAlert,title:"¡Eliminado!",text:"",button:"Volver a lista general",handleClickButton:handleClickButton}} />
                <Alert alert={{action:preguntaEliminar,type:"questionRemove",exit:exitAlertQuestion,title:"¿Seguro deseas eliminar?",text:"Al continuar se eliminará los datos del colaborador pero no se perderan los registros de sus actividades",button:"Eliminar",handleClickButton:handleClickButtonEliminar}} />

                </StyledBigContain>
                
                </StyledDark>

            </>
    );

}