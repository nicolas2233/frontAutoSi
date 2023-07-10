import { Bar } from 'react-chartjs-2'
import React,{useState,useEffect} from 'react';
import styled from 'styled-components'

import {
  Chart as Chartjs,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler,
  BarElement
} from 'chart.js'

Chartjs.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
  Filler
)

const StyledContainer2=styled.div`
.selectContainer {
  height: 
  position: relative;
  width: 100%;
}

.selectContainer select {
  appearance: none;
  background: #F7F7F7;
  border: none;
  border-radius: 5px;
  color: #606060;
  cursor: pointer;
  font-size: 16px;
  height: 40px;
  outline: none;
  padding: 10px;
  width: 100%;
}

.selectContainer select::-ms-expand {
  display: none;
}

.selectContainer::before {
  content: '';
  position: absolute;
  top: 20px;
  right: 10px;
  border-color: #606060 transparent transparent;
  border-style: solid;
  border-width: 6px 4px 0 4px;
  height: 0;
  width: 0;
  pointer-events: none;
}

.selectContainer::after {
  content: '';
  position: absolute;
  top: 20px;
  right: 10px;
  width: 0;
  height: 0;
  border-color: #606060 transparent transparent;
  border-style: solid;
  border-width: 5px 4px 0 4px;
  pointer-events: none;
}
`;


