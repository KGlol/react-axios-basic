import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';

import axios from 'axios';

//在index.js设置interceptors是最好的,index.js是最先运行的

axios.defaults.baseURL = 'https://jsonplaceholder.typicode.com/';
axios.defaults.headers.common['Authorization'] = 'KG TOKEN';
axios.defaults.headers.post['Content-Type'] = 'application/json';

axios.interceptors.request.use( request => {
  console.log ( request );
  //edit request config
  return request;
}, error => {
  console.log( error );
  return Promise.reject( error );
} )

axios.interceptors.response.use( response => {
  console.log ( response );
  //edit request config
  return response;
}, error => {
  console.log( error );
  return Promise.reject( error );
} )


ReactDOM.render( <App />, document.getElementById( 'root' ) );
registerServiceWorker();
