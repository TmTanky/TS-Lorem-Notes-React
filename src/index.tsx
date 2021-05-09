import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import {Provider} from 'react-redux'
import { PersistGate } from 'redux-persist/integration/react'

// Redux
import { persistor, store } from './redux/store/store';

ReactDOM.render(
  <>
    <PersistGate persistor={persistor} >
      <Provider store={store} >
        <App />
      </Provider>
    </PersistGate>
  </>,
  document.getElementById('root')
);

