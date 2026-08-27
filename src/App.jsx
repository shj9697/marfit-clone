import "./App.css";
import Home from "./pages/Home";
import Navbar from "./component/Navbar";
import { BrowserRouter, Route, Routes } from "react-router-dom";
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
import AddToCart from "./pages/AddToCart";
import ShippingPolicy from "./pages/ShippingPolicy";
import NotFound from "./pages/notFound";
import "swiper/css";
import "swiper/css/navigation";
import CollectionContent from "./pages/CollectionContent";

function App() {
  return (
    <div className="w-full bg-[#eef0f3]">
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
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
          <Route path="/AddToCart" element={<AddToCart />} />
          <Route path="/ShippingPolicy" element={<ShippingPolicy />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
        <Footer />
      </BrowserRouter>
      <Toaster />
    </div>
  );
}

export default App;
