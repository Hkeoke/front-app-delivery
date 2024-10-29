// components/Perfil/EditarPerfil.jsx
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getUserData } from "../../utils/tokenUtils";
import "./EditarPerfil.css";

const EditarPerfil = () => {
  const navigate = useNavigate();
  const [usuario, setUsuario] = useState({
    nombre: "",
    apellidos: "",
    email: "",
    telefono: "",
    imagen: null,
  });
  const [previewImage, setPreviewImage] = useState(null);
  const [error, setError] = useState("");
  const [password, setPassword] = useState({
    actual: "",
    nueva: "",
    confirmar: "",
  });

  useEffect(() => {
    const userData = getUserData();
    document.body.style.backgroundColor = "#121212";
    if (userData) {
      setUsuario({
        nombre: userData.nombre,
        apellidos: userData.apellidos,
        email: userData.email,
        telefono: userData.telefono || "",
        imagen: userData.imagen,
      });
      if (userData.imagen) {
        setPreviewImage(userData.imagen);
      }
    }
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUsuario((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handlePasswordChange = (e) => {
    const { name, value } = e.target;
    setPassword((prev) => ({
      ...prev,
      [name]: value,
    }));
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      Object.keys(usuario).forEach((key) => {
        if (usuario[key] !== null) {
          formData.append(key, usuario[key]);
        }
      });

      // Si se está cambiando la contraseña
      if (password.actual && password.nueva) {
        if (password.nueva !== password.confirmar) {
          setError("Las contraseñas no coinciden");
          return;
        }
        formData.append("passwordActual", password.actual);
        formData.append("passwordNueva", password.nueva);
      }

      // Aquí iría la llamada a tu API para actualizar el perfil
      const response = await fetch("tu-api/perfil", {
        method: "PUT",
        body: formData,
      });

      if (response.ok) {
        navigate("/perfil/ver");
      } else {
        setError("Error al actualizar el perfil");
      }
    } catch (err) {
      setError("Error de conexión");
    }
  };

  return (
    <div className="editar-perfil-container">
      <h2>Editar Perfil</h2>
      {error && <div className="error-message">{error}</div>}

      <form onSubmit={handleSubmit} className="perfil-form">
        <div className="form-section">
          <h3>Información Personal</h3>

          <div className="form-group">
            <label htmlFor="nombre">Nombre</label>
            <input
              type="text"
              id="nombre"
              name="nombre"
              value={usuario.nombre}
              onChange={handleInputChange}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="apellidos">Apellidos</label>
            <input
              type="text"
              id="apellidos"
              name="apellidos"
              value={usuario.apellidos}
              onChange={handleInputChange}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              value={usuario.email}
              onChange={handleInputChange}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="telefono">Teléfono</label>
            <input
              type="tel"
              id="telefono"
              name="telefono"
              value={usuario.telefono}
              onChange={handleInputChange}
            />
          </div>
        </div>

        <div className="form-section">
          <h3>Cambiar Contraseña</h3>

          <div className="form-group">
            <label htmlFor="actual">Contraseña Actual</label>
            <input
              type="password"
              id="actual"
              name="actual"
              value={password.actual}
              onChange={handlePasswordChange}
            />
          </div>

          <div className="form-group">
            <label htmlFor="nueva">Nueva Contraseña</label>
            <input
              type="password"
              id="nueva"
              name="nueva"
              value={password.nueva}
              onChange={handlePasswordChange}
            />
          </div>

          <div className="form-group">
            <label htmlFor="confirmar">Confirmar Nueva Contraseña</label>
            <input
              type="password"
              id="confirmar"
              name="confirmar"
              value={password.confirmar}
              onChange={handlePasswordChange}
            />
          </div>
        </div>

        <div className="form-buttons">
          <button
            type="button"
            onClick={() => navigate("/perfil/ver")}
            className="btn-cancelar"
          >
            Cancelar
          </button>
          <button type="submit" className="btn1">
            Guardar Cambios
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditarPerfil;
