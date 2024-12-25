import { createRoot } from 'react-dom/client';
import './index.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Provider } from 'react-redux';
import store from './app/store';
import { CartProvider } from './context/CartContext';
import App from './App.jsx';

// Render the app with all providers in the correct order
createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <CartProvider>
      <App />
    </CartProvider>
  </Provider>
);
