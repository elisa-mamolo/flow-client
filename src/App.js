import logo from "./logo.svg";
import "./App.css";
import { Routes, Route } from "react-router-dom";
import SignupPage from "./pages/SignupPage";
import LoginPage from "./pages/LoginPage";
import Acquarium from "./pages/AcquariumPage";
import EditAquarium from "./pages/EditAcquariumPage";
import EditAcquariumPage from "./pages/EditAcquariumPage";
import AddLogPage from "./pages/AddLogPage";
import EditLogPage from "./pages/EditLogPage";
import Charts from "./pages/Charts";
import HomePage from "./pages/HomePage";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/logout" element={<HomePage />} />
        <Route path="/acquarium" element={<Acquarium />} />
        <Route path="/charts/:id" element={<Charts />} />
        <Route path="/edit-acquarium/:id" element={<EditAcquariumPage />} />
        <Route path="/edit-log/:logid/:acquariumid" element={<EditLogPage />} />
        <Route path="/addlog/:id" element={<AddLogPage />} />
      </Routes>
    </div>
  );
}

export default App;
