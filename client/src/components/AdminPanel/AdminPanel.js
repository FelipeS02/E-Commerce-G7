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
                <div className="pagetitle">Crear prenda</div>
            </Link>

            <div className="recuadros">
                {/*Listado de ordenes*/}
                <div className="orders">
                    <h4>Orders</h4>
                    <div className="ordersRecuadro">
                        {
                            arrayOrders?arrayOrders.map(e => {
                                return (
                                    <div className="orderCard">
                                        <h5>Total: {e.total}</h5>
                                        <h5>Estado: {e.state}</h5>
                                        <Dropdown>
                                        <Dropdown.Toggle variant="success" id="dropdown-basic">
                                            Items
                                        </Dropdown.Toggle>

                                        <Dropdown.Menu>
                                        {
                                            e.clothes.map((i,index) => {
                                                return(
                                                    <Dropdown.Item >
                                                        <>
                                                        <h5>Prenda:{i.name}</h5>
                                                        <h5>Talle:{i.quantity_and_size.size} Cantidad:{i.quantity_and_size.quantity}</h5>
                                                        </> 
                                                    </Dropdown.Item>
                                                )}
                                                )
                                            })
                            

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


  //   const dispatch = useDispatch();



  //   useEffect(() => {
  //       dispatch(getProducts());
  //   },[dispatch]);


  //   return (
  //   <div>
  //     <h3>Prendas para editar</h3>
  //     <div>
  //       {
  //           products.allClothes?.forEach(e => {

  //               return (
  //                   <Link to={`admin/editClothe/${id}`}>
  //                       <span>{e.name} || {e.price} || {e.sizes}</span>
  //                   </Link>
  //               )
  //           })
  //       }
  //     </div>
  //   </div>
  // );