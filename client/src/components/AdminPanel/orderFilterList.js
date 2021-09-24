import React, { Component, forwardRef } from "react";
import { connect } from "react-redux";
import MaterialTable, { MTableToolbar } from "material-table";
import {
  Save,
  AddBox,
  ArrowDownward,
  Check,
  ChevronLeft,
  Search,
  ChevronRight,
  Clear,
  DeleteOutline,
  Edit,
  FilterList,
  FirstPage,
  LastPage,
  Remove,
  SaveAlt,
  ViewColumn,
} from "@material-ui/icons";
import { getAllOrders, orderStateUpdate } from "../../actions/orderActions";
import { withTranslation } from "react-i18next";

const tableIcons = {
  Add: forwardRef((props, ref) => <AddBox {...props} ref={ref} />),
  Check: forwardRef((props, ref) => <Check {...props} ref={ref} />),
  Clear: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
  Delete: forwardRef((props, ref) => <DeleteOutline {...props} ref={ref} />),
  DetailPanel: forwardRef((props, ref) => (
    <ChevronRight {...props} ref={ref} />
  )),
  Edit: forwardRef((props, ref) => <Edit {...props} ref={ref} />),
  Save: forwardRef((props, ref) => <Save {...props} ref={ref} />),
  Export: forwardRef((props, ref) => <SaveAlt {...props} ref={ref} />),
  Filter: forwardRef((props, ref) => <FilterList {...props} ref={ref} />),
  FirstPage: forwardRef((props, ref) => <FirstPage {...props} ref={ref} />),
  LastPage: forwardRef((props, ref) => <LastPage {...props} ref={ref} />),
  NextPage: forwardRef((props, ref) => <ChevronRight {...props} ref={ref} />),
  PreviousPage: forwardRef((props, ref) => (
    <ChevronLeft {...props} ref={ref} />
  )),
  ResetSearch: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
  Search: forwardRef((props, ref) => <Search {...props} ref={ref} />),
  SortArrow: forwardRef((props, ref) => <ArrowDownward {...props} ref={ref} />),
  ThirdStateCheck: forwardRef((props, ref) => <Remove {...props} ref={ref} />),
  ViewColumn: forwardRef((props, ref) => <ViewColumn {...props} ref={ref} />),
};

class ListDetail extends Component {
  componentDidMount() {
    this.props.getAllOrders();
  }

  render() {
    const { t } = this.props;
    return (
      <div style={{ width: "70%", margin: "2.5%", marginLeft: "7.5%"}}>
        <MaterialTable
          components={{
            Toolbar: (props) => (
              <div style={{ backgroundColor: "#A8F2CA" }}>
                <MTableToolbar {...props} />
              </div>
            ),
          }}
          options={{
            filtering: true,
            pageSize: 7,
            pageSizeOptions: [7, 10, 14],
          }}
          icons={tableIcons}
          columns={[
            {
              title: t("ListaOrdenes.NumOrden"),
              field: "id",
              filtering: false,
            },
            {
              title: t("ListaOrdenes.Estado"),
              field: "state",
              lookup: {
                CARRITO: "EN PROCESO",
                CONFIRMADO: "CONFIRMADO",
                DESPACHADO: "DESPACHADO",
                CANCELADO: "CANCELADO",
                ENTREGADO: "ENTREGADO",
              },
            },
            {
              title: t("ListaOrdenes.Total"),
              field: "total",
              type: "numeric",
              filtering: false,
            },
            {
              title: t("ListaOrdenes.UltAct"),
              field: "birthCity",
              filtering: false,
            },
          ]}
          actions={[
            {
              icon: "ShowTitle",
              tooltip: t("ListaOrdenes.Cancelar"),
              onClick: async (event, rowData) => {
                await this.props.orderStateUpdate(rowData.id, "CANCELADO");
                this.props.getAllOrders();
              },
            },
            {
              icon: "ShowTitle",
              tooltip: t("ListaOrdenes.Despachar"),
              onClick: async (event, rowData) => {
                await this.props.orderStateUpdate(rowData.id, "DESPACHADO");
                this.props.getAllOrders();
              },
            },
            {
              icon: "ShowTitle",
              tooltip: t("ListaOrdenes.Entregado"),
              onClick: async (event, rowData) => {
                await this.props.orderStateUpdate(rowData.id, "ENTREGADO");
                this.props.getAllOrders();
              },
            },
          ]}
          data={this.props.Data}
          title={t("ListaOrdenes.Titulo")}
          detailPanel={(rowData) => {
            return (
              <table style={{ textAlign: "center", margin: "1rem" }}>
                <tr>
                  <th
                    style={{
                      border: "1px solid black",
                      width: "25rem",
                      background: "#C5F3F3",
                    }}
                  >
                    Prenda
                  </th>
                  <th
                    style={{
                      border: "1px solid black",
                      width: "3rem",
                      background: "#C5F3F3",
                    }}
                  >
                    Talle
                  </th>
                  <th
                    style={{
                      border: "1px solid black",
                      width: "3rem",
                      background: "#C5F3F3",
                    }}
                  >
                    Cant
                  </th>
                  <th
                    style={{
                      border: "1px solid black",
                      width: "6rem",
                      background: "#C5F3F3",
                    }}
                  >
                    Precio
                  </th>
                  <th
                    style={{
                      border: "1px solid black",
                      width: "7rem",
                      background: "#C5F3F3",
                    }}
                  >
                    Total
                  </th>
                </tr>
                {rowData.clothes.map((c) => (
                  <tr>
                    <th
                      style={{
                        border: "1px solid black",
                        width: "25rem",
                        textAlign: "left",
                      }}
                    >
                      {c.name}
                    </th>
                    <th style={{ border: "1px solid black", width: "2rem" }}>
                      {c.quantity_and_size.size}
                    </th>
                    <th style={{ border: "1px solid black", width: "2rem" }}>
                      {c.quantity_and_size.quantity}
                    </th>
                    <th
                      style={{
                        border: "1px solid black",
                        width: "5rem",
                        textAlign: "right",
                      }}
                    >
                      {c.price}
                    </th>
                    <th
                      style={{
                        border: "1px solid black",
                        width: "6rem",
                        textAlign: "right",
                      }}
                    >
                      {c.price * c.quantity_and_size.quantity}
                    </th>
                  </tr>
                ))}
              </table>
            );
          }}
        />
      </div>
    );
  }
}

function mapStateToProps(state) {
  return { Data: state.orderState.orders.data };
}

function mapDispatchToProps(dispatch) {
  return {
    getAllOrders: () => dispatch(getAllOrders()),
    orderStateUpdate: (id, state) => dispatch(orderStateUpdate(id, state)),
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withTranslation("global")(ListDetail));
