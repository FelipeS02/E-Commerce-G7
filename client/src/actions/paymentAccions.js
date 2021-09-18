import axios from "axios";
export const confirmPayment = async (
  paymentId,
  amount,
  orderId,
  payment,
  direction,
  clothes,
  userId
) => {
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

    confirmOrder(orderId, payment, direction, clothes, userId);
  } catch (err) {
    console.log(err);
  }
};
export const confirmOrder = async (
  orderId,
  payment,
  direction,
  clothes,
  userId
) => {
  const { data } = await axios.post("/clothe/order-confirm", {
    data: {
      orderId,
      payment,
      direction,
      clothes,
      userId,
    },
  });
  console.log(data);
};
