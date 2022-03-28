import { client } from '@tilework/opus';
import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import AppRouter, { history } from './AppRouter';
import reportWebVitals from './utils/reportWebVitals';

client.setEndpoint(process.env.REACT_APP_ENDPOINT!);

ReactDOM.render(
  <React.StrictMode>
    <AppRouter history={history}>
      <App />
    </AppRouter>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
