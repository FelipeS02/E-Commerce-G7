import React, { useState } from "react";
import {Link} from "react-router-dom";

export default function ClotheCard(props){
	console.log(props)
	return (
		<div>
			<Link to={`/admin/editClothe/${props.id}`}>
				<h6>{props.name}</h6>
			</Link>
		</div>
	)
}