import React, { Component, forwardRef } from "react";
import { connect } from "react-redux";
import MaterialTable, {MTableToolbar} from "material-table";
import {  Save, AddBox, ArrowDownward, Check, ChevronLeft, Search, ChevronRight, Clear, DeleteOutline, Edit, FilterList, FirstPage, LastPage, Remove, SaveAlt, ViewColumn } from '@material-ui/icons';
import { getOrders, orderStateUpdate } from "../../actions/orderActions";


const tableIcons = {
    Add: forwardRef((props, ref) => <AddBox {...props} ref={ref} />),
    Check: forwardRef((props, ref) => <Check {...props} ref={ref} />),
    Clear: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
    Delete: forwardRef((props, ref) => <DeleteOutline {...props} ref={ref} />),
    DetailPanel: forwardRef((props, ref) => <ChevronRight {...props} ref={ref} />),
    Edit: forwardRef((props, ref) => <Edit {...props} ref={ref} />),
    Save: forwardRef((props, ref) => <Save {...props} ref={ref}/>),
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
    componentDidMount(){
        this.props.getOrders()
    }

    render() {
        return (
            <div style={{ width: "100%", margin: '1.5rem' }}>
                <MaterialTable
                    components={{
                        Toolbar: props => (
                            <div style={{ backgroundColor: '#A8F2CA' }}>
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
                actions={[
                    {
                        icon: 'ShowTitle',
                        tooltip: 'Cancelar Pedido',
                        onClick: async (event, rowData) => {
                            await this.props.orderStateUpdate(rowData.id, 'CANCELADO')
                            this.props.getOrders()
                        }
                    },
                    {
                        icon: 'ShowTitle',
                        tooltip: 'Despachar Pedido',
                        onClick: async (event, rowData) => {
                            await this.props.orderStateUpdate(rowData.id, 'DESPACHADO')
                            this.props.getOrders()
                        }
                    },
                    {
                        icon: 'ShowTitle',
                        tooltip: 'Entregado',
                        onClick: async (event, rowData) => {
                            await this.props.orderStateUpdate(rowData.id, 'ENTREGADO')
                            this.props.getOrders()
                        }
                    }
                ]}
                data={this.props.Data}
                title="Lista de ordenes"
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

function mapStateToProps(state){
    return { Data: state.orderState.orders.data}
}

function mapDispatchToProps(dispatch) {
    return {
        getOrders: () => dispatch(getOrders()),
        orderStateUpdate: (id, state) => dispatch(orderStateUpdate(id, state))
    };
}


export default connect(mapStateToProps, mapDispatchToProps)(ListDetail);