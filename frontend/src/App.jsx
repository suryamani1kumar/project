
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import "./App.css";
import { useState, createContext, useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./page/Login";
import Header from "./component/Header/Header";
import Footer from "./component/Footer/Footer";
import Profile from "./page/Profile";
import Progress from "./page/Progress";
import Topics from "./page/Topics";
import axios from "axios";

export const AuthContext = createContext(false);

function App() {
  const [loggin, setLoggin] = useState(false);
  const [user, setUser] = useState(null);
  const checkToken = async () => {
    try {
      const res = await axios.get(`${import.meta.env.VITE_BASE_URL}/verify`, {
        withCredentials: true,
      });
      if (res.status === 200) {
        setLoggin(true);
        setUser(res.data);
      } else {
        setLoggin(false);
      }
    } catch (err) {
      setLoggin(false);
    }
  };

  useEffect(() => {
    checkToken();
  }, []);

  return (
    <>
      <AuthContext.Provider value={{ loggin, setLoggin, user }}>
        <BrowserRouter>
          {loggin && window.location.pathname !== "/login" && <Header />}

          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/topics" element={<Topics />} />
            <Route path="/progress" element={<Progress />} />
          </Routes>
          {loggin && window.location.pathname !== "/login" && <Footer />}
        </BrowserRouter>
      </AuthContext.Provider>
    </>
  );
}

export default App;
