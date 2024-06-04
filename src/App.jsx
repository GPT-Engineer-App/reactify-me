import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import Index from "./pages/Index.jsx";
import Events from "./pages/Events.jsx";
import Navbar from "./components/Navbar.jsx"; // Import the Navbar component

function App() {
  return (
    <Router>
      <Navbar /> {/* Add the Navbar component here */}
      <Routes>
        <Route exact path="/" element={<Index />} />
      <Route path="/events" element={<Events />} />
      </Routes>
    </Router>
  );
}

export default App;
