import {useState, useEffect} from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import LoginPage from './Components/LoginPage/LoginPage';
import RsosPage from './Components/RsosPage/RsosPage';
import './main.css';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
      <Routes>
        <Route path='' element={<LoginPage />} />
        <Route path='rsos' element={<RsosPage />} />
        <Route path='*' element={<p>404 Fam.</p>} />
      </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
