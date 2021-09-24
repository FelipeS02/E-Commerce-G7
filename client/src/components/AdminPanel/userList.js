import React, { Component, forwardRef } from "react";
import { connect } from "react-redux";
import MaterialTable, {MTableToolbar} from "material-table";
import {  Save, AddBox, ArrowDownward, Check, ChevronLeft, Search, ChevronRight, Clear, DeleteOutline, Edit, FilterList, FirstPage, LastPage, Remove, SaveAlt, ViewColumn } from '@material-ui/icons';
import { getAllUsers, userSetAdmin } from "../../actions/authActions";


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

class UserList extends Component {
    componentDidMount(){
        this.props.getAllUsers()
    }

    render() {
        return (
            <div style={{ width: "70%", margin: "2.5%"}}>
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
                    { title: 'Id usuario', field: 'id',  filtering: false },
                    { title: 'Nombre usuario', field: 'name', filtering: false },
                    { title: 'Email', field: 'email',  filtering: false },
                    { title: 'isAdmin', field: 'isAdmin', lookup: { 'true': 'TRUE', "false": "FALSE" }},
                ]}
                actions={[
                    {
                        icon: 'ShowTitle',
                        tooltip: 'set admin',
                        onClick: async (event, rowData) => {
                            console.log('empezamos')
                            await this.props.userSetAdmin(rowData.id, rowData.email, 'addAdmin')
                            this.props.getAllUsers()
                        }
                    },
                    {
                        icon: 'ShowTitle',
                        tooltip: 'remove admin',
                        onClick: async (event, rowData) => {
                            await this.props.userSetAdmin(rowData.id, rowData.email, 'removeAdmin')
                            this.props.getAllUsers()
                        }
                    },
                    {
                        icon: 'ShowTitle',
                        tooltip: 'Entregado',
                        onClick: async (event, rowData) => {
                            // await this.props.orderStateUpdate(rowData.id, 'ENTREGADO')
                            this.props.getAllUsers()
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
    return { Data: state.userState.allUsers}
}

function mapDispatchToProps(dispatch) {
    return {
        getAllUsers: () => dispatch(getAllUsers()),
        userSetAdmin: (id, email, set) => dispatch(userSetAdmin(id, email, set))
    };
}


export default connect(mapStateToProps, mapDispatchToProps)(UserList);