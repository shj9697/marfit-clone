import "./App.css";
import Home from "./pages/Home";
import Navbar from "./component/Navbar";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import Footer from "./component/Footer";
import Franchise from "./pages/Franchise";
import Products from "./pages/Products";
import { Toaster } from "react-hot-toast";
import Categories from "./pages/Categories";
import SubCategories from "./pages/SubCategories";
import Embose from "./pages/Embose";
import ProductDetailsPage from "./pages/ProductDetailsPage";
import BulkContact from "./pages/BulkContact";
import TrackingOrders from "./pages/TrackingOrders";
import ContactForm from "./pages/ContactForm";
import TermsAndCondition from "./pages/TermsAndCondition";
import ShippingPolicy from "./pages/ShippingPolicy";
import NotFound from "./pages/notFound";
import "swiper/css";
import "swiper/css/navigation";
import CollectionContent from "./pages/CollectionContent";
import CartPage from "./pages/cartPage";
import AddressDetails from "./component/AddressDetails";
import { AuthProvider } from "./context/AuthProvider";
import { CartProvider } from "./context/CartProvider";
import Dashboard from "./pages/Dashboard";
import Profile from "./pages/Profile";
import Orders from "./pages/Orders";
import Wishlist from "./pages/Wishlist";
import Address from "./pages/Address";

function App() {
  return (
    <div className="w-full bg-[#eef0f3]">
      <BrowserRouter>
        <AuthProvider>
          <CartProvider>
            <Navbar />
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/Dashboard" element={<Dashboard />}>
                <Route index element={<Navigate to="Profile" replace />} />
                <Route path="Profile" element={<Profile />} />
                <Route path="Orders" element={<Orders />} />
                <Route path="Wishlist" element={<Wishlist />} />
                <Route path="Address" element={<Address />} />
              </Route>
              <Route path="/profile" element={<Navigate to="/Dashboard/Profile" replace />} />
              <Route path="/orders" element={<Navigate to="/Dashboard/Orders" replace />} />
              <Route path="/wishlist" element={<Navigate to="/Dashboard/Wishlist" replace />} />
              <Route path="/products/:id" element={<Products />} />
              <Route exact path="/:slug" element={<CollectionContent />} />
              <Route path="/franchise" element={<Franchise />} />
              <Route path="/categories/:slug" element={<Categories />} />
              <Route path="/categories/:categorySlug/:subCategorySlug" element={<SubCategories />} />
              <Route exact path="/emboss" element={<Embose />} />
              <Route path="/categories/:parentId/:subId/:productId" element={<ProductDetailsPage />} />
              <Route path="/bulkContact" element={<BulkContact />} />
              <Route path="/TrackOrder" element={<TrackingOrders />} />
              <Route path="/ContactForm" element={<ContactForm />} />
              <Route path="/TermsAndCondition" element={<TermsAndCondition />} />
              <Route path="/ShippingPolicy" element={<ShippingPolicy />} />
              <Route path="/cart" element={<CartPage />} />
              <Route path="/AddressDetails" element={<AddressDetails />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
            <Footer />
          </CartProvider>
        </AuthProvider>
      </BrowserRouter>
      <Toaster />
    </div>
  );
}

export default App;
