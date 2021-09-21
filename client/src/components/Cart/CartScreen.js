import React from "react";
import {
  Button,
  Card,
  Col,
  Container,
  Form,
  Image,
  Row,
} from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { BASE_IMG_URL } from "../../constants/productConstants";
import { FaRegTrashAlt, FaArrowLeft } from "react-icons/fa";
import { addToCart, getOrder, removeFromCart } from "../../actions/cartAccions";
const CartScreen = () => {
  const dispatch = useDispatch();
  const cartState = useSelector((state) => state.cartState);
  const { totalItems, carItems, carTotalAmount, orderId } = cartState;
  const userState = useSelector((state) => state.userState);
  const { userInfo } = userState;
  const itemHandler = (obj, id, userId, clothe) => {
    console.log(obj, id);
    dispatch(addToCart(obj, id, userId, clothe));
  };

  const removeItemHandler = (id) => {
    dispatch(removeFromCart(id, orderId, userInfo.id));
  };
  return (
    <Container className="my-5">
      <Row>
        <Col>
          <Card>
            <Card.Header className="text-center">
              {" "}
              <h4 className="my-3">Carrito de compras</h4>
            </Card.Header>
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
                    <Form.Control
                      type="number"
                      min="1"
                      max={100}
                      value={item.quantity_and_size.quantity}
                      onChange={(e) =>
                        itemHandler(
                          {
                            quantity: e.target.value,
                            size: item.quantity_and_size.size,
                          },
                          item.id,
                          userInfo.id,
                          item
                        )
                      }
                    />
                  </Col>
                  <Col>
                    <Row>
                      <h6>${item.quantity_and_size.quantity * item.price}</h6>
                    </Row>
                  </Col>
                  <Col>
                    <FaRegTrashAlt
                      id={item.id}
                      onClick={() => {
                        removeItemHandler(item);
                      }}
                    />
                  </Col>
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
                  <h6>Total: ${totalItems === 0 ? 0 : carTotalAmount}</h6>
                </Col>
              </Row>
            </Card.Body>
            <Card.Body>
              <Row>
                <Button variant="primary" as={Link} to="/user/checkout">
                  Proceder a la compra
                </Button>
              </Row>
            </Card.Body>
          </Card>
        </Col>
      </Row>
      <Button variant="primary" className="my-2" as={Link} to="/">
        <Col>
          {" "}
          <FaArrowLeft />
        </Col>
        <Col>Continuar comprando</Col>
      </Button>
    </Container>
  );
};

export default CartScreen;
