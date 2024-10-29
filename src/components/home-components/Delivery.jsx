import img1 from "../../assets/delivery1.png";
import img2 from "../../assets/delivery2.png";
import img3 from "../../assets/delivery3.png";
const Delivery = () => {
  return (
    <>
      <div className="container-fluid text-center py-5">
        <h1 className="h1_delivery">
          ¿ Porqué <span>nosotros</span> ?
        </h1>
        <div className="container py-4">
          <div className="row gx-0 text-center">
            <div className="col-lg-4">
              <div className="delivery_col1">
                <img src={img1} alt="" className="delivery-img " />
                <h3>Fácil Ordenar.</h3>
              </div>
            </div>

            <div className="col-lg-4">
              <div className="delivery_col1">
                <img src={img2} alt="" className="delivery-img" />
                <h3>Entrega Rápida</h3>
              </div>
            </div>
            <div className="col-lg-4">
              <div className="delivery_col1">
                <img src={img3} alt="" className="delivery-img" />
                <h3>Mejor Cualidad</h3>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Delivery;
