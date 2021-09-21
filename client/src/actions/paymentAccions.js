import axios from "axios";
import swal from "sweetalert";
import {
  GET_CART_SUCCESS,
  PAYMENT_SUCCESS,
} from "../constants/productConstants";

export const confirmPayment =
  (paymentId, amount, orderId, payment, direction, clothes, userId) =>
  async (dispatch) => {
    try {
      const { data } = await axios.post("/clothe/order-checkout", {
        id: paymentId,
        amount: 10 * 100,
      });
      console.log(orderId);
      console.log(data);
      if (data.status !== 202) {
        throw new Error(data.message);
      }

      dispatch(confirmOrder(orderId, payment, direction, clothes, userId));
    } catch (err) {
      console.log(err);
    }
  };
export const confirmOrder =
  (orderId, payment, direction, clothes, userId) => async (dispatch) => {
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
  };
