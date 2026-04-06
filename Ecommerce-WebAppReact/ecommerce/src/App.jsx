import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Header from './components/Header';
import Footer from './components/Footer';
import HomePage from './pages/HomePage'
import LoginPage from './pages/LoginPage'
import RegisterPage from './pages/RegisterPage'
import ProfilePage from './pages/ProfilePage'
import ProductPage from './pages/ProductPage'
import CartPage from './pages/CartPage'
import CheckoutPage from './pages/CheckoutPage'
import OrdersPage from './pages/OrdersPage'
import AdminDashboard from './pages/AdminDashboard'

function App() {

  return (
    <BrowserRouter>
      <Header />
      <main className="container-fluid px-lg-5 px-3 mt-4">
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="/product/:id" element={<ProductPage />} />
        <Route path="/cart" element={<CartPage />} />
        <Route path="/checkout" element={<CheckoutPage />} />
        <Route path="/orders" element={<OrdersPage />} />
        <Route path="/admin" element={<AdminDashboard />} />
      </Routes>
      </main>
      <Footer />
    </BrowserRouter>
  )
}

export default App
