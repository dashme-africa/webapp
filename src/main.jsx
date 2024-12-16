import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Provider } from 'react-redux'; // Ensure this is uncommented
import store from './app/store'; // Ensure the store is properly imported
import { CartProvider } from './context/CartContext'; // CartProvider for the cart context
import App from './App.jsx'; // Your main app component

// Render the app with all providers in the correct order
createRoot(document.getElementById('root')).render(
  // <StrictMode>
    <Provider store={store}> {/* Redux provider for the global state */}
      <CartProvider> {/* Cart context provider */}
        <App />
      </CartProvider>
    </Provider>
);
