import { Bar } from 'react-chartjs-2'
import React, { useState, useEffect } from 'react';
import styled from 'styled-components'
import spinner from '../../img/spinner.gif'
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

const StyledContainer2 = styled.div`
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


const BarChartVendedores = (data) => {
  const [loading, setLoading] = useState(true)
  const [label, setLabel] = useState([])
  const [label1, setLabel1] = useState([])
  const [charCargas, setCharCargas] = useState(
    {
      labels: label,
      datasets: [
        {
          label: "Contactos",
          backgroundColor: 'rgba(237,13,13,0.4)',
          borderColor: 'rgba(237,13,13,1)',
          borderWidth: 1,
          hoverBackgroundColor: 'rgba(237,13,13,0.6)',
          hoverBorderColor: 'rgba(237,13,13,1)',
          data: []
        }]
    }
  )
  const [charCcontratos, setCharContratos] = useState(
    {
      labels: label,
      datasets: [
        {
          label: "Contactos",
          backgroundColor: 'rgba(237,13,13,0.4)',
          borderColor: 'rgba(237,13,13,1)',
          borderWidth: 1,
          hoverBackgroundColor: 'rgba(237,13,13,0.6)',
          hoverBorderColor: 'rgba(237,13,13,1)',
          data: []
        }]
    }
  )
  const [charEventos, setCharEventos] = useState(
    {
      labels: label,
      datasets: [
        {
          label: "Eventos",
          backgroundColor: 'rgba(237,13,13,0.4)',
          borderColor: 'rgba(237,13,13,1)',
          borderWidth: 1,
          hoverBackgroundColor: 'rgba(237,13,13,0.6)',
          hoverBorderColor: 'rgba(237,13,13,1)',
          data: []
        }]
    }
  )
  //const [selectedMonth, setSelectedMonth] = useState('');
  const meses = ["enero", "febrero", "marzo", "abril", "mayo", "junio", "julio", "agosto", "septiembre", "octubre", "noviembre", "diciembre"]

  const obtenerNombresMeses = () => {
    const fechaActual = new Date();
    const mesActual = fechaActual.getMonth();
    const nombresMeses = [
      'enero',
      'febrero',
      'marzo',
      'abril',
      'mayo',
      'junio',
      'julio',
      'agosto',
      'septiembre',
      'octubre',
      'noviembre',
      'diciembre'
    ];

    const nombresMesesHastaActual = nombresMeses.slice(0, mesActual + 1);

    return nombresMesesHastaActual;
  };
  const creacionLabels = (dato) => {
    const obj = Object.values(dato)
    const obj2 = obj[0]
    if (label.length !== 0) {
      let chartLabels = obj2[0].cargas.data.map((item) => (meses[item.mes - 1]));
      let chartLabelscargas = obj2[0].cargas.data.map((item) => (meses[item.mes - 1]));
      let chartLabelscontratos = obj2[0].contratos.data.map((item) => (meses[item.mes - 1]));
      let chartLabelseventos = obj2[0].eventos.data.map((item) => (meses[item.mes - 1]));

      let chartLabels1 = chartLabelscargas
        .concat(chartLabelscontratos)
        .concat(chartLabelseventos)
        .filter((value, index, self) => self.indexOf(value) === index);

      setLabel(chartLabels)
      setLabel1(chartLabels1)
    }
  }
  const creacionGrafico = (datos, nombre) => {
    const objetoDatos = Object.values(datos)
    const carga = objetoDatos[0]
    const contra = objetoDatos[1]
    const event = objetoDatos[2]
    const nom = objetoDatos[3]
    console.log("nombreeeeeeeeeeeee", nom[1].length)
    if (nom[1].length === 1) {
      const cargas = {
        labels: obtenerNombresMeses(),
        datasets: [
          {
            label: nombre,
            backgroundColor: 'rgba(237,13,13,0.4)',
            borderColor: 'rgba(237,13,13,1)',
            borderWidth: 1,
            hoverBackgroundColor: 'rgba(237,13,13,0.6)',
            hoverBorderColor: 'rgba(237,13,13,1)',
            data: carga
          }]
      }
      const contratos = {
        labels: obtenerNombresMeses(),
        datasets: [
          {
            label: nombre,
            backgroundColor: 'rgba(28,289,48,0.4)',
            borderColor: 'rgba(28,289,48,1)',
            borderWidth: 1,
            hoverBackgroundColor: 'rgba(28,289,48,0.6)',
            hoverBorderColor: 'rgba(28,289,48,1)',
            data: contra
          }]
      }
      const eventos = {
        labels: obtenerNombresMeses(),
        datasets: [
          {
            label: nombre,
            backgroundColor: 'rgba(23,189,38,0.4)',
            borderColor: 'rgba(23,189,38,1)',
            borderWidth: 1,
            hoverBackgroundColor: 'rgba(23,189,38,0.6)',
            hoverBorderColor: 'rgba(23,189,38,1)',
            data: event
          }]
      }
      // setLoading(true)
      setCharCargas(cargas)
      setCharContratos(contratos)
      setCharEventos(eventos)

    } else {

      const multiplesdatoscargas = []
      const multiplesdatoscontratos = []
      const multiplesdatoseventos = []
      for (let i = 0; i < nom.length; i++) {
        const red = Math.floor(Math.random() * 256);
        const green = Math.floor(Math.random() * 256);
        const blue = Math.floor(Math.random() * 256);
        const newObjetocarga = {
          label: nom[i],
          backgroundColor: i === 0 ? 'rgba(237,13,13,0.4)' : `rgba(237,${green},${blue},0.4)`,
          borderColor: i === 0 ? 'rgba(237,13,13,1)' : `rgba(237,${green},${blue},1)`,
          borderWidth: 1,
          hoverBackgroundColor: i === 0 ? 'rgba(237,13,13,0.6)' : `rgba(237,${green},${blue},0.6)`,
          hoverBorderColor: i === 0 ? 'rgba(237,13,13,1)' : `rgba(237,${green},${blue},1)`,
          data: carga[i]
        }
        const newObjetocontrato = {
          label: nom[i],
          backgroundColor: i === 0 ? 'rgba(28,289,48,0.4)' : `rgba(28,${green},${blue},0.4)`,
          borderColor: i === 0 ? 'rgba(28,289,48,1)' : `rgba(28,${green},${blue},1)`,
          borderWidth: 1,
          hoverBackgroundColor: i === 0 ? 'rgba(28,289,48,0.6)' : `rgba(28,${green},${blue},0.6)`,
          hoverBorderColor: i === 0 ? 'rgba(28,289,48,1)' : `rgba(28,${green},${blue},1)`,
          data: contra[i]
        }
        const newObjetoevento = {
          label: nom[i],
          backgroundColor: i === 0 ? 'rgba(23,189,38,0.4)' : `rgba(23,${green},${blue},0.6)`,
          borderColor: i === 0 ? 'rgba(23,189,38,1)' : `rgba(23,${green},${blue},1)`,
          borderWidth: 1,
          hoverBackgroundColor: i === 0 ? 'rgba(23,189,38,0.6)' : `rgba(23,${green},${blue},0.6)`,
          hoverBorderColor: i === 0 ? 'rgba(23,189,38,1)' : `rgba(23,${green},${blue},1)`,
          data: event[i]
        }
        multiplesdatoscargas.push(newObjetocarga)
        multiplesdatoscontratos.push(newObjetocontrato)
        multiplesdatoseventos.push(newObjetoevento)
      }
      const cargasdatos = {
        labels: obtenerNombresMeses(),
        datasets: multiplesdatoscargas
      }
      const contradatos = {
        labels: obtenerNombresMeses(),
        datasets: multiplesdatoscontratos
      }
      const evedatos = {
        labels: obtenerNombresMeses(),
        datasets: multiplesdatoseventos
      }
      // setLoading(true)
      setCharCargas(cargasdatos)
      setCharContratos(contradatos)
      setCharEventos(evedatos)

    }
  }

  const optionsCargas = {
    responsive: true,
    plugins: {
      title: {
        display: true,
        text: "Contactos"
      }
    }
  };
  const optionsContratos = {
    responsive: true,
    plugins: {
      title: {
        display: true,
        text: "Contratos"
      }
    }
  };
  const optionsEventos = {
    responsive: true,
    plugins: {
      title: {
        display: true,
        text: "Eventos"
      }
    }
  };
  const arrCarga = []
  const arrEvent = []
  const arrContra = []

  const creacionArraysData = (value) => {
    const obj = Object.values(value)
    const obj2 = obj[0]
    if (obj2.length === 1 && arrCarga.length === 0 && arrEvent.length === 0 && arrContra.length === 0) {
      console.log("estoy en el if", value)
      let chartDataCargas = obj2[0].cargas.data.map((item) =>
        item.contratos.reduce((a, b) => a + b, 0)
      );
      let chartDataContratos = obj2[0].contratos.data.map((item) =>
        item.contratos.reduce((a, b) => a + b, 0)
      );
      let chartDataEventos = obj2[0].eventos.data.map((item) =>
        item.contratos.reduce((a, b) => a + b, 0)
      );
      const objectarr = {
        cargas: chartDataCargas,
        contratos: chartDataContratos,
        eventos: chartDataEventos,
        nombre: obj2[0].name
      }
      creacionGrafico(objectarr, obj2[0].name)
      // setLoading(false)
    } else {
      const objectarr = {
        cargas: [],
        contratos: [],
        eventos: [],
        nombre: []
      }
      for (let i = 0; i < obj2.length; i++) {
        let chartDataCargas = obj2[i].cargas.data.map((item) =>
          item.contratos.reduce((a, b) => a + b, 0)
        );
        let chartDataContratos = obj2[i].contratos.data.map((item) =>
          item.contratos.reduce((a, b) => a + b, 0)
        );
        let chartDataEventos = obj2[i].eventos.data.map((item) =>
          item.contratos.reduce((a, b) => a + b, 0)
        );
        objectarr.cargas.push(chartDataCargas)
        objectarr.contratos.push(chartDataContratos)
        objectarr.eventos.push(chartDataEventos)
        objectarr.nombre.push(obj2[i].name)
      }
      creacionGrafico(objectarr)
      // setLoading(false)
    }
  }

  useEffect(() => {
    if (data) {
      const fetchData = async () => {
        setLoading(true);
        const resolvedData = await data;
        creacionArraysData(resolvedData);
        creacionLabels(resolvedData);
        setLoading(false);
      };
      fetchData();
    }
  }, [data]);

  return (
    <div>
      {
        loading && label.length !== 0 ? <div className='loading'> <img src={spinner} /> </div> :
          <>
            <StyledContainer2>
              <label htmlFor="select-month">Selecciona un mes:</label>
              <div className='selectContainer'>
                <select id="select-month">
                  <option value="">Todos los meses</option>
                  {obtenerNombresMeses().map((item, index) => (
                    <option key={index} value={index}>
                      {item}
                    </option>
                  ))}
                </select>
              </div>
            </StyledContainer2>

            <Bar style={{ widh: "400px", height: "329px" }} data={charCargas} options={optionsCargas} />
            <Bar style={{ widh: "400px", height: "329px" }} data={charCcontratos} options={optionsContratos} />
            <Bar style={{ widh: "400px", height: "329px" }} data={charEventos} options={optionsEventos} />
          </>
      }
    </div>
  );
};

export default BarChartVendedores;

