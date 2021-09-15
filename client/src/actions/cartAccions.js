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
      color: clothe.color,
      genre: clothe.genre,
      detail: clothe.detail,
      media: clothe.media,
      quantity_and_size: new_quantity_and_size
    };
    

    if(window.localStorage.getItem('henryShopG7')){
      let carritoLS = JSON.parse( window.localStorage.getItem('henryShopG7') )
      carritoLS.clothes = carritoLS.clothes.concat 
      window.localStorage.setItem('henryShopG7', JSON.stringify(carritoLS))
    } else{
      let newCarritoLS = {
        id: 'carFloaqt',
        clothes: [newClothe],
        total: newClothe.price*newClothe.quantity_and_size.quantity
      }
      
      newCarritoLS[id] = obj
      window.localStorage.setItem('henryShopG7', JSON.stringify(newCarritoLS))
    }
    // let responsive = JSON.parse( window.localStorage.getItem('henryShopG7') ) 
    // console.log(responsive)
    return dispatch(getOrder(null, "CARRITO"));
  }
};


export const removeFromCart = (obj, orderId, userId) => async (dispatch) => {
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
};
export const getOrder = (userId, status) => async (dispatch) => {
  if(userId){
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
  }else {
    let carFloat = JSON.parse(window.localStorage.getItem('henryShopG7'))
    let keysCarFloat = Object.keys(carFloat)
  }
};
