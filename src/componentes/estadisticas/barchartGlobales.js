import { Bar } from 'react-chartjs-2'
import React,{useState} from 'react';
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


const BarChartGlobales = (data) => {

  const [selectedMonth, setSelectedMonth] = useState(''); // variable de estado para guardar el mes seleccionado
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
    
    let chartLabels =data.data.cargas.data.map((item) => (meses[item.mes-1]));
    let chartLabelscargas= data.data.cargas.data.map((item) => (meses[item.mes-1]));
    let chartLabelscontratos = data.data.contratos.data.map((item) => (meses[item.mes-1]));
    let chartLabelseventos = data.data.eventos.data.map((item) => (meses[item.mes-1]));
  

  let chartLabels1 = chartLabelscargas
  .concat(chartLabelscontratos)
  .concat(chartLabelseventos)
  .filter((value, index, self) => self.indexOf(value) === index); // Eliminar etiquetas duplicadas


  let chartDataCargas = data.data.cargas.data.map((item) =>
    item.contratos.reduce((a, b) => a + b, 0)
  );
  let chartDataContratos = data.data.contratos.data.map((item) =>
    item.contratos.reduce((a, b) => a + b, 0)
  );
  let chartDataEventos = data.data.eventos.data.map((item) =>
    item.contratos.reduce((a, b) => a + b, 0)
  );

  if (selectedMonth) {
    // si se ha seleccionado un mes, mostrar solo los datos correspondientes a ese mes
    const selectedMonthDataContratos = data.data.contratos.data.find((item) => item.mes === selectedMonth);
    const selectedMonthDataCargas = data.data.cargas.data.find((item) => item.mes === selectedMonth);
    const selectedMonthDataEventos = data.data.eventos.data.find((item) => item.mes === selectedMonth);
    
    chartLabels = [...new Set([...selectedMonthDataContratos.dias, ...selectedMonthDataCargas.dias, ...selectedMonthDataEventos.dias])].sort((a, b) => a - b);
    //Array.from(new Set([...selectedMonthDataContratos.dias, ...selectedMonthDataCargas.dias, ...selectedMonthDataEventos.dias]))
    chartDataCargas = selectedMonthDataCargas.contratos;
    chartDataContratos = selectedMonthDataContratos.contratos;
    chartDataEventos = selectedMonthDataEventos.contratos;
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
  const cargas= {
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
    ],
  }
  const eventos= {
    labels: chartLabels,
    datasets: [
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
 const contratos= {
    labels: chartLabels,
    datasets: [      
      {
        label:"Contratos",
        backgroundColor: 'rgba(255,236,36,0.4)',
        borderColor: 'rgba(255,236,36,1)',
        borderWidth: 1,
        hoverBackgroundColor: 'rgba(255,236,36,0.6)',
        hoverBorderColor: 'rgba(255,236,36,1)',
        data: chartDataContratos
      },
    ],
  }
  const options = {
    responsive: true,
    plugins: {
        title: {
          display: true,
          text: "Chart"
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
    <Bar style={{widh:"400px", height:"329px"}}  data={contratos} options={options} />
    <Bar style={{widh:"400px", height:"329px"}}  data={eventos} options={options} />
      </>:<>
      <Bar style={{widh:"400px", height:"329px"}}  data={todos} options={options} />
      </>
     }

    
    </div>
  );
};

export default BarChartGlobales;