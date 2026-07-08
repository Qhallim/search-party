import { useEffect } from "react";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import BrowseItems from "./pages/BrowseItems";
import ReportLost from "./pages/ReportLost";
import ReportFound from "./pages/ReportFound";
import ItemDetails from "./pages/ItemDetails";
import Login from "./pages/Login";
import Register from "./pages/Register";
import backgroundImage from "./assets/background.png";

function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}

function App() {
  return (
    <BrowserRouter basename="/search-party">
      <div
        className="min-h-screen bg-cover bg-center bg-fixed bg-no-repeat text-gray-900"
        style={{ backgroundImage: `url(${backgroundImage})` }}
      >
        <ScrollToTop />

        <Navbar />

        <main className="min-h-screen">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/items" element={<BrowseItems />} />
            <Route path="/items/:id" element={<ItemDetails />} />
            <Route path="/report-lost" element={<ReportLost />} />
            <Route path="/report-found" element={<ReportFound />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
          </Routes>
        </main>

        <Footer />
      </div>
    </BrowserRouter>
  );
}

export default App;