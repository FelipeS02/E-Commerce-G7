import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./ClotheCard.css";

export default function ClotheCard(props) {
  console.log(props);
  return (
    <div>
      <Link to={`/admin/editClothe/${props.id}`}>
        <div className="clotheCard">
          <div className="cardName">
            <h6>{props.name}</h6>
          </div>

          <h6 className="typeName">{props.types[0].name}</h6>
          {props.categories?.map((e) => {
            return <span>{e.name}</span>;
          })}
          <button className="editClothe">Editar</button>
        </div>
      </Link>
    </div>
  );
}
