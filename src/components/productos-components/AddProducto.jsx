// components/Productos/AñadirProducto.jsx
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./AddProducto.css";

const AddProducto = () => {
  const navigate = useNavigate();
  const [producto, setProducto] = useState({
    nombre: "",
    descripcion: "",
    precio: "",
    categoria: "",
    estado: true,
    imagen: null,
  });
  const [categorias, setCategorias] = useState([]);
  const [previewImage, setPreviewImage] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    // Efecto para cambiar el color del fondo
    document.body.style.backgroundColor = "#121212";

    // Cargar las categorías
    const fetchCategorias = async () => {
      try {
        const response = await fetch("tu-api/categorias");
        if (response.ok) {
          const data = await response.json();
          setCategorias(data);
        }
      } catch (err) {
        setError("Error al cargar las categorías");
      }
    };

    fetchCategorias();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProducto((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setProducto((prev) => ({
        ...prev,
        imagen: file,
      }));
      setPreviewImage(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      Object.keys(producto).forEach((key) => {
        formData.append(key, producto[key]);
      });

      // Aquí iría la llamada a tu API para crear el producto
      const response = await fetch("tu-api/productos", {
        method: "POST",
        // No es necesario establecer Content-Type cuando se usa FormData
        body: formData,
      });

      if (response.ok) {
        navigate("/productos/lista");
      } else {
        setError("Error al crear el producto");
      }
    } catch (err) {
      setError("Error de conexión");
    }
  };

  return (
    <div className="añadir-producto-container">
      <h2>Añadir Nuevo Producto</h2>
      {error && <div className="error-message">{error}</div>}

      <form onSubmit={handleSubmit} className="producto-form">
        <div className="form-group">
          <label htmlFor="nombre">Nombre del Producto</label>
          <input
            type="text"
            id="nombre"
            name="nombre"
            value={producto.nombre}
            onChange={handleInputChange}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="descripcion">Descripción</label>
          <textarea
            id="descripcion"
            name="descripcion"
            value={producto.descripcion}
            onChange={handleInputChange}
            rows="4"
          />
        </div>

        <div className="form-group">
          <label htmlFor="precio">Precio</label>
          <input
            type="number"
            id="precio"
            name="precio"
            value={producto.precio}
            onChange={handleInputChange}
            step="0.01"
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="categoria">Categoría</label>
          <select
            id="categoria"
            name="categoria"
            value={producto.categoria}
            onChange={handleInputChange}
            required
          >
            <option value="">Seleccione una categoría</option>
            {categorias.map((cat) => (
              <option key={cat.id} value={cat.id}>
                {cat.nombre}
              </option>
            ))}
          </select>
        </div>

        <div className="form-group">
          <label htmlFor="imagen">Imagen del Producto</label>
          <input
            type="file"
            id="imagen"
            name="imagen"
            onChange={handleImageChange}
            accept="image/*"
          />
          {previewImage && (
            <div className="image-preview">
              <img src={previewImage} alt="Preview" />
            </div>
          )}
        </div>

        <div className="form-group">
          <label htmlFor="estado">Estado</label>
          <select
            id="estado"
            name="estado"
            value={producto.estado}
            onChange={handleInputChange}
          >
            <option value={true}>Activo</option>
            <option value={false}>Inactivo</option>
          </select>
        </div>

        <div className="form-buttons">
          <button
            type="button"
            onClick={() => navigate("/productos/lista")}
            className="btn-cancelar"
          >
            Cancelar
          </button>
          <button type="submit" className="btn1">
            Guardar Producto
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddProducto;
