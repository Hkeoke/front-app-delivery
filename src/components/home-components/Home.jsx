import fotoHome from "../../assets/burger1.png";

const Home = () => {
  return (
    <>
      <div className="container-fluid foto_Home">
        <div className="container">
          <div className="row align-items-lg-center">
            <div className="col-lg-6">
              <div className="col1_home">
                <h1>El sabor de la mejor comida,haz tu pedido con nosotros</h1>
                <p className="py-3">
                  Nuesta comida es deliciosa,haz tu pedido,pureba nuesto
                  producto sin tener que salir de tu casa.Delicioso,Rapido y
                  desde la comodidad de tu hogar.
                </p>
                <div className="btn_Home">
                  <button className="btn1 fs-5 py-3" type="button">
                    Comenzar
                  </button>
                </div>
              </div>
            </div>
            <div className="col-lg-6">
              <div className="col2_home" style={{ marginLeft: "80px" }}>
                <img src={fotoHome} alt="" className="img-fluid" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
