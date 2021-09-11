import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { Link } from "react-router-dom";
import { getOrders } from "../../actions/orderActions.js";
import { getProducts } from '../../actions/ProductActions';
import ClotheCard from "./ClotheCard.js";

function AdminPanel(){

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getOrders());
        dispatch(getProducts());
    },[dispatch]);
    
    const arrayOrders = useSelector(state => state.orderState.orders.data);

    const productsState = useSelector(state => state.productsState);
    const { products } = productsState;


    console.log("sfasfasfasfasfasfasfasf")
    return(
        <div>
            {/*Boton de crear*/}
            <Link to="/admin/createClothe">
                <div>Crear prenda</div>
            </Link>

            {/*Listado de ordenes*/}
            <div>
                <h4>Orders</h4>
                <div>
                    {
                        arrayOrders?.map(e => {
                            return (
                                <span>{e.name} || {e.email} </span>
                            )
                        })
                    }
                </div>
            </div>

            {/*Listado de productos*/}
            <div>
                <h4>Prendas</h4>
                <div>
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