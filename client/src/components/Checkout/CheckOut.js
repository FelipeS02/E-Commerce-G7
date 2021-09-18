import React from "react";
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
} from "react-bootstrap";
import { BASE_IMG_URL } from "../../constants/productConstants";
import { FaAddressCard, FaCreditCard, FaStripe } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { confirmPayment } from "../../actions/paymentAccions";

const CheckOut = () => {
  const stripe = useStripe();
  const elements = useElements();
  const dispatch = useDispatch();
  const cartState = useSelector((state) => state.cartState);
  const { totalItems, carItems, carTotalAmount, orderId } = cartState;
  const userState = useSelector((state) => state.userState);
  const { userInfo } = userState;

  const paymentHandler = async () => {
    try {
      const { error, paymentMethod } = await stripe.createPaymentMethod({
        type: "card",
        card: elements.getElement(CardElement),
      });
      if (error) {
        console.log("[error]", error);
      } else {
        const { id } = paymentMethod;
        console.log(id);
        confirmPayment(
          id,
          carTotalAmount,
          orderId,
          "MercadoPago",
          "3448, La Rioja, Buenos Aires",
          carItems,
          userInfo.id
        );
      }
    } catch (err) {
      console.log(err);
    }
  };
  // orderId, payment, direction, clothes, userId

  return (
    <Container className="my-5">
      <Accordion defaultActiveKey="0">
        <Card>
          <Accordion.Toggle as={Card.Header} eventKey="0">
            <FaAddressCard /> Dirección de envio
          </Accordion.Toggle>
          <Accordion.Collapse eventKey="0">
            <Card.Body>
              <Form>
                <Form.Row>
                  <Form.Group as={Col} controlId="formGridEmail">
                    <Form.Label>Email</Form.Label>
                    <Form.Control type="email" placeholder="Enter email" />
                  </Form.Group>
                </Form.Row>

                <Form.Group controlId="formGridAddress1">
                  <Form.Label>Dirección</Form.Label>
                  <Form.Control placeholder="1234 Main St" />
                </Form.Group>

                <Form.Row>
                  <Form.Group as={Col} controlId="formGridCity">
                    <Form.Label>Ciudad</Form.Label>
                    <Form.Control />
                  </Form.Group>

                  <Form.Group as={Col} controlId="formGridState">
                    <Form.Label>Provincia</Form.Label>
                    <Form.Control as="select" defaultValue="Choose...">
                      <option>Choose...</option>
                      <option>...</option>
                    </Form.Control>
                  </Form.Group>

                  <Form.Group as={Col} controlId="formGridZip">
                    <Form.Label>Zip</Form.Label>
                    <Form.Control />
                  </Form.Group>
                </Form.Row>
              </Form>
            </Card.Body>
          </Accordion.Collapse>
        </Card>
        <Card>
          <Accordion.Toggle as={Card.Header} eventKey="1">
            Metodo de pago
          </Accordion.Toggle>
          <Accordion.Collapse eventKey="1">
            <Card.Body>
              <Form>
                <CardElement />
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
                          variant="primary"
                          onClick={() => {
                            paymentHandler();
                          }}
                        >
                          Pagar
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
