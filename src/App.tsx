import { Routes, Route } from "react-router-dom";
import Navbar from "./components/common/Navbar";
import Footer from "./components/common/Footer";
import Home from "./pages/Home/Home";
import Men from "./pages/Categories/Men";
import Women from "./pages/Categories/Women";
import Kids from "./pages/Categories/Kids";
import Login from "./pages/Auth/Login";
import Signup from "./pages/Auth/Signup";
import ProductDetail from "./pages/Product/ProductDetail";
import Cart from "./pages/Cart/Cart";

function App() {
  return (
    <div className="min-h-screen flex flex-col">
      {/* Navbar */}
      <Navbar />

      {/* Main Content */}
      <main className="flex-1 container mx-auto px-4 py-6">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/men" element={<Men />} />
          <Route path="/women" element={<Women />} />
          <Route path="/kids" element={<Kids />} />

          {/* Auth */}
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />

          {/* Product */}
          <Route path="/product/:id" element={<ProductDetail />} />

          {/* Cart */}
          <Route path="/cart" element={<Cart />} />
        </Routes>
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}

export default App;
