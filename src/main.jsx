import { createRoot } from 'react-dom/client'
import './index.css';
import App from './App.jsx';
import { CartProvider } from './context/CartProvider';


createRoot(document.getElementById('root')).render(
  <CartProvider>
    <App />
  </CartProvider>
)
