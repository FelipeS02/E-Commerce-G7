import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getOrders } from "../../actions/orderActions";
import Loading from "../Loading/Loading";
import Modal from 'react-bootstrap/Modal'
import { Button, Container, Row, Col, Table } from "react-bootstrap";
import 'bootstrap/dist/css/bootstrap.min.css';

const OrderHistory = () => {

  const [show, setShow] = useState(false);
  const [data, setData] = useState({
    quantity: 0,
    id:0,
    name:'',
    date: '',
    time:'',
    size:''
  });

  const userState = useSelector((state) => state.userState);
  const orderState = useSelector((state) => state.orderState);
  const dispatch = useDispatch();
  const id = userState.userInfo.id;
  const { loginUserInfo } = userState;
  const orders = orderState.orders;

    useEffect(() => {
        if(id){
          dispatch(getOrders(id,''));
        }
    },[dispatch,id])
    
    if(loginUserInfo){
         return <Loading/>
    }
    
  const handleClose = () => setShow(false);
  const handleShow = (e) => {
            setShow(true);
            let obj =  JSON.parse(e.target.value)
            let date = new Date(obj.date);
            let year = date.getFullYear();
            let month = date.getMonth()+1;
            let getDate = date.getDate();
            
            if(month < 10) month = '0'+month;
            if(getDate < 10) getDate = '0'+getDate;
            
            const dateFormat = year+'-'+month+'-'+getDate;
            
            let hours = date.getHours();
            let minutes = date.getMinutes();
            
            if(minutes < 10) minutes = '0'+minutes;
            if(hours < 10) hours = '0'+hours;
            
            const timeFormat = hours+':'+minutes;
            
            console.log(dateFormat);
            
            setData({
                 quantity: obj.clothe.quantity_and_size.quantity,
                 id: obj.clothe.id,
                 name: obj.clothe.name,
                 date: dateFormat,
                 time: timeFormat,
                 size: obj.clothe.quantity_and_size.size
               })
            }


  return (
    <Container className='m-5'>
        <Table variant="dark" striped bordered hover>
          <thead>
            <tr>
              <th>Número de orden</th>
              <th>Prendas</th>
            </tr>
          </thead>
          <tbody>
            {orders?.map((order,index)=>(
              <tr key={index}>
                <td>{`Orden número ${index + 1}`}</td>
                  {order.clothes?.map((clothe, i) => (
                    <Button key={i} variant="success" onClick={(e) => handleShow(e)} value={JSON.stringify({ clothe, date: order.updatedAt })}>
                      {clothe.name}
                    </Button>
                  ))}
              </tr>
            ))}
          </tbody>
        </Table>
                  <Modal show={show} onHide={handleClose}>
                  <Modal.Header closeButton>
                    <Modal.Title>Detalle de la orden</Modal.Title>
                  </Modal.Header>
                  <Modal.Body>
                    <Link to={`/search/details/${data.id}`}>{data.name}</Link>
                    <div>Talle: {data.size}</div>
                    <div>Cantidad:{data.quantity}</div>
                    <div>Fecha de la compra: {data.date}</div>
                    <div>Hora de la compra: {data.time}</div>
                  </Modal.Body>
                  <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                      OK
                    </Button>
                  </Modal.Footer>
                </Modal>
      </Container>
    )
}
export default OrderHistory;
