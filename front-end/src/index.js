import React from 'react';
import ReactDOM from 'react-dom/client';
import reportWebVitals from './reportWebVitals';
import 'bootstrap/dist/css/bootstrap.css'
import { BrowserRouter, Routes, Route, Router } from "react-router-dom";

// import './index.css';

// import Filme from './components/Filme/index';
// import Header from './components/Header/index';
// import Titulo from './components/Titulo/index';
// import Footer from './components/Footer/index';

import App from './App';



const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(

  <React.StrictMode>

    <App />
  </React.StrictMode>

);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
