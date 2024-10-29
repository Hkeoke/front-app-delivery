// components/Categorias/AddCategoria.jsx
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./AddCategoria.css";

const AddCategoria = () => {
  const navigate = useNavigate();
  useEffect(() => {
    // Efecto para cambiar el color del fondo
    document.body.style.backgroundColor = "#121212";
  }, []);

  const [categoria, setCategoria] = useState({
    nombre: "",
    descripcion: "",
    estado: true,
  });
  const [error, setError] = useState("");

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCategoria((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Aquí iría la llamada a tu API para crear la categoría
      const response = await fetch("tu-api/categorias", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          // Aquí deberías incluir tu token de autorización
        },
        body: JSON.stringify(categoria),
      });

      if (response.ok) {
        navigate("/categorias/ver");
      } else {
        setError("Error al crear la categoría");
      }
    } catch (err) {
      setError("Error de conexión");
    }
  };

  return (
    <div className="añadir-categoria-container">
      <h2>Añadir Nueva Categoría</h2>
      {error && <div className="error-message">{error}</div>}

      <form onSubmit={handleSubmit} className="categoria-form">
        <div className="form-group">
          <label htmlFor="nombre">Nombre de la Categoría</label>
          <input
            type="text"
            id="nombre"
            name="nombre"
            value={categoria.nombre}
            onChange={handleInputChange}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="descripcion">Descripción</label>
          <textarea
            id="descripcion"
            name="descripcion"
            value={categoria.descripcion}
            onChange={handleInputChange}
            rows="4"
          />
        </div>

        <div className="form-group">
          <label htmlFor="estado">Estado</label>
          <select
            id="estado"
            name="estado"
            value={categoria.estado}
            onChange={handleInputChange}
          >
            <option value={true}>Activo</option>
            <option value={false}>Inactivo</option>
          </select>
        </div>

        <div className="form-buttons">
          <button
            type="button"
            onClick={() => navigate("/categorias/ver")}
            className="btn-cancelar"
          >
            Cancelar
          </button>
          <button type="submit" className="btn1">
            Guardar Categoría
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddCategoria;
