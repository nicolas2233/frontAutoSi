
import './App.css';
import Login from './views/Login.js';
import { BrowserRouter, Navigate, Route, Routes} from 'react-router-dom';
import Home from './views/Home';
import Left from './views/Left';
import CalendarAutoSi from './componentes/Calendar';
import { Provider,useSelector } from 'react-redux';
import store from './store'

function App() {
 
  return (
    <Provider store={store}>
      
    <BrowserRouter>
    <Routes>
              <Route path="/" element={<Home></Home>}/>
              <Route path="/iniciar-sesion" element={<Login/>}/>
              <Route path="/prueba" element={<CalendarAutoSi></CalendarAutoSi>}/>
              <Route path="*" element={<Navigate to='/'></Navigate>}/>

    </Routes>
  </BrowserRouter>
  </Provider>
  );
}

export default App;


