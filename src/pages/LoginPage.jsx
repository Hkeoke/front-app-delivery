import { useState, useEffect } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import logo from "../assets/logo1.png";
import logo2 from "../assets/logo2.png";

const LoginPage = () => {
  const navigate = useNavigate();
  const [currentLogo, setCurrentLogo] = useState(logo);
  const [credentials, setCredentials] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentLogo((prev) => (prev === logo ? logo2 : logo));
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  const setTokenWithExpiry = (token, userData) => {
    const now = new Date();
    const expiryTime = now.getTime() + 30 * 60 * 1000; // 30 minutos
    const item = {
      token: token,
      expiry: expiryTime,
      userData: userData, // Guardar también los datos del usuario
    };
    localStorage.setItem("tokenData", JSON.stringify(item));
  };

  const handleChange = (e) => {
    setCredentials({
      ...credentials,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/users/signin`,
        {
          email: credentials.email,
          contrasena: credentials.password,
        }
      );

      console.log("Respuesta del servidor:", response.data);

      if (response.data.success) {
        const userData = response.data.data;
        setTokenWithExpiry(userData.session_token, {
          id: userData.id,
          email: userData.email,
          nombre: userData.nombre,
          apellidos: userData.apellidos,
          roles: userData.roles,
        });
        navigate("/");
      } else {
        setError("Error en la autenticación");
      }
    } catch (err) {
      console.error("Error en la petición:", err);
      setError(
        err.response?.data?.message ||
          "Error al iniciar sesión. Verifica tus credenciales."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <main
      className="container py-5"
      style={{
        backgroundColor: "#000000",
        minHeight: "100vh",
        maxWidth: "100%",
        alignItems: "center",
      }}
    >
      <div className="row justify-content-center">
        <div className="col-md-6 col-lg-4">
          <div className="card shadow">
            <div className="card-body p-4">
              <div className="text-center mb-4">
                <img
                  src={currentLogo}
                  alt="Logo"
                  className="logo-small mb-3"
                  style={{
                    maxWidth: "200px",
                    display: "block",
                    margin: "0 auto",
                  }}
                />
                <h1>Iniciar Sesión</h1>
              </div>
              {error && (
                <div className="alert alert-danger" role="alert">
                  {error}
                </div>
              )}
              <form onSubmit={handleSubmit} method="POST">
                <div className="mb-3">
                  <label htmlFor="email" className="form-label">
                    Email
                  </label>
                  <input
                    type="email"
                    className="form-control"
                    id="email"
                    name="email"
                    placeholder="tucorreo@ejemplo.com"
                    value={credentials.email}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="password" className="form-label">
                    Contraseña
                  </label>
                  <div className="input-group">
                    <input
                      type={showPassword ? "text" : "password"}
                      className="form-control"
                      id="password"
                      name="password"
                      placeholder="Tu contraseña"
                      value={credentials.password}
                      onChange={handleChange}
                      required
                    />
                    <button
                      className="btn btn-outline-secondary"
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      style={{ borderColor: "#ced4da" }}
                    >
                      <i
                        className={`bi ${
                          showPassword ? "bi-eye-slash" : "bi-eye"
                        }`}
                      ></i>
                    </button>
                  </div>
                </div>
                <button
                  type="submit"
                  className="btn1 w-100 mb-3"
                  disabled={loading}
                >
                  <span>{loading ? "Ingresando..." : "Ingresar"}</span>
                </button>
                <div className="text-center">
                  <p className="mb-0">¿No tienes una cuenta?</p>
                  <Link to="/registrar">
                    <button
                      type="button"
                      className="btn btn-link p-0"
                      style={{ color: "#f54749" }}
                    >
                      Regístrate aquí
                    </button>
                  </Link>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default LoginPage;
