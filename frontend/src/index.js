import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import reportWebVitals from './reportWebVitals'
import MegaRouter from './components/MegaRouter'
import { BrowserRouter } from 'react-router-dom'

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter >
      <div className='page'>
        <MegaRouter />
      </div>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root')
);

reportWebVitals();
