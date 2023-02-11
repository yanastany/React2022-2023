import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import Test from './components/test';
import ReadCarti from './components/Carti/ReadCarti';
import reportWebVitals from './reportWebVitals';
import UpdateCarti from './components/Carti/UpdateCarti';
import Navigation from './components/Navi';
import Create_Carti from './components/Carti/AddCarti';
import ReadAutori from './components/Autori/ReadAutori';
import UpdateAutori from './components/Autori/UpdateAutori';
import Create_Autori from './components/Autori/AddAutori';
import ReadStudenti from './components/Studenti/ReadStudenti';
import Create_Studenti from './components/Studenti/AddStudenti';
import UpdateStudenti from './components/Studenti/UpdateStudenti';
import Std from './Std';
import Au from './Au';
import {BrowserRouter as Router, Route, Routes} from "react-router-dom";
import Auth from './Auth';
import {Statistics} from './Stat';
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Router>
    <Navigation/>
    <Routes>
      {/* Ruta pentru pagina de Home */}
      <Route path="/" element={<Test/>} />
      <Route path="/carti" element={<ReadCarti/>} />
      <Route path="/update_carti" element={<UpdateCarti/>} />
      <Route path="/add_carti" element={<Create_Carti/>} />
      <Route path="/autori" element={<ReadAutori/>} />
      <Route path="/update_autori" element={<UpdateAutori/>} />
      <Route path="/add_autori" element={<Create_Autori/>} />
      <Route path="/toauth" element={<Auth />} />
      <Route path="/update_studenti" element={<UpdateStudenti/>} />
      <Route path="/add_studenti" element={<Create_Studenti/>} />
      <Route path="/studenti" element={<ReadStudenti/>} />
      <Route path="/st" element={<Std/>} />
      <Route path="/au" element={<Au/>} />
      <Route path="/stats" element={<Statistics/>} />
      
      
      </Routes>
  </Router>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
