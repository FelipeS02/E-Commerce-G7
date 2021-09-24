import React, { useEffect } from "react";
import {
  Button,
  Col,
  Image,
  ListGroup,
  OverlayTrigger,
  Popover,
  Row,
} from "react-bootstrap";
import { Link } from "react-router-dom";
import { FaShoppingCart, FaRegTrashAlt } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { getOrder, removeFromCart } from "../../actions/cartAccions";
import { BASE_IMG_URL } from "../../constants/productConstants";
import { useTranslation } from "react-i18next";

const Cart = () => {
  const [t, i18n] = useTranslation("global");
  const dispatch = useDispatch();
  const cartState = useSelector((state) => state.cartState);
  const { totalItems, carItems, carTotalAmount, orderId, paymentSuccess } =
    cartState;
  const userState = useSelector((state) => state.userState);
  const { userInfo } = userState;

  useEffect(() => {
    dispatch(getOrder(userInfo.id, "CARRITO"));
  }, [dispatch, userInfo.id]);
  const removeItemHandler = (id) => {
    dispatch(removeFromCart(id, orderId, userInfo.id));
  };
  const popover = (
    <Popover id="popover-basic">
      <Popover.Content
        style={{
          "max-height": "250px",
          "overflow-y": "auto",
        }}
      >
        {totalItems === 0 ? (
          !window.localStorage.getItem("henryShopG7") ? (
            <h6>{t("Carrito.Sin-Productos")}</h6>
          ) : (
            <h6>Hay productos en el carrito local.</h6>
          )
        ) : (
          <ListGroup>
            {carItems?.map((item, index) => (
              <ListGroup.Item
                key={index}
                className="justify-content-end align-items-center"
              >
                <Row>
                  <Image
                    src={`${BASE_IMG_URL}/uploads/${item.media[0].name}`}
                    fluid
                  />
                </Row>
                <Row>
                  <Col>
                    <Row>{item.name}</Row>
                    <Row>{`${item.quantity_and_size.quantity}x$${item.price}`}</Row>
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
              </ListGroup.Item>
            ))}
          </ListGroup>
        )}
      </Popover.Content>
      {totalItems > 0 && (
        <Popover.Content>
          <h6>Total: ${carTotalAmount}</h6>
          <Button className="my" as={Link} to="/cart">
            {t("Carrito.Ver-Carrito")}
          </Button>
        </Popover.Content>
      )}
    </Popover>
  );
  return (
    <OverlayTrigger
      trigger="click"
      rootClose
      placement="bottom"
      className="my-2"
      overlay={popover}
    >
      <Button variant="Primary">
        <FaShoppingCart size="1.3rem" color="white" />
        <span class="badge">{totalItems}</span>
      </Button>
    </OverlayTrigger>
  );
};

export default Cart;
