import "./App.css";
import Menu from "./components/Menu/Menu";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import GenInv from "./pages/GenInv/GenInv";
import NewCustomer from "./pages/NewCustomer/NewCustomer";
import Welcome from "./pages/Welcome/Welcome";
function App() {
  return (
    <>
      <Router>
        <Menu />
        <Routes>
          <Route path="/" element={<Welcome />} />
          <Route path="/gen-inv" element={<GenInv />} />
          <Route path="/new-customer" element={<NewCustomer />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
