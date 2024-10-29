import { Link } from "react-router-dom";

const NotFoundPage = () => {
  return (
    <main className="container py-5">
      <div className="text-center">
        <h1 className="display-1">404</h1>
        <h2>Página no encontrada</h2>
        <p className="lead">Lo sentimos, la página que buscas no existe.</p>
        <Link to="/" className="btn-link">
          Volver al inicio
        </Link>
      </div>
    </main>
  );
};

export default NotFoundPage;
