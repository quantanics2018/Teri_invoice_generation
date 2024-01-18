import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import './assets/style/App.css'


ReactDOM.render(
  <React.StrictMode>
      {/* <Alert_management_socket /> */}
      <App style={{ overflow: 'hidden' }} />
  </React.StrictMode>,
  document.getElementById('root')
);
