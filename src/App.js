import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import Navbar from "./layout/Navbar";
import Home from "./pages/Home";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import AddSite from "./sites/AddSite";
import EditSite from "./sites/EditSite";
import ViewSite from "./sites/ViewSite";

function App() {
  return (
    <div className="App">
      <Router>
        <Navbar />
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route exact path="/addSite" element={<AddSite />} />
          <Route exact path="/editSite/:id" element={<EditSite />} />
          <Route exact path="/viewSite/:id" element={<ViewSite />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
