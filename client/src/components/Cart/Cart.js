import React, { useEffect } from "react";
import {
  Button,
  Col,
  ListGroup,
  OverlayTrigger,
  Popover,
  Row,
} from "react-bootstrap";
import { FaShoppingCart, FaRegTrashAlt } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { getOrder, removeFromCart } from "../../actions/cartAccions";

const Cart = () => {
  const dispatch = useDispatch();
  const cartState = useSelector((state) => state.cartState);
  const { totalItems, carItems, carTotalAmount, orderId } = cartState;
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
          <h6>No hay productos en el carrito.</h6>
        ) : (
          <ListGroup>
            {carItems?.map((item, index) => (
              <ListGroup.Item
                key={index}
                className="justify-content-end align-items-center"
              >
                <Row>
                  <Col>
                    <Col></Col>
                    <Col>
                      <Row>{item.name}</Row>
                      <Row>{`${item.quantity_and_size.quantity}x$${item.price}`}</Row>
                    </Col>
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
          <Button className="my">Check out</Button>
        </Popover.Content>
      )}
    </Popover>
  );
  return (
    <OverlayTrigger
      trigger="click"
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
