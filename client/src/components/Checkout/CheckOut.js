import React, { useEffect, useState } from "react";
import {
  CardElement,
  Elements,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";
import axios from "axios";
import {
  Accordion,
  Button,
  Card,
  Container,
  Form,
  Row,
  Col,
  Image,
  Spinner,
} from "react-bootstrap";
import { BASE_IMG_URL } from "../../constants/productConstants";
import { FaAddressCard, FaCreditCard, FaStripe } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { confirmPayment } from "../../actions/paymentAccions";
import swal from "sweetalert";
import { getOrder } from "../../actions/cartAccions";

const CheckOut = (props) => {
  // ------- begin form  and card validation------

  const [formValidation, setFormValidation] = useState({
    address: "",
    city: "",
    state: "",
    zip: "",
  });
  const [inputValidation, setInputValidation] = useState({
    isAddressTouch: false,
    isCityTouch: false,
    isStateTouch: false,
    isZipTouch: false,
    cardInfoisCompleted: false,
  });

  const enteredAddress = formValidation.address.trim() !== "";
  const enteredCity = formValidation.city.trim() !== "";
  const enteredState = formValidation.state.trim() !== "";
  const enteredZip = formValidation.zip.trim() !== "";

  const addressIsValid = !enteredAddress && inputValidation.isAddressTouch;

  const cityIsValid = !enteredCity && inputValidation.isCityTouch;

  const stateIsValid = !enteredState && inputValidation.isStateTouch;

  const zipIsValid = !enteredZip && inputValidation.isZipTouch;

  const onBlurHandlerValidation = (e) => {
    console.log(e.target.name);
    setInputValidation((prevState) => {
      if (e.target.name === "address")
        return {
          ...prevState,
          isAddressTouch: true,
        };
      if (e.target.name === "city")
        return {
          ...prevState,
          isCityTouch: true,
        };
      if (e.target.name === "state")
        return {
          ...prevState,
          isStateTouch: true,
        };
      if (e.target.name === "zip")
        return {
          ...prevState,
          isZipTouch: true,
        };
    });
  };

  let isFormValid = false;
  if (addressIsValid && cityIsValid && stateIsValid && zipIsValid) {
    isFormValid = true;
  }

  const cardHandler = (e) => {
    setInputValidation((prevState) => {
      return {
        ...prevState,
        cardInfoisCompleted: e.complete,
      };
    });
  };

  const inputHandler = (e) => {
    console.log(e.target.name);
    if (e.target.name === "address") {
      setFormValidation((prevState) => {
        return {
          ...prevState,
          address: e.target.value,
        };
      });
    }

    if (e.target.name === "city") {
      setFormValidation((prevState) => {
        return {
          ...prevState,
          city: e.target.value,
        };
      });
    }

    if (e.target.name === "state") {
      setFormValidation((prevState) => {
        return {
          ...prevState,
          state: e.target.value,
        };
      });
    }

    if (e.target.name === "zip") {
      setFormValidation((prevState) => {
        return {
          ...prevState,
          zip: e.target.value,
        };
      });
    }
  };

  // ------- end form  and card validation------
  const provincias = [
    "Buenos Aires",
    "Catamarca",
    "Chaco",
    "Chubut",
    "Córdoba",
    "Corrientes",
    "Entre Ríos",
    "Formosa",
    "Jujuy",
    "La Pampa",
    "La Rioja",
    "Mendoza",
    "Misiones",
    "Neuquén",
    "Río Negro",
    "Salta",
    "San Juan",
    "San Luis",
    "Santa Cruz",
    "Santa Fe",
    "Santiago del Estero",
    "Tierra del Fuego, Antártida e Islas del Atlántico Sur",
    "Tucumán",
  ];
  const stripe = useStripe();
  const elements = useElements();
  const dispatch = useDispatch();

  const cartState = useSelector((state) => state.cartState);
  const {
    totalItems,
    carItems,
    carTotalAmount,
    orderId,
    paymentSuccess,
    loadingPayment,
  } = cartState;
  const userState = useSelector((state) => state.userState);
  const { userInfo } = userState;

  const paymentHandler = async () => {
    if (!addressIsValid || !cityIsValid || !stateIsValid || zipIsValid) {
      return swal("Verificar los datos de la dirección de envío", "", "error");
    }
    if (!formValidation.cardInfoisCompleted) {
      return swal("Verificar los datos de la tarjeta", "", "error");
    }
    if (
      !formValidation.cardInfoisCompleted &&
      (!addressIsValid || !cityIsValid || !stateIsValid || zipIsValid)
    ) {
      return swal(
        "Verificar los datos de la dirección de envío y la tarjeta",
        "",
        "error"
      );
    }

    try {
      const { error, paymentMethod } = await stripe.createPaymentMethod({
        type: "card",
        card: elements.getElement(CardElement),
      });

      if (error) {
        console.log("[error]", error);
      } else {
        const { id } = paymentMethod;
        elements.getElement(CardElement).clear();

        dispatch(
          confirmPayment(
            id,
            carTotalAmount,
            orderId,
            "MercadoPago",
            "3448, La Rioja, Buenos Aires",
            carItems,
            userInfo.id
          )
        );
      }
    } catch (err) {
      console.log(err);
    }
  };
  // orderId, payment, direction, clothes, userId
  useEffect(() => {
    if (paymentSuccess) {
      setTimeout(() => {
        props.history.push(`/`);
      }, 3000);
    }
  }, [paymentSuccess, props.history]);
  if (totalItems === 0) {
    return <h1>No hay productos en tu carrito</h1>;
  }

  return (
    <Container className="my-5">
      <Accordion defaultActiveKey="0">
        <Card>
          <Accordion.Toggle as={Card.Header} eventKey="0">
            <FaAddressCard /> Dirección de envio
          </Accordion.Toggle>
          <Accordion.Collapse eventKey="0">
            <Card.Body>
              <Form noValidate>
                <Form.Group controlId="formGridAddress1">
                  <Form.Label>Dirección</Form.Label>
                  <Form.Control
                    placeholder="1234 Main St"
                    required
                    isInvalid={addressIsValid ? true : false}
                    name="address"
                    value={formValidation.address}
                    onChange={inputHandler}
                    onBlur={onBlurHandlerValidation}
                  />

                  <Form.Control.Feedback type="invalid">
                    Ingrese una dirección
                  </Form.Control.Feedback>
                </Form.Group>

                <Form.Row>
                  <Form.Group as={Col} controlId="formGridCity">
                    <Form.Label>Ciudad</Form.Label>
                    <Form.Control
                      required
                      name="city"
                      isInvalid={cityIsValid ? true : false}
                      value={formValidation.city}
                      onChange={inputHandler}
                      onBlur={onBlurHandlerValidation}
                    />
                    <Form.Control.Feedback type="invalid">
                      Ingrese una ciudad
                    </Form.Control.Feedback>
                  </Form.Group>

                  <Form.Group as={Col} controlId="formGridState">
                    <Form.Label>Provincia</Form.Label>
                    <Form.Control
                      as="select"
                      defaultValue="Selecciona..."
                      required
                      name="state"
                      onChange={inputHandler}
                      onBlur={onBlurHandlerValidation}
                      isInvalid={stateIsValid ? true : false}
                    >
                      <option value="">Selecciona...</option>
                      {provincias.map((provincia, index) => (
                        <option>{`Provincia de ${provincia}`}</option>
                      ))}
                    </Form.Control>
                    <Form.Control.Feedback type="invalid">
                      Seleccione una provincia
                    </Form.Control.Feedback>
                  </Form.Group>

                  <Form.Group as={Col} controlId="formGridZip">
                    <Form.Label>Zip</Form.Label>
                    <Form.Control
                      name="zip"
                      value={formValidation.zip}
                      isInvalid={zipIsValid ? true : false}
                      onChange={inputHandler}
                      onBlur={onBlurHandlerValidation}
                      required
                    />
                    <Form.Control.Feedback type="invalid">
                      Ingrese un ZIP
                    </Form.Control.Feedback>
                  </Form.Group>
                </Form.Row>
              </Form>
            </Card.Body>
          </Accordion.Collapse>
        </Card>
        <Card>
          <Accordion.Toggle as={Card.Header} eventKey="1">
            Datos de tarjeta
          </Accordion.Toggle>
          <Accordion.Collapse eventKey="1">
            <Card.Body>
              <Form>
                <CardElement
                  onChange={(e) => {
                    cardHandler(e);
                  }}
                />
              </Form>
            </Card.Body>
          </Accordion.Collapse>
        </Card>
        <Card>
          <Accordion.Toggle as={Card.Header} eventKey="2">
            Resumen de la orden
          </Accordion.Toggle>
          <Accordion.Collapse eventKey="2">
            <Card.Body>
              <Row>
                <Col>
                  <Card>
                    <Card.Body>
                      {carItems?.map((item, index) => (
                        <Row className="my-4">
                          <Col>
                            <Image
                              src={`${BASE_IMG_URL}/uploads/${item.media[0].name}`}
                              fluid
                            />
                          </Col>
                          <Col>
                            <Row>
                              <h6>{item.name}</h6>
                            </Row>
                            <Row>
                              <h6>Precio: ${item.price}</h6>
                            </Row>
                            <Row>
                              <h6>Talle: {item.quantity_and_size.size}</h6>
                            </Row>
                          </Col>
                          <Col>
                            <h5>{item.quantity_and_size.quantity}</h5>
                          </Col>
                          <Col>
                            <Row>
                              <h6>
                                ${item.quantity_and_size.quantity * item.price}
                              </h6>
                            </Row>
                          </Col>
                          <Col></Col>
                        </Row>
                      ))}
                    </Card.Body>
                  </Card>
                </Col>
                <Col md={3}>
                  <Card>
                    <Card.Body>
                      <Row>
                        <Col>
                          <h6>{totalItems} articulos</h6>
                        </Col>
                        <Col>
                          <h6>
                            Total: ${totalItems === 0 ? 0 : carTotalAmount}
                          </h6>
                        </Col>
                      </Row>
                    </Card.Body>
                    <Card.Body>
                      <Row>
                        <Button
                          className={loadingPayment ? "disabled" : ""}
                          variant="primary"
                          onClick={() => {
                            paymentHandler();
                          }}
                        >
                          {loadingPayment ? (
                            <Spinner animation="border" variant="light" />
                          ) : (
                            "Pagar"
                          )}
                        </Button>
                      </Row>
                    </Card.Body>
                  </Card>
                </Col>
              </Row>
            </Card.Body>
          </Accordion.Collapse>
        </Card>
      </Accordion>
    </Container>
  );
};

export default CheckOut;
