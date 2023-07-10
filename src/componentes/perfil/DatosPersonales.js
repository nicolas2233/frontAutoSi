import React, { useState } from 'react';
import styled from 'styled-components'
import Input from '../Input';
import Button2 from '../Button2';
import { useDispatch, useSelector } from 'react-redux/es/exports';
import { fetchUtil } from '../../util/fetchUtil';
import Alert from '../Alert';
import spinner from '../../img/spinner.gif'
import {Url} from '../../util/rutas'
//STYLES 

const StyledInicio=styled.section`
    width:100%;
    height:auto;
    display:flex;
    h3{
        font-weight: 400;
        font-size: 20px;
    }
    h6{
        font-weight: 400;
        font-size: 20px;
        margin-bottom:15px;
    }
   @media all and (max-width:900px){
            flex-direction:column;
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
`;
const StyledContainer=styled.div`
    width:48%;
    height:auto;
    padding:20px;
    padding-top:10px;
    padding-right:15px;
    border-right:2px solid rgba(0,0,0,0.1);
    margin:0px;
    form{
        margin-top:20px;
        label{
            margin-top:15px;
        }
        h6{
            font-weight: 400;
            font-size: 20px;
            margin-top:-10px;
            margin-bottom:15px;
        }
    }
    @media all and (max-width:900px){
        width:100%;
        border:none;
        }
        .disabled{
            background-color:rgba(0,0,0,0.07);
            border-radius:8px;
            padding:10px;
            margin:0px;
            margin-top:10px;
            margin-bottom:15px;
            p{
                margin:0px;
                font-size:16px;
                color:#606060;
            }}
            
`;
const StyledInput=styled.div`
      width: 100%;
      height: 45px;
      margin-bottom:14px;
      margin-top:10px;
      input{
        font-size:16px;
        color: #606060;
      }
`;
const StyledContainButton=styled.div`
      width: 30%;
      height: 45px;
      margin-top:40px;
        margin:0px;
        
`;
const StyledContainButton1=styled.div`
      width: 100%;
        display:flex;
        justify-content:end;
`;

export default function DatosPersonales(){
    const stateLogin= useSelector(stateLogin=>stateLogin)
    let api= fetchUtil();
    const [email,setEmail]=useState(stateLogin.login.user.vendors.email);
    const [tel,setTel]=useState(stateLogin.login.user.vendors.phone);
    const [cambios,setCambios]=useState(true)
    const [password,setPassword]=useState("")
    const [cambiosPassword,setCambiosPassword]=useState("true")
    const [guardado, setGuardado]=useState(false)
    const [pwrong,setPWrong]=useState(false);
    const [errorForm,setErrorForm]=useState('');
    const [loading,setLoading]=useState(false)

    const handleEmail=(e)=>{
        setEmail(e.target.value)
        setCambios(false)
      }
      const handleTel=(e)=>{
        setTel(e.target.value)
        setCambios(false)
      }
      const handlePassword=(e)=>{
        setPassword(e.target.value)
        if(password!==""){
            setCambiosPassword(false)}else{
                       setCambiosPassword(true)         
            }
      }
      const editUser=()=>{
        let url=Url('vendors/update')
        let numbers=/^[0-9]+$/;
          let regrets=/^([a-zA-Z0-9_\-\.]+)@[a-z0-9-]+(\.[a-z0-9-]+)*(\.[a-z]{2,3})$/g;
        let objectPut={
            id:stateLogin.login.user.vendors.id,
            email:email,
            phone:tel,
            password:null,
            category:null,
        }
        if(objectPut.email=="" || objectPut.phone==""){
            setPWrong(true)
            setErrorForm('Todos los datos son obligatorios') 
        }else if(!regrets.test(objectPut.email)){
            setPWrong(true)
            setErrorForm("Por favor, introduce un correo electrónico valido.")
        } else if(!numbers.test(objectPut.phone)|| objectPut.phone.length<6|| objectPut.phone.length>12){
            setPWrong(true)
            setErrorForm("El telefóno debe contener solo números y ser válido")
        }else{
            setLoading(true)
            api.put(url,{body:objectPut,headers:{"Content-Type":"application/json"}}).then(res=>{
                if(!res.message){
                    setLoading(false)
                    setGuardado(true)
                 }else{
                    setPWrong(true)
                        setLoading(false)
                        setErrorForm(res.message)
                 }
                })
        }
       
      }
     
      
      
      const editPassword=()=>{
        let url=Url('vendors/update')
        let regexp_password = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[A-Za-z\d$@$!%*?&]{6,15}/;

        let objectPut={
            id:stateLogin.login.user.vendors.id,
            email:null,
            phone:null,
            password:password,
            category:null,
        }
        
             if(regexp_password.test(objectPut.password)){
                api.put(url,{body:objectPut,headers:{"Content-Type":"application/json"}}).then(res=>{
                    setLoading(true)
                    if(!res.error){
                        setLoading(false)
                        setGuardado(true)
                     }})
                 }else{
                    setLoading(false)
                    setPWrong(true)
                    setErrorForm("La contraseña debe contener al menos un número, una letra mayúscula, una minuscula y 6 caracteres")
                }   
      }
        //SALIR DE GUARDADO
    const exitAlert=()=>{
        setGuardado(false)
        setPWrong(false)

    }
    const handleClickButton=()=>{
        setGuardado(false)
        setPWrong(false)

    }
    return(
            <StyledInicio>
                                <StyledContainer>
                                <h3>{stateLogin.login.user.vendors.name+' '+stateLogin.login.user.vendors.lastname}</h3>
                                <div>
                                        <label>DNI</label>
                                        <div className="disabled">
                                             <p>{stateLogin.login.user.vendors.dni}</p>
                                        </div>
                                        <label htmlFor='email'>Mail</label>
                                        <StyledInput><Input input={{value:email,name:"email",type:"email",setValue:handleEmail}}></Input></StyledInput>
                                        <label htmlFor='tel'>Tel</label>
                                        <StyledInput><Input input={{value:tel,name:"tel",type:"text",setValue:handleTel}}></Input></StyledInput>
                                     <StyledContainButton1><StyledContainButton onClick={()=>editUser()}> <Button2 disabled={cambios} text="Guardar Cambios"></Button2></StyledContainButton></StyledContainButton1> 
                                </div>
                                <div>
                                    <h6>Cambiar contraseña</h6>
                                <label htmlFor='password'>Nueva contraseña</label>
                                        <StyledInput><Input input={{value:password,name:"password",type:"password",setValue:handlePassword}}></Input></StyledInput>
                                     <StyledContainButton1><StyledContainButton onClick={()=>editPassword()}> <Button2 disabled={cambiosPassword} text="Cambiar contraseña"></Button2></StyledContainButton></StyledContainButton1>
                                </div>
                                </StyledContainer>
                                {pwrong?<div className='errorForm'>{errorForm}</div>:""}
                                {
                                 loading?<div className='loading'><img  src={spinner}/></div>:''
                                  }   
                                <Alert alert={{action:guardado,type:"add",exit:exitAlert,title:"¡Datos guardados!",text:"Tus datos han sido guardados correctamente.",button:"Volver a mis datos",handleClickButton:handleClickButton}} />

            </StyledInicio>
    );

}