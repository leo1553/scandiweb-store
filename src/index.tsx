import { client } from '@tilework/opus';
import React from 'react';
import ReactDOM from 'react-dom';
import AppComponent from './components/app/App/App.component';
import AppRouterComponent from './components/app/AppRouter/AppRouter.component';
import reportWebVitals from './utils/reportWebVitals';

import './styles/styles.scss';

client.setEndpoint(process.env.REACT_APP_ENDPOINT!);

ReactDOM.render(
  <React.StrictMode>
    <AppRouterComponent>
      <AppComponent />
    </AppRouterComponent>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
