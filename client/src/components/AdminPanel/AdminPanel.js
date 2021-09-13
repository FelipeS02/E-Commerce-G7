import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { Link } from "react-router-dom";
import { getOrders } from "../../actions/orderActions.js";
import { getProducts } from '../../actions/ProductActions';
import ClotheCard from "./ClotheCard.js";
import "./AdminPanel.css"
import { Dropdown } from "react-bootstrap"

function AdminPanel(){

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getOrders());
        dispatch(getProducts());
    },[dispatch]);
    
    const arrayOrders = useSelector(state => state.orderState.orders.data);

    const productsState = useSelector(state => state.productsState);
    const { products } = productsState;

    return(
        <div className="general">
            {/*Boton de crear*/}
            <Link to="/admin/createClothe">
                <div className="pageTitle">Crear prenda</div>
            </Link>

            <div className="recuadros">
                {/*Listado de ordenes*/}
                <div className="orders">
                    <h4>Orders</h4>
                    <div className="ordersRecuadro">
                        {
                            arrayOrders ? arrayOrders.map(e => {
                                return (
                                    <div className="orderCard">
                                        <h6>Total: {e.total}</h6>
                                        <h6>Estado: {e.state}</h6>
                                        <Dropdown>
                                        <Dropdown.Toggle variant="success" id="dropdown-basic" className="botonDrop">
                                            Items
                                        </Dropdown.Toggle>

                                        <Dropdown.Menu className="orderDetailDrop">
                                        {
                                            e.clothes.map((i,index) => {
                                                return(
                                                    <Dropdown.Item className="prendasOrder">
                                                        <>
                                                        <h6>Prenda: {i.name}</h6>
                                                        <h6>Talle: {i.quantity_and_size.size} Cantidad: {i.quantity_and_size.quantity}</h6>
                                                        <h6>Precio individual: {i.price}</h6>
                                                        </> 
                                                    </Dropdown.Item>
                                                )
                                            })
                                        }
                                        </Dropdown.Menu>
                                        </Dropdown>
                                    </div>
                                )
                            }): <h3>No hay ordenes en este momento</h3>
                        }
                    </div>
                </div>

                {/*Listado de productos*/}
                <div className="prendas">
                    <h4>Prendas</h4>
                    <div className="prendasRecuadro">
                        {
                            products.allClothes?.map(e => {
                                return(
                                    
                                    <ClotheCard
                                        id={e.id}
                                        name={e.name}
                                        types={e.types}
                                        categories={e.categories}
                                        sizes={e.sizes}
                                    />
                                )
                            })
                        }
                    </div>
                </div>            
            </div>

        </div>
    )
}

export default AdminPanel;