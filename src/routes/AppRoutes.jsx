import { BrowserRouter, Routes, Route } from "react-router-dom";

import LoginPage from "../pages/LoginPage";
import HomePage from "../pages/HomePage";
import NotFoundPage from "../pages/NotFoundPage";
import AddCategoria from "../components/categoria-components/AddCategoria";
import Home from "../components/home-components/Home";
import EditarPerfil from "../components/perfil-components/EditarPerfil";
import AddProducto from "../components/productos-components/AddProducto";

const AppRoutes = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/" element={<HomePage />}>
          <Route index element={<Home />} />
          <Route path="categorias/añadir" element={<AddCategoria />} />
          <Route path="perfil/editar" element={<EditarPerfil />} />
          <Route path="/productos/añadir" element={<AddProducto />} />
          {/* Aquí puedo agregar ma rutas anidadas */}
        </Route>
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </BrowserRouter>
  );
};

export default AppRoutes;
