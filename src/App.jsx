import { useContext } from "react";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import './style.scss'
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthContext } from "./context/AuthContext";

function App() {
  const { currentUser } = useContext(AuthContext)
  console.log("current user from app", currentUser)

  const ProtectRoute = ({ children }) => {
    if (!currentUser) {
      return <Navigate to="/login" />
    }else{
      return children
    }
  }
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={
            <ProtectRoute>
              <Home />
            </ProtectRoute>
          }
        />
        <Route
          path="register"
          element={<Register />}
        />
        <Route
          path="login"
          element={<Login />}
        />

      </Routes>
    </BrowserRouter>
  )
}

export default App;
