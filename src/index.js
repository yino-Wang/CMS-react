import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.scss'
import { RouterProvider } from 'react-router-dom';
import router from './router';
import {Provider} from 'react-redux'
import store from './store';
import 'normalize.css' //让不同浏览器之间的默认样式更一致，解决页面在不同浏览器中的显示差异问题。

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Provider store={store}> 
      <RouterProvider router = {router}></RouterProvider>
    </Provider>
  </React.StrictMode>
);

