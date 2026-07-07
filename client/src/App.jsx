import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import BrowseItems from "./pages/BrowseItems";
import ReportLost from "./pages/ReportLost";
import ReportFound from "./pages/ReportFound";
import ItemDetails from "./pages/ItemDetails";
import Register from "./pages/Register";
import Login from "./pages/Login";
import backgroundImage from "./assets/background.png";

function App() {
  return (
    <BrowserRouter>
      <div
        className="min-h-screen bg-cover bg-center bg-fixed bg-no-repeat text-gray-900"
        style={{ backgroundImage: `url(${backgroundImage})` }}
      >
        <Navbar />

        <main className="min-h-screen">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/items" element={<BrowseItems />} />
            <Route path="/items/:id" element={<ItemDetails />} />
            <Route path="/report-lost" element={<ReportLost />} />
            <Route path="/report-found" element={<ReportFound />} />
            <Route path="/register" element={<Register />} />
            <Route path="/login" element={<Login />} />
          </Routes>
        </main>

        <Footer />
      </div>
    </BrowserRouter>
  );
}

export default App;