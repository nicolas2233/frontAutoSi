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


const BarChartContratos = (data) => {
  const [selectedMonth, setSelectedMonth] = useState(''); // variable de estado para guardar el mes seleccionado

  const handleMonthChange = (event) => {
    setSelectedMonth(event.target.value);
  };

  var a= new Object(data);
  const o = Object.values(a);
  let chartLabels = o[0].data.map((item) => item.mes);
  let chartData = o[0].data.map((item) =>
    item.contratos.reduce((a, b) => a + b, 0)
  );

  if (selectedMonth) {
    // si se ha seleccionado un mes, mostrar solo los datos correspondientes a ese mes
    const selectedMonthData = o[0].data.find((item) => item.mes === selectedMonth);
    chartLabels = selectedMonthData.dias;
    chartData = selectedMonthData.contratos;
  }
 const chardata= {
    labels: chartLabels,
    datasets: [
      {
        label: 'Contratos por mes',
        backgroundColor: 'rgba(75,192,192,0.4)',
        borderColor: 'rgba(75,192,192,1)',
        borderWidth: 1,
        hoverBackgroundColor: 'rgba(75,192,192,0.6)',
        hoverBorderColor: 'rgba(75,192,192,1)',
        data: chartData
      },
    ],
  }

  const options = {
    scales: {
      yAxes: [
        {
          ticks: {
            beginAtZero: true,
          },
        },
      ],
    },
  };
  return (
    <div>
      
    <label htmlFor="select-month">Selecciona un mes:</label>
    <StyledContainer2>
    <div className='selectContainer'>
      <select id="select-month" onChange={handleMonthChange}>
        <option value="">Todos los meses</option>
        {o[0].data.map((item) => (
          <option key={item.mes} value={item.mes}>
            {item.mes}
          </option>
        ))}
      </select>
      </div>
    </StyledContainer2>
     
    <Bar style={{widh:"658px", height:"329px"}}  data={chardata} options={options} />
    </div>
  );
};

export default BarChartContratos;