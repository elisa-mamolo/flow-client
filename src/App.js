import logo from "./logo.svg";
import "./App.css";
import { Routes, Route } from "react-router-dom";
import SignupPage from "./pages/SignupPage";
import LoginPage from "./pages/LoginPage";
import Acquarium from "./pages/AcquariumPage";
import EditAquarium from "./pages/EditAcquariumPage";
import EditAcquariumPage from "./pages/EditAcquariumPage";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/acquarium" element={<Acquarium />} />
        <Route path="/edit-acquarium/:id" element={<EditAcquariumPage />} />
      </Routes>
    </div>
  );
}

export default App;
