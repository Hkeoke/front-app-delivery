import img1 from "../../assets/burger2.png";
import img2 from "../../assets/pizza2.png";
import img3 from "../../assets/hamburguesa.png";
const Ofertas = () => {
  return (
    <>
      <div className="container-fluid  Ofertas py-5 my-2">
        <div className="container text-center ">
          <div className="row align-items-center">
            <div className="col-lg-12 text-center">
              <h1 className="h1_delivery">
                Mejores <span>Ofertas !!</span>
              </h1>
            </div>
          </div>
          <div className="row gx-0">
            <div className="col-lg-4 text-center">
              <div className="Ofertas_col1">
                <img src={img1} alt="" className="img-fluid ofertas-img" />
                <h4>$30</h4>
                <h5>Hamburguesa vegana</h5>
                <div className=" py-2">
                  <div className="row align-items-center">
                    <div className="col-6">
                      <div className="stars">
                        <i className="bi bi-star-fill"></i>
                        <i className="bi bi-star-fill"></i>
                        <i className="bi bi-star-fill"></i>
                        <i className="bi bi-star-fill"></i>
                        <i className="bi bi-star-fill"></i>
                      </div>
                    </div>
                    <div className="col-6">
                      <button className="border-0">
                        Añadir
                        <i className="bi bi-cart-plus-fill"></i>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-lg-4 text-center">
              <div className="Ofertas_col1">
                <img src={img2} alt="" className="img-fluid ofertas-img" />
                <h4>$15</h4>
                <h5>Pizza con tomate</h5>
                <div className=" py-2">
                  <div className="row align-items-center">
                    <div className="col-6">
                      <div className="stars">
                        <i className="bi bi-star-fill"></i>
                        <i className="bi bi-star-fill"></i>
                        <i className="bi bi-star-fill"></i>
                        <i className="bi bi-star-fill"></i>
                        <i className="bi bi-star-fill"></i>
                      </div>
                    </div>
                    <div className="col-6">
                      <button className="border-0">
                        Añadir
                        <i className="bi bi-cart-plus-fill"></i>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-lg-4 text-center">
              <div className="Ofertas_col1">
                <img src={img3} alt="" className="img-fluid ofertas-img" />
                <h4>$35</h4>
                <h5>Hamburguesa mixta</h5>
                <div className=" py-2">
                  <div className="row align-items-center">
                    <div className="col-6">
                      <div className="stars">
                        <i className="bi bi-star-fill"></i>
                        <i className="bi bi-star-fill"></i>
                        <i className="bi bi-star-fill"></i>
                        <i className="bi bi-star-fill"></i>
                        <i className="bi bi-star-fill"></i>
                      </div>
                    </div>
                    <div className="col-6">
                      <button className="border-0">
                        Añadir
                        <i className="bi bi-cart-plus-fill"></i>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default Ofertas;
