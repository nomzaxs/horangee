import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';

import {BrowserRouter} from 'react-router-dom';

import {store} from './store/index';
import {Provider} from 'react-redux'; // redux 사용
import {CookiesProvider} from 'react-cookie'; // cookie 사용
import {PersistGate} from 'redux-persist/integration/react';
import {persistStore} from 'redux-persist';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement,
);
const persistor = persistStore(store);

// const root = ReactDOM.createRoot(
//   document.getElementById('root') as HTMLElement,
// );
root.render(
  <React.StrictMode>
    <CookiesProvider>
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <BrowserRouter>
            <App />
          </BrowserRouter>
        </PersistGate>
      </Provider>
    </CookiesProvider>
  </React.StrictMode>,
);
