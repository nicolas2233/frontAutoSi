import React, { useContext, useEffect, useState } from "react";
import GlobalContext from "../../calendari/context/GlobalContext";
import Select from '../Select';
import { fetchUtil } from '../../util/fetchUtil';
import {  useSelector } from 'react-redux/es/exports';
import { Url} from '../../util/rutas'
import '../../calendari/components/event.css'
const labelsClasses = [
  "indigo",
  "gray",
  "green",
  "blue",
  "red",
  "purple",
];

export default function EventModal() {
  let api= fetchUtil();
  let url=Url('events')
  const stateLogin= useSelector(stateLogin=>stateLogin)

  const {
    setShowEventModal,
    daySelected,
    dispatchCalEvent,
    selectedEvent,
    dataClientes,
    //count,
    //setCount
  } = useContext(GlobalContext);
  const [miembro,setMiembro]=useState(selectedEvent ? selectedEvent.title : "")
  const [buscador,setBuscador]=useState([])

  const [title, setTitle] = useState(
    selectedEvent ? selectedEvent.title : ""
  );
  const [description, setDescription] = useState(
    selectedEvent ? selectedEvent.description : ""
  );
  const [selectedLabel] = useState(
    selectedEvent
      ? labelsClasses.find((lbl) => lbl === selectedEvent.label)
      : 'blue'
  );
  const handleSelectMiembro=(e)=>{
    let valore=e.value
  
    setMiembro(valore)
    setTitle(e.value)
    } 
   
    useEffect(()=>{
      let names=[]
      dataClientes.forEach(element => {
          names.push(element.cliente.nombre+', '+element.cliente.apellido+' ; '+element.telefono)
      });
      setBuscador(names)
  },[dataClientes])
  function handleSubmit(e) {
    e.preventDefault();
    if(miembro===''|| !description.evento){
        alert('Los datos ingresados estan incompletos')
    }else{
      let idCliente;
      let agarro=dataClientes.filter(element=>(element.cliente.nombre+', '+element.cliente.apellido+' ; '+element.telefono)===title)              
      idCliente=agarro[0].id
       
      const calendarEvent = {
        title,
        description,
        label: selectedLabel,
        day: daySelected.valueOf(),
        id: selectedEvent ? selectedEvent.id : Date.now(),
      };
  
      let objectEvent={
        clienteId:idCliente,
        hora:description.hora?description.hora:"10",
        nota:description.nota,
        tipo:description.evento,
        dia: daySelected.format('DD/MM/YYYY'),
      }
      
      if (selectedEvent) {
        dispatchCalEvent({ type: "update", payload: calendarEvent });
      } else {
/*         dispatchCalEvent({ type: "push", payload: calendarEvent });
 */      }
      api.post(url,{body:objectEvent,headers:
        {"Content-Type":"application/json",
            "x-access-token":stateLogin.login.user.token,
            "Accept":"*/*",
            "Accept-Encoding":"gzip, deflate, br"
         }
    }).then(res=>{
       console.log(res)
        
        }) 
    
      setShowEventModal(false);
    }
   
  }

  return (
    <div className="h-screen w-full fixed left-0 top-0 flex justify-center items-center containerEvent">
      <form className="bg-white rounded-lg shadow-2xl w-1/4">
        <header className="bg-gray-100 px-4 py-2 flex justify-between items-center containerHeader">
          <span className="dale">
          Crear Evento
          </span>
       
          <div>
            {selectedEvent && (
              <span
                onClick={() => {
                  let idCliente;
                  let agarro=dataClientes.filter(element=>(element.cliente.nombre+', '+element.cliente.apellido+' ; '+element.telefono)===title)              
                  idCliente=agarro[0].id
                  api.del(url,{body:{id:description.idEvento,clienteId:idCliente.toString()},headers:
                    {"Content-Type":"application/json",
                        "x-access-token":stateLogin.login.user.token,
                        "Accept":"*/*",
                        "Accept-Encoding":"gzip, deflate, br"
                     }
                }).then(res=>{
                    
                    }) 
                  dispatchCalEvent({
                    type: "delete",
                    payload: selectedEvent,
                  });
                  setShowEventModal(false);
                }}
                className="material-icons-outlined text-gray-400 cursor-pointer"
              >
                delete
              </span>
            )}
            <button onClick={() => setShowEventModal(false)}>
              <span className="material-icons-outlined text-gray-400">
                close
              </span>
            </button>
          </div>
        </header>
        <div className="containHora">
          <div ><p className="pal">Día<span>*</span></p><p className="pal">{daySelected.format('YYYY/MM/DD')}</p></div>
          <div><p className="pal">Hora<span>*</span></p>
          <select disabled={selectedEvent ? true:false } value={description.hora?description.hora:'10'} onChange={(e)=>setDescription({...description,hora:e.target.value})}>
            <option value={8}>8 AM</option>
            <option value={9}>9 AM</option>
            <option value={10}>10 AM</option>
            <option value={11}>11 AM</option>
            <option value={12}>12 AM</option>
            <option value={13}>13 PM</option>
            <option value={14}>14 PM</option>
            <option value={15}>15 PM</option>
            <option value={16}>16 PM </option>
            <option value={17}>17 PM</option>
            <option value={18}>18 PM</option>
            <option value={19}>19 PM</option>
            <option value={20}>20 PM</option>
            <option value={21}>21 PM</option>
            </select></div>
        </div>
        <div className="containHora"><p className="pal">Tipo de Evento<span>*</span></p>
        <select disabled={selectedEvent ? true:false } value={description.evento?description.evento:'Selecciona un evento'} onChange={(e)=>setDescription({...description,evento:e.target.value})}>
            <option disabled selected>Selecciona un evento</option>
            <option value={'llamada'}>Llamada</option>
            <option value={'entrevista'}>Entrevista</option>
            <option value={'venta'}>Venta</option>
            <option value={'cobranza'}>Cobranza</option>
            <option value={'entrega'}>Entrega</option>
            </select>
            </div>
            <div className="containHora"><p className="pal">Agregar Contacto<span>*</span></p>
           </div>
          {selectedEvent ? <div className="eventSelect"><Select options={{text:miembro,value:miembro}}/></div> :
          <div className="eventSelect"><Select options={{text:"Buscar miembro",value:miembro,setValue:handleSelectMiembro,array:buscador}}/></div>
          }

            <div className="containNota">
            <label className="pal" htmlFor="opcionalNota">Nota(opcional)</label>
           
            {selectedEvent ? <input disabled placeholder="Recordatorio" value={description.nota} type='text' id='opcionalNota' ></input>
                  : <input placeholder="Recordatorio" type='text' id='opcionalNota' onChange={(e)=>setDescription({...description,nota:e.target.value})}></input>
              } 
            </div>
            <p className="textoNota">Se creará una notificación que te alertará unas horas antes de que empiece el evento, podrás ver todas dentro del panel de notificaciones situado en el panel izquierdo.</p>
    
        <footer className="flex justify-end border-t p-3 mt-5">
        {selectedEvent ? '':<button
            type="submit"
            onClick={handleSubmit}
            className="buttonCrear hover:bg-blue-500 px-6 py-2 text-white"
          >
            Crear Evento
          </button>}
        </footer>
      </form>
    </div>
  );
}
