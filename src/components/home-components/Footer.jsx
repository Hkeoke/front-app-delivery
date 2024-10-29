const Footer = () => {
  return (
    <>
      <div className="container-fluid Footer">
        <div className="container">
          <div className="row gx-0">
            <div className="col-md-3">
              <h4>Contacto</h4>
              <p>Dirección</p>
              <p>Teléfono</p>
            </div>
            <div className="col-md-6">
              <h4>Enlaces</h4>
              <ul>
                <li>Inicio</li>
                <li>Menú</li>
                <li>Nosotros</li>
              </ul>
            </div>
            <div className="col-md-3">
              <h4>Síguenos</h4>
              <div className="social-icons">
                <i className="bi bi-facebook"></i>
                <i className="bi bi-instagram"></i>
                <i className="bi bi-twitter"></i>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default Footer;
