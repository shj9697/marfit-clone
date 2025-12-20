import "./App.css";
import Home from "./pages/Home";
import Navbar from "./component/Navbar";
import { BrowserRouter, Route, Router, Routes } from "react-router-dom";
import Footer from "./component/Footer";
import NewArrival from "./pages/NewArrival";
import Sale from "./pages/Sale";
import Franchise from "./pages/Franchise";
import Products from "./pages/Products";
import { Toaster } from "react-hot-toast";
import Categories from "./pages/Categories";
import SubCategories from "./pages/SubCategories";
import Embose from "./pages/Embose";
import ProductDetailsPage from "./pages/ProductDetailsPage";
import { CartProvider } from './context/CartProvider';


function App() {
  return (
    <div className="w-full bg-[#eef0f3]">
      <CartProvider>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/products/:id" element={<Products />} />
          <Route path="/new-arrival" element={<NewArrival />} />
          <Route path="/sale" element={<Sale />} />
          <Route path="/franchise" element={<Franchise />} />
          <Route path="/categories/:pathId" element={<Categories />} />
          <Route path="/categories/:parentId/:subId" element={<SubCategories />} />
          <Route path="/emboss" element={<Embose />} />
          <Route path="/categories/:parentId/:subId/:productId" element={<ProductDetailsPage />} />
        </Routes>
        <Footer />
      </BrowserRouter>
      </CartProvider>
      <Toaster />
    </div>
  );
}

export default App;
