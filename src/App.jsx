import NavBar from "./components/NavBar.jsx";
import { Route, Routes, BrowserRouter as Router } from "react-router-dom";
import "./App.css";
import GamePage from "./pages/GamePage";
import LoginPage from "./pages/LoginPage";
import { useState } from "react";
import ProfilePage from "./pages/ProfilePage.jsx";
import SelectGamePage from "./pages/SelectGamePage.jsx";
import LobbyPage from "./pages/LobbyPage.jsx";
import AdminPage from "./pages/AdminPage.jsx";
import AccsesDeniedPage from "./pages/AccsesDeniedPage.jsx";
import { useContext } from "react";
import AuthContext from "./auth/AuthenticationContext";
import AccsesCheck from "./components/AccsesCheck.jsx";
import RegisterPage from "./pages/RegisterPage.jsx";
import GameSummaryPage from "./pages/GameSummaryPage.jsx";

function App() {
  const { userDetails } = useContext(AuthContext);

  return (
    <Router>
      <NavBar userDetails={userDetails} />
      <Routes>
        <Route path="/game" element={<GamePage />} />
        <Route path="/denied" element={<AccsesDeniedPage />} />
        <Route element={<AccsesCheck accsesLevelRequired={-1} />}>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
        </Route>
        <Route element={<AccsesCheck accsesLevelRequired={1} />}>
          <Route path="/selectGame" element={<SelectGamePage />} />
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="/lobby" element={<LobbyPage />} />
          <Route path="/gameInfo" element={<GameSummaryPage />} />
        </Route>
        <Route element={<AccsesCheck accsesLevelRequired={2} />}>
          <Route path="/admin" element={<AdminPage />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
