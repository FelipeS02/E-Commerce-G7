import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { FaStar, FaCreditCard, FaMoneyBillWave } from "react-icons/fa";
import { getOrders } from "../../actions/orderActions";
import Loading from "../Loading/Loading";
import Modal from "react-bootstrap/Modal";
import { BASE_IMG_URL } from "../../constants/productConstants";
import { Button, Container, Table, Carousel } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import Review from "../Review/Review.js";
import { useTranslation } from "react-i18next";

const OrderHistory = () => {
  const [t, i18n] = useTranslation("global");
  const [show, setShow] = useState(false);
  const [loading, setLoading] = useState(true);

  const [data, setData] = useState({
    quantity: 0,
    id: 0,
    name: "",
    size: "",
    isReviewed: false,
    isReceived: false,
    referenceImg: "",
  });

  const colours = {
    ENTREGADO: "#258d19",
    DESPACHADO: "4ea93b",
    CONFIRMADO: "#007bff",
    CANCELADO: "red",
  };
  
  const dispatch = useDispatch();
  const userState = useSelector((state) => state.userState);
  const id = userState.userInfo.id;

  useEffect(() => {
    if (id) {
      dispatch(getOrders(id, ""));
    }
  }, [dispatch, id]);

  const orderState = useSelector((state) => state.orderState);
  const { loginUserInfo } = userState;
  const orders = orderState.orders;

  if (loginUserInfo) {
    return <Loading />;
  }

  const handleClose = () => {
    setLoading(true);
    setShow(false);
  };
  const handleShow = (clothe, orderState) => {
    setShow(true);
    setData({
      quantity: clothe.quantity_and_size.quantity,
      id: clothe.id,
      name: clothe.name,
      size: clothe.quantity_and_size.size,
      isReceived: checkState(orderState),
      isReviewed: checkReviewed(
        clothe.id,
        userState.userInfo.id,
        orders.reviews
      ),
      referenceImg: clothe.media,
    });
    setLoading(false);
  };
  const checkState = (state) => {
    if (state === "ENTREGADO") {
      return true;
    } else {
      return false;
    }
  };

  const checkReviewed = (clotheId, userId, reviewArray) => {
    if (
      reviewArray.find((e) => e.userId === userId && e.clotheId === clotheId)
    ) {
      return true;
    } else {
      return false;
    }
  };

  return (
    <div>
      {orders.length === 0 ? (
        <div class="jumbotron jumbotron-fluid">
          <div class="container">
            <h1 class="display-4">{t("History.NoHay")}</h1>
            <p class="lead">{t("History.Vuelve")}</p>
          </div>
        </div>
      ) : (
        <Container className="mw-100" style={{ marginTop: "1%" }}>
          <Table variant="light" striped bordered>
            <thead className="thead-dark">
              <tr>
                <th>{t("History.N-Orden")}</th>
                <th>{t("History.Prendas")}</th>
                <th>{t("History.Direcc")}</th>
                <th>{t("History.F-Pago")}</th>
              </tr>
            </thead>
            <tbody>
              {orders?.orders?.map((order, index) => (
                <tr key={index}>
                  <td>
                    {`${t("History.Order-name")} ${order.id}`}{" "}
                    <h6 style={{ color: `${colours[order.state]}` }}>
                      {order.state}
                    </h6>
                  </td>
                  <td>
                    {order.clothes?.map((clothe, i) => (
                      <Button
                        key={i}
                        variant="info"
                        onClick={(e) => handleShow(clothe, order.state)}
                        style={{ margin: "4px", color: "black" }}
                      >
                        <h6>{clothe.name}</h6>
                      </Button>
                    ))}
                  </td>
                  <td>
                    <h6>{order.direction}</h6>
                  </td>
                  <td>
                    <h6>
                      {order.payment.includes("Efectivo / Transferencia") ? (
                        <FaMoneyBillWave />
                      ) : (
                        <FaCreditCard />
                      )}{" "}
                      {order.payment}
                    </h6>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
          <Modal show={show} onHide={handleClose}>
            {loading ? (
              <Loading />
            ) : (
              <>
                <Modal.Header closeButton>
                  <Modal.Title>{t("History.Detalle")}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                  <Carousel variant="dark">
                    {data.referenceImg &&
                      data.referenceImg.map((item, index) => (
                        <Carousel.Item
                          interval={2000}
                          key={index}
                          style={{ height: "500px" }}
                        >
                          <img
                            src={`${BASE_IMG_URL}/uploads/${item.name}`}
                            alt={`ClothePhoto${index}`}
                            style={{
                              "max-height": "500px",
                              position: "absolute",
                              top: "0",
                              left: "15%",
                              objectFit: "cover",
                            }}
                          />
                        </Carousel.Item>
                      ))}
                  </Carousel>
                  <br></br>
                  <Link to={`/search/details/${data.id}`}>{data.name}</Link>
                  <div>
                    {t("History.Talle")}:{" " + data.size}
                  </div>
                  <div>
                    {t("History.Cantidad")}:{" " + data.quantity}
                  </div>
                  {data.isReceived ? (
                    data.isReviewed === false ? (
                      <Review clotheId={data.id} userId={id} />
                    ) : (
                      <h6 style={{ color: "green" }}>
                        {t("History.R-Hecha")}
                        <FaStar />
                      </h6>
                    )
                  ) : (
                    <h6 style={{ color: "GrayText" }}>{t("History.Opi")}</h6>
                  )}
                </Modal.Body>
                <Modal.Footer>
                  <Button variant="secondary" onClick={handleClose}>
                    OK
                  </Button>
                </Modal.Footer>
              </>
            )}
          </Modal>
        </Container>
      )}
    </div>
  );
};
export default OrderHistory;
