import ReactDOM from 'react-dom/client';
import App from './App';
import { ToastContainer } from 'react-toastify';

import { Provider } from 'react-redux';
import { store } from './store/store';

import './index.css';
import 'react-toastify/dist/ReactToastify.css';
ReactDOM.createRoot(document.getElementById('root')!).render(
  <Provider store={store}>
    <App />
    <ToastContainer position="bottom-left" autoClose={2000} />
  </Provider>
);
