import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from 'react-redux';
import {orderDetail, orderModified} from "../../../actions/orderActions.js";
import { addToCart, removeFromCart } from "../../../actions/cartAccions";
import {
  Button,
  Card,
  Col,
  Container,
  Form,
  Image,
  Row,
} from "react-bootstrap";
import { Link } from "react-router-dom";
import { BASE_IMG_URL } from "../../../constants/productConstants";
import { FaRegTrashAlt, FaArrowLeft } from "react-icons/fa";

export default function OrderEdit(props){
	const {id} = props.match.params;
	const dispatch = useDispatch();

 	const userState = useSelector((state) => state.userState);
  	const { userInfo } = userState;

	const detail = useSelector(state => state.orderState.orderDetail);
	const {direction, payment, total, userId, clothes, state} = detail;

	const itemHandler = (obj, itemId, userId, clothe) => {
		console.log(obj, itemId);
	   	dispatch(addToCart(obj, itemId, userId, clothe));
	};
	const removeItemHandler = (itemId) => {
		dispatch(removeFromCart(itemId, id, userId));
	};

	const confirmOrderEdit = (id, orderState, clothes) => {
		dispatch(orderModified(id, orderState, clothes))
	}

	useEffect(() => {
		dispatch(orderDetail(id))
	}, [dispatch])

 	return (
	    <Container className="my-5">
	      <Row>
	        <Col>
	          <Card>
	            <Card.Header className="text-center">
	              {" "}
	              <h4 className="my-3">Orden numero: <h6>{id}</h6></h4>
	            </Card.Header>
	            <Card.Body>
	              {clothes?.map((item) => (
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
	                          userId,
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
	                  <h6>{clothes} articulos</h6>
	                </Col>
	                <Col>
	                  <h6>Total: ${clothes === 0 ? 0 : total}</h6>
	                </Col>
	              </Row>
	            </Card.Body>
	            <Card.Body>
	              <Row>
	                <Button variant="primary" onClick={confirmOrderEdit(id, state, clothes)}>Confirmar Cambios</Button>
	              </Row>
	            </Card.Body>
	          </Card>
	        </Col>
	      </Row>
	      <Button variant="primary" className="my-2" as={Link} to="/admin">
	        <Col>
	          {" "}
	          <FaArrowLeft />
	        </Col>
	      </Button>
	    </Container>
	);
}