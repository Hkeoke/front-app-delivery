import { useState, useEffect } from "react";
import { Outlet } from "react-router-dom";
import Navbar from "../components/home-components/Navbar";
import Home from "../components/home-components/Home";
import Ofertas from "../components/home-components/Ofertas";
import Footer from "../components/home-components/Footer";
import Delivery from "../components/home-components/Delivery";
import MenuSide from "../components/menu-side-component/MenuSide";

const HomePage = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const checkLoginStatus = () => {
      const tokenData = localStorage.getItem("tokenData");
      if (tokenData) {
        const { expiry } = JSON.parse(tokenData);
        const now = new Date().getTime();

        if (now < expiry) {
          setIsLoggedIn(true);
        } else {
          localStorage.removeItem("tokenData");
          setIsLoggedIn(false);
        }
      } else {
        setIsLoggedIn(false);
      }
    };

    checkLoginStatus();
    window.addEventListener("storage", checkLoginStatus);

    return () => {
      window.removeEventListener("storage", checkLoginStatus);
    };
  }, []);

  const handleLogoutStatus = () => {
    setIsLoggedIn(false);
  };

  return (
    <div className={`app-container ${isLoggedIn ? "with-sidebar" : ""}`}>
      <Navbar onLogout={handleLogoutStatus} />
      {isLoggedIn && <MenuSide />}
      <main className={`main-content ${isLoggedIn ? "with-sidebar" : ""}`}>
        {isLoggedIn ? (
          <Outlet />
        ) : (
          <>
            <Home />
            <Delivery />
            <Ofertas />
            <Footer />
          </>
        )}
      </main>
    </div>
  );
};

export default HomePage;
