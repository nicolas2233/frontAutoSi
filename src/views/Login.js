import './../App.css';
import Input from './../componentes/Input';
import React,{useEffect, useState} from 'react';
import Button from '../componentes/Button';
import styled from 'styled-components'
import logo from './../img/logoLogin.svg'
import car from './../img/car.jpg'
import { useDispatch, useSelector } from 'react-redux/es/exports';
import { Navigate,useNavigate} from 'react-router-dom';
import Loading from '../img/loading.gif'
import { fetchUtil } from '../util/fetchUtil';
import { get_login } from "../store/slices/loginSlice";
import { get_group } from "../store/slices/groupSlice";

// STYLES 
const StyledLogin=styled.div`
      display:flex;
      .loading{
          width:50vw;
          height:100vh;
          object-fit:cover;
          @media all and (max-width:800px){
            width:100vw;
          }
      }
      
`;
const StyledForm=styled.form`
      width: 372px;
      height:auto;
      margin-top:15vh;
      margin-bottom:50px;
      padding:10px;
      display:flex;
      flex-direction:column;
      @media all and (max-width:600px){
        margin-top:10vh;
      }
      
`;
const StyledContainerForm=styled.div`
      width: 50%;
      margin:0;
      @media all and (max-width:800px){
        width:100%;
      }
`;
const StyledContainDiv=styled.div`
      width: 100%;
      height: 60px;
      margin-bottom:24px;
      margin-top:10px;
`;
const StyledContainButton=styled.div`
      width: 100%;
      height: 60px;
      margin-top:40px;
      
`;
const StyledLabel= styled.label`
     font-size: 16px;
     color: #606060;
     width: 100%;
`;
const StyledImg= styled.img`
     text-align:center;
     margin-bottom:60px;
`;
const StyledCar= styled.img`
     width:50%;
     
     @media all and (max-width:800px){
      display:none;
    }
    @media all and (min-height:700px){
      height:100vh;
    }
`;





function Login() {
  const stateLogin= useSelector(stateLogin=>stateLogin)
  let api= fetchUtil();
  let navigate = useNavigate();
  const [loading,setLoading]=useState(false)
  const dispatch= useDispatch()
  const [pWrongEmail,setPWrongEmail]=useState(null);
  const [pWrongPassword,setPWrongPassword]=useState(null);
  const [email,setEmail]=useState("");
  const [password,setPassword]=useState("")
  const [disabled,setDisabled]=useState(true)
  const handleSubmit=(e)=>{
    //no olvidarser enviar datos con un .trim() para eliminar espacios
        e.preventDefault();
        setPWrongEmail(null)
        setPWrongPassword(null)
        let regrets=/^([a-zA-Z0-9_\-\.]+)@[a-z0-9-]+(\.[a-z0-9-]+)*(\.[a-z]{2,3})$/g
        if(!regrets.test(email)){
            setPWrongEmail("Por favor, introduce un correo electrónico valido.")
        }else{
          dispatch(get_login({email:email,password:password}))
       
        }
        
  }
  
  const handleEmail=(e)=>{
    setEmail(e.target.value)
  }
  const handlePassword=(e)=>{
    setPassword(e.target.value)
  }
  useEffect(()=>{
            if(password.trim().length>0 && email.trim().length>0){
                  setDisabled(false)
            }
            else{
              setDisabled(true)
            }
  },[password][email]);
  useEffect(()=>{
    if(stateLogin.login.user.token==='UNLOGED'){

    }else if(stateLogin.login.user.vendors){
      if(stateLogin.login.user.vendors.groupId !== null){
       dispatch(get_group({idGroup:stateLogin.login.user.vendors.groupId}))
       setTimeout(()=>{
       navigate('/auto') 
       },200)
      }
      dispatch(get_group({idGroup:null}))
       setTimeout(()=>{
       navigate('/auto') 
       },100)
    }else if(stateLogin.login.user.token==="ERROR"){
      setPWrongPassword('Los datos ingresados son invalidos')
    }
    if(stateLogin.login.loading){
     
        setLoading(true)
     
  
    }else{
      setTimeout(()=>{
        setLoading(false)
      },2700)
    }
  },[stateLogin]);

  return (
    <StyledLogin>
    {loading?"":<StyledContainerForm>
    <StyledForm onSubmit={handleSubmit}>
            <StyledImg src={logo} alt="autosi"/>
            <br/>
            <StyledLabel htmlFor='email'>Correo electrónico</StyledLabel>
            <StyledContainDiv>
                           <Input pWrong={pWrongEmail} input={{value:email,name:"email",type:"email",setValue:handleEmail}} />
            </StyledContainDiv>
            <StyledLabel htmlFor='password'>Contraseña</StyledLabel>
             <StyledContainDiv>
                            <Input pWrong={pWrongPassword} input={{value:password,name:"password",type:"password",setValue:handlePassword}} />
            </StyledContainDiv>
             <StyledContainButton>
                             <Button disabled={disabled} text="Iniciar sesión"/> 
             </StyledContainButton>
      </StyledForm>
      </StyledContainerForm>}
      {loading?<img className='loading'src={Loading}/>:""}
      <StyledCar src={car} alt="car"/>
   
      </StyledLogin>
  );
}

export default Login;