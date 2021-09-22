import axios from "axios";
import swal from "sweetalert";
import {
  GET_CART_SUCCESS,
  PAYMENT_SUCCESS,
  PAYMENT_FAIL,
  PAYMENT_LOADING,
} from "../constants/productConstants";

export const confirmPayment =
  (paymentId, amount, orderId, payment, direction, clothes, userId) =>
  async (dispatch) => {
    dispatch({
      type: PAYMENT_LOADING,
      payload: true,
    });
    try {
      const { data } = await axios.post("/clothe/order-checkout", {
        id: paymentId,
        amount: amount * 100,
      });
      if (data.status !== 202) {
        throw new Error(data.message);
      }

      dispatch(confirmOrder(orderId, payment, direction, clothes, userId));
    } catch (err) {
      swal(
        "Ups... parece que algo salio mal, intenta nuevamente!",
        "",
        "warning"
      );
      dispatch({
        type: PAYMENT_LOADING,
        payload: false,
      });
    }
  };
export const confirmOrder =
  (orderId, payment, direction, clothes, userId) => async (dispatch) => {
    try {
      const { data } = await axios.post("/clothe/order-confirm", {
        data: {
          orderId,
          payment,
          direction,
          clothes,
          userId,
        },
      });
      swal(
        "Pago se proceso correctamente, redirigiendo a pagina principal",
        "",
        "success"
      );

      return dispatch({
        type: PAYMENT_SUCCESS,
      });
    } catch (error) {
      swal(
        "Ups... parece que algo salio mal, Favor de contactar al administrador!",
        "",
        "error"
      );
    }
  };
