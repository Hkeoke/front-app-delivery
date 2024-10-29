import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { getUserData } from "../../utils/tokenUtils";
import "./MenuSide.css";

const MenuSide = () => {
  const [userData, setUserData] = useState({
    nombre: "",
    apellidos: "",
    imagen: "https://via.placeholder.com/150",
    roles: [],
  });
  const location = useLocation();

  useEffect(() => {
    const currentUserData = getUserData();
    if (currentUserData) {
      setUserData({
        nombre: currentUserData.nombre,
        apellidos: currentUserData.apellidos,
        imagen: currentUserData.imagen || "https://via.placeholder.com/150",
        roles: currentUserData.roles || [],
      });
    }
  }, []);

  const hasRole = (roleName) => {
    return userData.roles.some((role) => role.nombre === roleName);
  };

  const getMenuItems = () => {
    const menuItems = [];

    // Menú para CLIENTE
    if (hasRole("CLIENTE")) {
      menuItems.push({
        title: "Menú",
        icon: "bi-grid",
        path: "/menu",
        items: [
          { name: "Dashboard", path: "/dashboard" },
          { name: "Configuración", path: "/configuracion" },
        ],
      });
    }

    // Menú para RESTAURANTE
    if (hasRole("RESTAURANT")) {
      menuItems.push(
        {
          title: "Categorías",
          icon: "bi-collection",
          path: "/categorias",
          items: [
            { name: "Ver Categorías", path: "/categorias/ver" },
            { name: "Añadir Categoría", path: "/categorias/añadir" },
          ],
        },
        {
          title: "Productos",
          icon: "bi-box",
          path: "/productos",
          items: [
            { name: "Lista de Productos", path: "/productos/lista" },
            { name: "Añadir Producto", path: "/productos/añadir" },
          ],
        }
      );
    }

    // Perfil para todos los usuarios
    menuItems.push({
      title: "Perfil",
      icon: "bi-person",
      path: "/perfil",
      items: [
        { name: "Ver Perfil", path: "/perfil/ver" },
        { name: "Editar Perfil", path: "/perfil/editar" },
      ],
    });

    return menuItems;
  };

  const [activeMenus, setActiveMenus] = useState({});

  const toggleSubmenu = (title) => {
    setActiveMenus((prev) => ({
      ...prev,
      [title]: !prev[title],
    }));
  };

  return (
    <div className="menu-side">
      <div className="profile-section">
        <div className="profile-image-container">
          <img
            src={userData.imagen || "https://via.placeholder.com/150"}
            alt="Profile"
            className="profile-image"
          />
        </div>
        <div className="profile-info">
          <h3>{`${userData.nombre} ${userData.apellidos}`}</h3>
          <div className="user-roles">
            {userData.roles.map((role) => (
              <span key={role.id} className="role-badge">
                {role.nombre}
              </span>
            ))}
          </div>
        </div>
      </div>

      <nav className="menu-navigation">
        {getMenuItems().map((item) => (
          <div key={item.title} className="menu-section">
            <div
              className={`menu-title ${
                activeMenus[item.title] ? "active" : ""
              }`}
              onClick={() => toggleSubmenu(item.title)}
            >
              <i className={`bi ${item.icon}`}></i>
              <span>{item.title}</span>
              <i
                className={`bi bi-chevron-${
                  activeMenus[item.title] ? "up" : "down"
                } arrow-icon`}
              ></i>
            </div>
            <div className={`submenu ${activeMenus[item.title] ? "show" : ""}`}>
              {item.items.map((subItem) => (
                <Link
                  key={subItem.path}
                  to={subItem.path}
                  className={`submenu-item ${
                    location.pathname === subItem.path ? "active" : ""
                  }`}
                >
                  {subItem.name}
                </Link>
              ))}
            </div>
          </div>
        ))}
      </nav>
    </div>
  );
};

export default MenuSide;
