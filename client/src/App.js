import logo from './logo.svg';
import './App.css'; 
import { BrowserRouter, Routes, Route, useNavigate } from 'react-router-dom';

import { Provider } from 'react-redux';
import store from './redux/store'; 
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';  
import AppRoutes from './components/AppRoutes'; 



function App() {  


  return (
    <>
     <Provider store={store}>
      <BrowserRouter>
      <ToastContainer
/>

        <AppRoutes />
      </BrowserRouter>
    </Provider>
    </>
  );
}

export default App;
