import React, { useEffect, useState, useMemo, useCallback } from 'react';
import search from '../../img/search.svg';
import styled from 'styled-components'
import { Url } from '../../util/rutas';
import { useDispatch, useSelector} from 'react-redux/es/exports';
import { fetchUtil } from '../../util/fetchUtil';
import _ from 'lodash';
const StyledInput=styled.div`
.a{
border: 1px solid rgba(0,0,0,0.2);
border-radius: 8px;
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
}



{
    padding-left:5px;
    border-bottom:0;
    color: rgb(96, 96, 96);
    
}
label{
    margin-right:15px;
    background-image:url(${search});
    background-size:contain;
}

.selected-option{
    border: 1px solid rgba(0,0,0,0.2);
    border-radius: 8px;
    background: #FD7022;
    color: rgb(96, 96, 96);
    font-size:14px;
    margin:3px;
    padding:4px;
}
.selected-conteiner{
margin-top: 5px;
}
.selected-boton{
    font-size:16px;
    margin-left:6px;
    color: black;
}
`
const SearchBar = ({addVendor}) => {
 
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedOptions, setSelectedOptions] = useState([]);
  const [ vendedors, setVendedors] = useState([]);
  let urlVendors= Url('vendors')
  let api= fetchUtil()
  const stateLogin= useSelector(stateLogin=>stateLogin)

const  apiVendors=async()=>{
    const responseVendedores = await api.get(urlVendors,
    {headers:{"Content-Type":"application/json",
    "x-access-token":stateLogin.login.user.token,
    "Accept":"*/*",
    "Accept-Encoding":"gzip, deflate, br"
 }})
 setVendedors(responseVendedores)
}
  
  const handleInputChange = (event) => {
    setSearchTerm(event.target.value);
  };
  
  const handleOptionSelect = (option) => {
      setSelectedOptions([...selectedOptions, option]);
    setSearchTerm('');
  };
   

  const handleOptionDelete = (option) => {
    setSelectedOptions(selectedOptions.filter(item => JSON.stringify(item) !== JSON.stringify(option)));
  };

  const filteredOptions = vendedors.map(e=>e.name).filter(option =>
    option.toLowerCase().includes(searchTerm.toLowerCase())
  ).slice(0, 3);

  useEffect(()=>{
    apiVendors()

  },[])
  useEffect(() => {
      addVendor(selectedOptions);
  }, [addVendor, selectedOptions]);


  return (
    <StyledInput>
      <input placeholder='Buscar' className='a' type="text" value={searchTerm} onChange={handleInputChange} />
      {searchTerm && filteredOptions.length > 0 && (
        <ul>
{filteredOptions.map((option, index) => (
  <li key={index} onClick={() => handleOptionSelect(vendedors.find(v => v.name === option))}>{option}</li>
))}
        </ul>
      )}
      <div className='selected-conteiner'>
        {selectedOptions.map(option => (
  <span key={option.name} className='selected-option'>
    {option.name}
    <button className='selected-boton' onClick={() => handleOptionDelete(option)}>x</button>
  </span>
))}
      </div>
    </StyledInput>
  );
};

export default SearchBar;


