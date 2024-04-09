import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import './assets/style/App.css'
import { createRoot } from 'react-dom/client';


// ReactDOM.render(
//   <React.StrictMode>
//     {/* <Alert_management_socket /> */}
//     <App style={{ overflow: 'hidden' }} />
//   </React.StrictMode>,
//   document.getElementById('root')
// );

createRoot(document.getElementById(("root"))).render(
  <App style={{ overflow: 'hidden' }} />
)