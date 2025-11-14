import { createRoot } from 'react-dom/client'
import { BrowserRouter } from "react-router";
import { Provider } from 'react-redux';
import { store, persistor } from './store/store.js';
import { PersistGate } from 'redux-persist/integration/react';
import App from './App.jsx'
import './index.scss'

createRoot(document.getElementById('root')).render(
  // <StrictMode>
  <BrowserRouter>
  <Provider store={store}>
    <PersistGate persistor={persistor}>
        <App />
    </PersistGate>
  </Provider>
  </BrowserRouter>
  // </StrictMode>,
)
