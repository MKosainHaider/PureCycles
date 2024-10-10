import React from "react";
import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
import HomePage from "./pages/Home/HomePage";
import Login from './pages/Login.jsx';
import Register from './pages/Register.jsx';
import Profile from "./pages/Profile.jsx";  
import Cart from "./pages/Cart.jsx";
import BuyNowPage from "./pages/BuyNowPage.jsx";
import SingleSpeedPage from "./pages/Single Speed/SingleSpeedPage.jsx";
import CityBikesPage from "./pages/city Bikes/CityBikesPage.jsx";
import CommuterBikesPage from "./pages/Commuter Bikes/CommuterBikePage.jsx";
import AllBikesPage from "./pages/All Bikes/AllBikesPage.jsx";
import AccessoriesPage from "./pages/Accessories/AccessoriesPage.jsx";
import NotFoundPage from "./pages/NotFoundPage";
import { RenderProductDetail } from "./utils/renderProductDetail.jsx";  
import AdminDashboard from "./pages/Admin/AdminDashboard.jsx"; // Import the Admin Dashboard
import { useAuth } from "./context/AuthContext"; // Import useAuth

function App() {
  const { isAdmin } = useAuth(); // Get isAdmin function from context

  return (
    <Router>
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<HomePage />} />
        <Route path="/home" element={<HomePage />} />
        <Route path="/single-speed" element={<SingleSpeedPage />} />
        <Route path="/city-bikes" element={<CityBikesPage />} />
        <Route path="/commuter-bikes" element={<CommuterBikesPage />} />
        <Route path="/all-bikes" element={<AllBikesPage />} />
        <Route path="/accessories" element={<AccessoriesPage />} />
        <Route 
          path="/accessories/:id" 
          element={<RenderProductDetail type={"accessories"} />} 
        />
        <Route 
          path="/bikes/:id" 
          element={<RenderProductDetail type={"bike"} />} 
        />
        {/* Authentication Routes */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/profile" element={<Profile />} />
        {/* Admin Routes */}
        <Route 
          path="/admin" 
          element={isAdmin() ? <AdminDashboard /> : <Navigate to="/" />} 
        />
        {/* Catch-all Route for 404 Not Found */}
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </Router>
  );
}

export default App;
