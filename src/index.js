import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './components/App';
import {configureStore} from './store/index';


let store= configureStore();

console.log('store',store);

ReactDOM.render(

    <App />
  ,
  document.getElementById('root')
);
