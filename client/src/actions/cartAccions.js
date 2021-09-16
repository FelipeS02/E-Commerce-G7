import axios from "axios";
import swal from "sweetalert";

import { GET_CART_SUCCESS } from "../constants/productConstants";
export const addToCart = (obj, id, userId, clothe) => async (dispatch) => {
  if(userId){
    try {
      const { data } = await axios.put("/clothe/order-add", {
        data: {
          size: obj.size,
          quantity: obj.quantity, 
          clotheId: id,
          userId: userId,
        },
      });
      if (data.statusCode !== 200) {
        throw new Error(`${data.data}`);
      }
      swal("Prenda se agrego correctamente al carrito", "", "success");
  
      return dispatch(getOrder(userId, "CARRITO"));
    } catch (err) {
      console.log(err);
    }
  }else {
    let new_quantity_and_size = {
      quantity: obj.quantity,
      size: obj.size
    }
    let newClothe = {
      id,
      name: clothe.name,
      price: clothe.price,
      media: clothe.picture ? [{name: clothe.picture}] : clothe.media,
      quantity_and_size: new_quantity_and_size
    };
    

    if(window.localStorage.getItem('henryShopG7')){
      let carritoLS = JSON.parse( window.localStorage.getItem('henryShopG7') )
      carritoLS[id] = newClothe 
      window.localStorage.setItem('henryShopG7', JSON.stringify(carritoLS))
    } else{
      let newCarritoLS = {}
      newCarritoLS[id] = newClothe
      window.localStorage.setItem('henryShopG7', JSON.stringify(newCarritoLS))
    }
    return dispatch(getOrder(null, "CARRITO"));
  }
};


export const removeFromCart = (obj, orderId, userId) => async (dispatch) => {
  if(userId){
    try {
      const { data } = await axios.put("/clothe/order-delete ", {
        data: {
          orderId: orderId,
          size: obj.quantity_and_size.size,
          clotheId: obj.id,
        },
      });
      if (data.statusCode !== 200) {
        throw new Error(`${data.data}`);
      }
      return dispatch(getOrder(userId, "CARRITO"));
    } catch (err) {
      console.log(err);
    }
  }else {
    let carritoFloat = JSON.parse( window.localStorage.getItem('henryShopG7'));
    delete carritoFloat[obj.id]
    window.localStorage.setItem('henryShopG7', JSON.stringify(carritoFloat))
    return dispatch(getOrder(null, "CARRITO"));
  }
};
export const getOrder = (userId, status) => async (dispatch) => {
  if(userId){
    if(window.localStorage.getItem('henryShopG7')){
      console.log(`Aqui vamos a agregar al carrito`)
      let floatCart = JSON.parse( window.localStorage.getItem('henryShopG7'));
      window.localStorage.clear();
      let dataLS = Object.keys(floatCart);
      let cargarCarrito = dataLS.map(async (c)=>{
        try{
        await axios.put("/clothe/order-add", {
          data: {
              size: floatCart[c].quantity_and_size.size,
              quantity: floatCart[c].quantity_and_size.quantity, 
              clotheId: floatCart[c].id,
              userId: userId,
            },
          });
        } catch (err){
          console.log(err);
        }
      })          
      await Promise.all(cargarCarrito);
    }
    try {
      const { data } = await axios.get(
        `/clothe/users-orders?userId=${userId}&orderStatus=${status}`
      );
      console.log("get order function", data.data[0].orders[0]);
  
      return dispatch({
        type: GET_CART_SUCCESS,
        payload: data.data[0].orders[0],
      });
    } catch (err) {
      console.log(err);
    }
  }else if(window.localStorage.getItem('henryShopG7')&&!userId) {
      let carritoFloat = JSON.parse( window.localStorage.getItem('henryShopG7'));
      let clothes = Object.values(carritoFloat);
      let total = 0;
      clothes.forEach(element => {
        total += parseInt(element.quantity_and_size.quantity)*element.price
      });
      let orderFloat = {
        id: 'order Float',
        payment: null,
        state: "CARRITO_FLOAT",
        clothes,
        total
      };
      console.log(orderFloat)
    return dispatch({
      type: GET_CART_SUCCESS,
      payload: orderFloat,
    })
  }
};
