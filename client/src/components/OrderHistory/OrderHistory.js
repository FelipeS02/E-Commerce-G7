import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getOrders } from "../../actions/orderActions";
import Loading from "../Loading/Loading";


const OrderHistory = () => {

  const userState = useSelector((state) => state.userState);
  const orderState = useSelector((state) => state.orderState);
  const dispatch = useDispatch();
  const id = userState.userInfo.id;
  const { loginUserInfo } = userState
  const users = orderState.orders.data?.data[0].orders;
  console.log(users)
    useEffect(() => {
        if(id){
          dispatch(getOrders(id,''));
        }
    },[dispatch,id])
    
    if(loginUserInfo){
         return <Loading/>
    }

    return (
            <div>
              {
                users?.map((user,index)=>(
                  <div key ={index}>{
                    `Orden número ${index+1}`}
                    {
                      user.clothes?.map((clothe,index) => (
                        <div key={index}>
                        {clothe.name}
                        {clothe.id}
                        {clothe.price}
                        </div>
                      ))
                    }
                  </div>
                 
                ))
              }
            </div>
       
    )
}

export default OrderHistory;
