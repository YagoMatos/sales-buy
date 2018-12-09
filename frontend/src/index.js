import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import registerServiceWorker from './registerServiceWorker';

import { IntlProvider, addLocaleData } from 'react-intl';
import pt from 'react-intl/locale-data/pt';
import en from 'react-intl/locale-data/en';
 
addLocaleData([...pt, ...en]);
ReactDOM.render(
    <IntlProvider locale="pt">
    <App />
  </IntlProvider>
  , document.getElementById('root'));
registerServiceWorker();
