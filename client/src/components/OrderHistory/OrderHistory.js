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

const OrderHistory = () => {
  const [show, setShow] = useState(false);
  const [data, setData] = useState({
    quantity: 0,
    id: 0,
    name: "",
    date: "",
    time: "",
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
  const userState = useSelector((state) => state.userState);
  const orderState = useSelector((state) => state.orderState);
  const dispatch = useDispatch();
  const id = userState.userInfo.id;
  const { loginUserInfo } = userState;
  const orders = orderState.orders;

  useEffect(() => {
    if (id) {
      dispatch(getOrders(id, ""));
    }
  }, [dispatch, id]);

  if (loginUserInfo) {
    return <Loading />;
  }

  const handleClose = () => setShow(false);
  const handleShow = (e, flag, stateFlag) => {
    setShow(true);
    let obj = JSON.parse(e.target.value);
    let date = new Date(obj.date);
    let year = date.getFullYear();
    let month = date.getMonth() + 1;
    let getDate = date.getDate();

    if (month < 10) month = "0" + month;
    if (getDate < 10) getDate = "0" + getDate;

    const dateFormat = year + "-" + month + "-" + getDate;

    let hours = date.getHours();
    let minutes = date.getMinutes();

    if (minutes < 10) minutes = "0" + minutes;
    if (hours < 10) hours = "0" + hours;

    const timeFormat = hours + ":" + minutes;

    setData({
      quantity: obj.clothe.quantity_and_size.quantity,
      id: obj.clothe.id,
      name: obj.clothe.name,
      date: dateFormat,
      time: timeFormat,
      size: obj.clothe.quantity_and_size.size,
      isReceived: stateFlag,
      isReviewed: flag,
      referenceImg: obj.clothe.media,
    });
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
            <h1 class="display-4">Aun no hay ninguna orden para mostrar</h1>
            <p class="lead">
              Vuelve cuando hayas realizado el pago de almenos una orden
            </p>
          </div>
        </div>
      ) : (
        <Container className="mw-100" style={{ marginTop: "1%" }}>
          <Table variant="light" striped bordered>
            <thead className="thead-dark">
              <tr>
                <th>Número de orden</th>
                <th>Prendas</th>
                <th>Direccion</th>
                <th>Forma de pago</th>
              </tr>
            </thead>
            <tbody>
              {orders?.orders?.map((order, index) => (
                <tr key={index}>
                  <td>
                    {`Orden ${order.id}`}{" "}
                    <h6 style={{ color: `${colours[order.state]}` }}>
                      {order.state}
                    </h6>
                  </td>
                  <td>
                    {order.clothes?.map((clothe, i) => (
                      <Button
                        key={i}
                        variant="info"
                        onClick={(e) =>
                          handleShow(
                            e,
                            checkReviewed(
                              clothe.id,
                              userState.userInfo.id,
                              orders.reviews
                            ),
                            checkState(order.state)
                          )
                        }
                        value={JSON.stringify({
                          clothe,
                          date: order.updatedAt,
                        })}
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
            <Modal.Header closeButton>
              <Modal.Title>Detalle de la orden</Modal.Title>
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
              <div>Talle:{" " + data.size}</div>
              <div>Cantidad:{" " + data.quantity}</div>
              <div>Fecha de la compra:{" " + data.date}</div>
              <div>Hora de la compra:{" " + data.time}</div>
              {data.isReceived ? (
                data.isReviewed === false ? (
                  <Review clotheId={data.id} userId={id} />
                ) : (
                  <h6 style={{ color: "green" }}>
                    Ya has hecho una reseña de esta prenda <FaStar />
                  </h6>
                )
              ) : (
                <h6 style={{ color: "GrayText" }}>
                  Podras dejar tu opinion cuando el producto sea entregado.
                </h6>
              )}
            </Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={handleClose}>
                OK
              </Button>
            </Modal.Footer>
          </Modal>
        </Container>
      )}
    </div>
  );};
export default OrderHistory;
