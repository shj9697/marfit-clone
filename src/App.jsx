import './App.css'
import Home from './pages/Home'
import Navbar from './component/Navbar'
import { BrowserRouter, Route, Router, Routes } from 'react-router-dom'
import Footer from './component/Footer'
import DealPage from './pages/DealPage'
import MessengerBags from './pages/MessengerBags'
import ShoulderHandbags from './pages/ShoulderHandbags'
import TrolleyBags from './pages/TrolleyBags'
import NewArrival from './pages/NewArrival'
import Sale from './pages/Sale'
import Franchise from './pages/Franchise'

function App() {
  return (
    <div className='w-full bg-[#eef0f3]'>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/deal" element={<DealPage />} />
          <Route path="/messenger-bags" element={<MessengerBags />} />
          <Route path="/shoulder-handbags" element={<ShoulderHandbags />} />
          <Route path="/trolley-bags" element={<TrolleyBags />} />
          <Route path="/new-arrival" element={<NewArrival />} />
          <Route path="/sale" element={<Sale />} />
          <Route path="/franchise" element={<Franchise />} />
        </Routes>
        <Footer />
        {/* <Test /> */}
      </BrowserRouter>
    </div>
  )
}

export default App
