// import React, { useEffect, useState } from "react";
// import { useDispatch, useSelector } from 'react-redux';
// import { createClothe, getCategories } from "../../actions/ProductActions";
// import { validate } from './validateCreate'
// import { Form, Button } from "react-bootstrap"
// import { Link, useHistory } from "react-router-dom";
// import swal from 'sweetalert';
// import {MaterialTable} from "material-table"
// import AddBox from "@material-ui/icons/AddBox";
// import ArrowDownward from "@material-ui/icons/ArrowDownward";

// function ListDetail(){
    
    //  const togglePanel= ()=>{}
    
    
    
    //////////
    import React, { Component, forwardRef } from "react";
    import ReactDOM from "react-dom";
    import MaterialTable, {MTableToolbar} from "material-table";
    import { AddBox, ArrowDownward, Check, ChevronLeft, Search, ChevronRight, Clear, DeleteOutline, Edit, FilterList, FirstPage, LastPage, Remove, SaveAlt, ViewColumn } from '@material-ui/icons';


const tableIcons = {
    Add: forwardRef((props, ref) => <AddBox {...props} ref={ref} />),
    Check: forwardRef((props, ref) => <Check {...props} ref={ref} />),
    Clear: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
    Delete: forwardRef((props, ref) => <DeleteOutline {...props} ref={ref} />),
    DetailPanel: forwardRef((props, ref) => <ChevronRight {...props} ref={ref} />),
    Edit: forwardRef((props, ref) => <Edit {...props} ref={ref} />),
    Export: forwardRef((props, ref) => <SaveAlt {...props} ref={ref} />),
    Filter: forwardRef((props, ref) => <FilterList {...props} ref={ref} />),
    FirstPage: forwardRef((props, ref) => <FirstPage {...props} ref={ref} />),
    LastPage: forwardRef((props, ref) => <LastPage {...props} ref={ref} />),
    NextPage: forwardRef((props, ref) => <ChevronRight {...props} ref={ref} />),
    PreviousPage: forwardRef((props, ref) => <ChevronLeft {...props} ref={ref} />),
    ResetSearch: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
    Search: forwardRef((props, ref) => <Search {...props} ref={ref} />),
    SortArrow: forwardRef((props, ref) => <ArrowDownward {...props} ref={ref} />),
    ThirdStateCheck: forwardRef((props, ref) => <Remove {...props} ref={ref} />),
    ViewColumn: forwardRef((props, ref) => <ViewColumn {...props} ref={ref} />)
  };

    class ListDetail extends Component {
        //
        //
        render() {
            return (
                
                <div style={{ maxWidth: "100%" }}>
         <MaterialTable
    components={{
        Toolbar: props => (
            <div style={{ backgroundColor: 'green' }}>
                <MTableToolbar {...props} />
            </div>
        )
    }}
    options={{
        filtering: true
      }}
    icons={tableIcons}
         columns={[
             { title: 'Numero de orden', field: 'id',  filtering: false },
             { title: 'Estado de orden', field: 'state', lookup: { 'CARRITO': 'EN PROCESO', "CONFIRMADO": "CONFIRMADO", "DESPACHADO": "DESPACHADO", "CANCELADO": "CANCELADO", "ENTREGADO": "ENTREGADO"} },
             { title: 'Total compra ($)', field: 'total', type: 'numeric',  filtering: false },
             { title: 'Ultima actualización', field: 'birthCity',  filtering: false },
            ]}
            data=
            {[
                {
                id:"9206adf4-acdf-466a-b0bb-ba37dc79508d",
                state:"CARRITO",
                total:40846,
                payment:null,
                direction:null,
                clothes: [
                    {
                        id :4,
                        name:"REMERA LEFT COAST O'NEILL",
                        price:2138,
                        color:"negro",
                        genre:"Masculino",
                        detail:"Remera manga corta, escote redondo con ribb a tono. Estampa en el frente. Material 100% algodón. Calce regular",
                        quantity_and_size:{
                            quantity:4,
                            size:"L"
                        }
                    },
                    {
                        id:31,
                        name:"REMERA HENRY",
                        price:1500,
                        color:"azul",
                        genre:"Masculino",
                        detail:"Remera re piola, de herny con una estampa de henry re piola,",
                        quantity_and_size:{
                            quantity:3,
                            size:"M"
                        }
                    }
                ]},
                {
                id:"18897984-551c-45a4-bf28-a149068384f7",
                state:"ENTREGADO",
                total:15384,
                payment:null,
                direction:null,
                clothes: [
                    {
                        id:2,
                        name:"REMERA RETRO O'NEILL",
                        price:2138,
                        color:"blanco",
                        genre:"Femenino",
                        detail:"- Remera manga corta, escote redondo con ribb a tono, Estampa 1 color en frente. - Calce: Clasica Oversize Material Algodon / Viscosa",
                        quantity_and_size:{
                            quantity:2,
                            size:"L"
                        }
                    }
                ]
                },
                {
                id:"ae2a5785-8c6c-4132-8500-d123168f9830",
                state:"CARRITO",
                total:2138,
                payment:null,
                direction:null,
                clothes: [
                    {
                    id:2,
                    name:"REMERA RETRO O'NEILL",
                    price:2138,
                    color:"blanco",
                    genre:"Femenino",
                    detail:"- Remera manga corta, escote redondo con ribb a tono, Estampa 1 color en frente. - Calce: Clasica Oversize Material Algodon / Viscosa",
                    quantity_and_size:{
                        quantity:1,
                        size:"L"
                        }
                    }
                    ]
                },
                {
                    id:"fdad147c-a6bc-47c9-9f61-7d591dbdbcf6",
                    state:"CARRITO",
                    total:107549,
                    payment:null,
                    direction:null,
                    clothes: [
                        {
                        id:8,
                        name:"CAMPERA ONTARIO O'NEILL",
                        price:14400,
                        color:"amarillo",
                        genre:"Femenino",
                        detail:"Campera urbana femenina con canelones y capucha. Abertura cierre plástico. Cintura y puños con elástico. Calce: regular a la cadera. Material 100% Poliester.",
                        quantity_and_size:{
                            quantity:2,
                            size:"XS"
                            }
                        },         
                        {
                        id:8,
                        name:"CAMPERA ONTARIO O'NEILL",
                        price:14400,
                        color:"amarillo",
                        genre:"Femenino",
                        detail:"Campera urbana femenina con canelones y capucha. Abertura cierre plástico. Cintura y puños con elástico. Calce: regular a la cadera. Material 100% Poliester.",
                        quantity_and_size:{
                            quantity:2,
                            size:"XS"
                            }
                        },
                        {
                        id:2,
                        name:"REMERA RETRO O'NEILL",
                        price:2138,
                        color:"blanco",
                        genre:"Femenino",
                        detail:"- Remera manga corta, escote redondo con ribb a tono, Estampa 1 color en frente. - Calce: Clasica Oversize Material Algodon / Viscosa",
                        quantity_and_size:{
                            quantity:9,
                            size:"L"
                            }
                        },
                        {
                        id:29,
                        name:"CAMISA DORY O'NEILL",
                        price:6999,
                        color:"azul",
                        genre:"Masculino",
                        detail:"Camisa manga larga tipo leñadora de viyela MATERIALES 100% Algodón",
                        quantity_and_size:{
                            quantity:1,
                            size:"XS"
                            }
                        },
                        {
                        id:25,
                        name:"CAMPERA GALA O'NEILL",
                        price:11600,
                        color:"azul marino",
                        genre:"Masculino",
                        detail:"Campera con capucha ajustable. Canelones anchos y cierre central plástico. Dos bolsillos con botones a presión y puños regulables con velcro. MATERIALES Relleno 100% Silicona.",
                        quantity_and_size:{
                            quantity:1,
                            size:"M"
                            }
                        },
                        {
                        id:4,
                        name:"REMERA LEFT COAST O'NEILL",
                        price:2138,
                        color:"negro",
                        genre:"Masculino",
                        detail:"Remera manga corta, escote redondo con ribb a tono. Estampa en el frente. Material 100% algodón. Calce regular",
                        quantity_and_size:{
                            quantity:1,
                            size:"XS"
                            }
                        }
                        ]
                }
            ]}


         title="Detail Orders Panel"
         detailPanel={rowData => {
            return (
                <table style={{ textAlign: 'center', margin: '1rem'}}>
                    <tr>
                        <th style={{ border: '1px solid black', width: '25rem', background:'#C5F3F3' }}>Prenda</th>
                        <th style={{ border: '1px solid black', width: '3rem', background:'#C5F3F3' }}>Talle</th>
                        <th style={{ border: '1px solid black', width: '3rem', background:'#C5F3F3' }}>Cant</th>
                        <th style={{ border: '1px solid black', width: '6rem', background:'#C5F3F3' }}>Precio</th>
                        <th style={{ border: '1px solid black', width: '7rem', background:'#C5F3F3' }}>Total</th>
                    </tr>
                    
                    {rowData.clothes.map(c=>(
                                        <tr>
                                            <th style={{ border: '1px solid black', width: '25rem', textAlign: 'left' }}>{c.name}</th>
                                            <th style={{ border: '1px solid black', width: '2rem' }}>{c.quantity_and_size.size}</th>
                                            <th style={{ border: '1px solid black', width: '2rem' }}>{c.quantity_and_size.quantity}</th>
                                            <th style={{ border: '1px solid black', width: '5rem', textAlign: 'right' }}>{c.price}</th>
                                            <th style={{ border: '1px solid black', width: '6rem', textAlign: 'right' }}>{c.price*c.quantity_and_size.quantity}</th>
                                        </tr>
                    ))}
              </table>
            )
          }}
       
        
       />
      </div>
    );
  }
}
export default ListDetail;