import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from 'react-redux';
import {orderDetail, orderModified} from "../../../actions/orderActions.js"

export default function OrderEdit(props){
	const {id} = props.match.params;

	return (
		<h1>{id}</h1>
	)
}