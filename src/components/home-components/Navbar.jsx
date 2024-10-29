import { useState, useEffect } from "react";
import logo from "../../assets/logo1.png";
import logo2 from "../../assets/logo2.png";
import { Link, useNavigate } from "react-router-dom";
import { getToken, removeToken } from "../../utils/tokenUtils";
import axios from "axios";

const Navbar = ({ onLogout }) => {
  // Recibe la función onLogout como prop
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [currentLogo, setCurrentLogo] = useState(logo);

  useEffect(() => {
    const checkAuthStatus = () => {
      const token = getToken();
      setIsLoggedIn(!!token);
    };

    checkAuthStatus();

    const logoInterval = setInterval(() => {
      setCurrentLogo((prev) => (prev === logo ? logo2 : logo));
    }, 2000);

    return () => {
      clearInterval(logoInterval);
    };
  }, []);

  const handleLogout = async () => {
    try {
      await axios.post(`${import.meta.env.VITE_API_URL}/users/logout`);
    } catch (error) {
      console.error("Error durante el logout:", error);
    } finally {
      removeToken();
      setIsLoggedIn(false);
      onLogout(); // Llama a la función callback
      navigate("/");
    }
  };

  return (
    <nav className="navbar navbar-expand-lg Nav_main container-fluid">
      <div className="container gx-0">
        <a>
          <h1>Delivery App</h1>
        </a>
        <a className="navbar-brand">
          <img src={currentLogo} alt="" className="logo-small" />
        </a>

        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbar"
          aria-controls="navbar"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbar">
          <ul className="navbar-nav mx-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <a className="nav-link" href="#">
                Home
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="#">
                Menu
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="#">
                Nosotros
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="#">
                Facilidad
              </a>
            </li>
          </ul>
          <form className="d-flex align-items-center gap-3">
            <div className="icons">
              <i className="bi bi-search fs-5"></i>
            </div>
            <div className="icons">
              <i className="bi bi-cart fs-5"></i>
            </div>

            {isLoggedIn ? (
              <button
                className="btn1 mx-lg-3"
                type="button"
                onClick={handleLogout}
              >
                Logout
              </button>
            ) : (
              <Link to="/login">
                <button className="btn1 mx-lg-3" type="button">
                  Login
                </button>
              </Link>
            )}
          </form>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