const BarChartCargas = (data) => {
  const [selectedMonth, setSelectedMonth] = useState(''); // variable de estado para guardar el mes seleccionado
  const [datas, setDatas] = useState()
  const handleMonthChange = (event) => {
    if(event.target.value===""){
      setSelectedMonth(event.target.value);
    }else{
      const mesSelcted=Number(event.target.value)+1
      setSelectedMonth(mesSelcted.toString());
    }
  };
  const o = Object.values(data);
 // const nombre=Object.values(data.name)
  const meses=["enero","febrero","marzo","abril","mayo","junio","julio","agosto","septiembre","octubre","noviembre","diciembre"]
  
  let chartLabels = o[0].cargas.data.map((item) => (meses[item.mes-1]));
  let chartLabelscargas= o[0].cargas.data.map((item) => (meses[item.mes-1]));
  let chartLabelscontratos = o[0].contratos.data.map((item) => (meses[item.mes-1]));
  let chartLabelseventos = o[0].eventos.data.map((item) => (meses[item.mes-1]));

  let chartLabels1 = chartLabelscargas
  .concat(chartLabelscontratos)
  .concat(chartLabelseventos)
  .filter((value, index, self) => self.indexOf(value) === index); // Eliminar etiquetas duplicadas

  let chartDataCargas = o[0].cargas.data.map((item) =>
    item.contratos.reduce((a, b) => a + b, 0)
  );
  let chartDataContratos = o[0].contratos.data.map((item) =>
    item.contratos.reduce((a, b) => a + b, 0)
  );
  let chartDataEventos = o[0].eventos.data.map((item) =>
    item.contratos.reduce((a, b) => a + b, 0)
  );
    let chartDataEventos2 = o[3].eventos.data !== undefined ? o[3].eventos.data.map((item) =>
    item.contratos.reduce((a, b) => a + b, 0)) : []

    let chartDataContratos2 = o[3].contratos.data !== undefined ? o[3].contratos.data.map((item) =>
    item.contratos.reduce((a, b) => a + b, 0)) : []

    let chartDataCargas2 = o[3].cargas.data !== undefined ? o[3].cargas.data.map((item) =>
    item.contratos.reduce((a, b) => a + b, 0)) : []

  if (selectedMonth) {
    // si se ha seleccionado un mes, mostrar solo los datos correspondientes a ese mes
    const selectedMonthDataContratos = o[0].contratos.data.find((item) => item.mes === selectedMonth);
    const selectedMonthDataCargas = o[0].cargas.data.find((item) => item.mes === selectedMonth);
    const selectedMonthDataEventos = o[0].eventos.data.find((item) => item.mes === selectedMonth);

    const selectedMonthDataContratos2 = o[3].contratos.data !== undefined ? o[3].contratos.data.find((item) => item.mes === selectedMonth) : ""
    const selectedMonthDataCargas2 = o[3].cargas.data !== undefined ? o[3].cargas.data.find((item) => item.mes === selectedMonth) : ""
    const selectedMonthDataEventos2 = o[3].eventos.data !== undefined ? o[3].eventos.data.find((item) => item.mes === selectedMonth) : ""
    

    if(selectedMonthDataContratos2===""||selectedMonthDataCargas2===""||selectedMonthDataEventos2===""){
      chartLabels = [...new Set([...selectedMonthDataContratos.dias, ...selectedMonthDataCargas.dias, ...selectedMonthDataEventos.dias])].sort((a, b) => a - b);
    }else{
      chartLabels = [...new Set([...selectedMonthDataContratos.dias, ...selectedMonthDataCargas.dias, ...selectedMonthDataEventos.dias, ...selectedMonthDataCargas2.dias, ...selectedMonthDataContratos2.dias, ...selectedMonthDataEventos2.dias])].sort((a, b) => a - b);
    }
    //Array.from(new Set([...selectedMonthDataContratos.dias, ...selectedMonthDataCargas.dias, ...selectedMonthDataEventos.dias]))
    chartDataCargas = selectedMonthDataCargas.contratos;
    chartDataContratos = selectedMonthDataContratos.contratos;
    chartDataEventos = selectedMonthDataEventos.contratos;

    chartDataCargas2 = selectedMonthDataCargas2.contratos;
    chartDataContratos2 = selectedMonthDataContratos2.contratos;
    chartDataEventos2 = selectedMonthDataEventos2.contratos;
  }
  const todos= {
    labels: chartLabels,
    datasets: [
      {
        label:"Contactos",
        backgroundColor: 'rgba(237,13,13,0.4)',
        borderColor: 'rgba(237,13,13,1)',
        borderWidth: 1,
        hoverBackgroundColor: 'rgba(237,13,13,0.6)',
        hoverBorderColor: 'rgba(237,13,13,1)',
        data: chartDataCargas
      },
      
      {
        label:"Contratos",
        backgroundColor: 'rgba(255,236,36,0.4)',
        borderColor: 'rgba(255,236,36,1)',
        borderWidth: 1,
        hoverBackgroundColor: 'rgba(255,236,36,0.6)',
        hoverBorderColor: 'rgba(255,236,36,1)',
        data: chartDataContratos
      },
      {
        label:"Eventos",
        backgroundColor: 'rgba(23,189,38,0.4)',
        borderColor: 'rgba(23,189,38,1)',
        borderWidth: 1,
        hoverBackgroundColor: 'rgba(23,189,38,0.6)',
        hoverBorderColor: 'rgba(23,189,38,1)',
        data: chartDataEventos
      },
    ],
  }
  


  function getRandomColor() {
    // Generar valores aleatorios para los componentes rojo, verde y azul
    const red = Math.floor(Math.random() * 256);
    const green = Math.floor(Math.random() * 256);
    const blue = Math.floor(Math.random() * 256);
  
    // Generar un valor aleatorio para la opacidad (alfa)
    const alpha = Math.random().toFixed(1); // Limitar el número decimal a 1 dígito
  
    // Construir el string de color RGBA
    const color = `rgba(${red},${green},${blue},${alpha})`;
  
    return color;
  }
const e2={
  label:o[4],
  backgroundColor: 'rgba(28,289,48,0.4)',
  borderColor: 'rgba(28,289,48,1)',
  borderWidth: 1,
  hoverBackgroundColor: 'rgba(28,289,48,0.6)',
  hoverBorderColor: 'rgba(28,289,48,1)',
  data: chartDataEventos2
}
const e1 =
  {
    label:o[2],
        backgroundColor: 'rgba(23,189,38,0.4)',
        borderColor: 'rgba(23,189,38,1)',
        borderWidth: 1,
        hoverBackgroundColor: 'rgba(23,189,38,0.6)',
        hoverBorderColor: 'rgba(23,189,38,1)',
        data: chartDataEventos
  }
  const c2={
    label:o[4],
    backgroundColor: 'rgba(150,50,10,0.4)',
    borderColor: 'rgba(150,50,10,1)',
    borderWidth: 1,
    hoverBackgroundColor: 'rgba(150,50,10,0.6)',
    hoverBorderColor: 'rgba(150,50,10,1)',
    data: chartDataCargas2
  }
  const c1 =
    {
      label:o[2],
      backgroundColor: 'rgba(237,13,13,0.4)',
      borderColor: 'rgba(237,13,13,1)',
      borderWidth: 1,
      hoverBackgroundColor: 'rgba(237,13,13,0.6)',
      hoverBorderColor: 'rgba(237,13,13,1)',
      data: chartDataCargas
    }
    const con2={
      label:o[4],
      backgroundColor: 'rgba(255,136,48,0.4)',
      borderColor: 'rgba(255,136,48,1)',
      borderWidth: 1,
      hoverBackgroundColor: 'rgba(255,136,48,0.6)',
      hoverBorderColor: 'rgba(255,136,48,1)',
      data: chartDataContratos2
    }
    const con1 =
      {
        label:o[2],
        backgroundColor: 'rgba(255,236,36,0.4)',
        borderColor: 'rgba(255,236,36,1)',
        borderWidth: 1,
        hoverBackgroundColor: 'rgba(255,236,36,0.6)',
        hoverBorderColor: 'rgba(255,236,36,1)',
        data: chartDataContratos
      }
const arr =(m1,m2)=>{
if (m2.label==="grupos") {
  return [m1]
}else{
  return[m1,m2]
}
}

  const eventos= {
    labels: chartLabels,
    datasets:arr(e1,e2)
  }
 const contratos= {
    labels: chartLabels,
    datasets: arr(con1,con2)
  }
  const cargas= {
    labels: chartLabels,
    datasets:arr(c1,c2),
  }
  const options = {
    responsive: true,
    plugins: {
        title: {
          display: true,
          text: "Contactos"
        }
      }
  };
  const options2 = {
    responsive: true,
    plugins: {
        title: {
          display: true,
          text: "Eventos"
        }
      }
  };
  const options3 = {
    responsive: true,
    plugins: {
        title: {
          display: true,
          text: "Contratos"
        }
      }
  };
  const options4 = {
    responsive: true,
    plugins: {
        title: {
          display: true,
          text: o[2]
        }
      }
  };
  return (
    <div>
      
 <StyledContainer2>
    <label htmlFor="select-month">Selecciona un mes:</label>
    <div className='selectContainer'>
      <select id="select-month" onChange={handleMonthChange}>
        <option value="">Todos los meses</option>
        {chartLabels1.map((item, index) => (
          <option key={index} value={index}>
            {item}
        {/* {o[0].eventos.data.map((item) => (
          <option key={item.mes} value={item.mes}>
            {meses[item.mes-1]} */}
          </option>
        ))}
      </select>
      </div>
 </StyledContainer2>
     
     {
      o[1]==="opcion2"?<>
    <Bar style={{widh:"400px", height:"329px"}}  data={cargas} options={options} />
    <Bar style={{widh:"400px", height:"329px"}}  data={contratos} options={options3} />
    <Bar style={{widh:"400px", height:"329px"}}  data={eventos} options={options2} />
      </>:<>
      <Bar style={{widh:"400px", height:"329px"}}  data={todos} options={options4} />
      </>
     }

    
    </div>
  );
};

export default BarChartCargas;