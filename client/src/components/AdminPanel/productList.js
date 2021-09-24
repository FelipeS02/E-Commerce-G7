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
import { getProductsAdmin } from "../../actions/ProductActions";
import { Link } from "react-router-dom";
import { withTranslation } from "react-i18next";
import LogoScrean from "./LogoScrean";

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

class ProductList extends Component {
  componentDidMount() {
    this.props.getProductsAdmin();
  }
  render() {
    const { t, Products } = this.props;
    if (Products?.length > 0) {
      return (
        <div
          style={{
            width: "70%",
            margin: "2.5%",
            marginLeft: "7.5%",
          }}
        >
          <MaterialTable
            components={{
              Toolbar: (props) => (
                <div style={{ backgroundColor: "#A8F2CA" }}>
                  <MTableToolbar {...props} />
                </div>
              ),
            }}
            icons={tableIcons}
            options={{
              pageSize: 10,
              pageSizeOptions: [10, 15, 20],
            }}
            columns={[
              { title: "Id", field: "id", type:"numeric" },
              { title: t("ListaPrendas.Nombre"), field: "name" },
              {
                title: t("ListaPrendas.Precio"),
                field: "price",
                type: "numeric",
              },
            ]}
            actions={[
              (rowData) => ({
                icon: () => (
                  <Link to={`/admin/editClothe/${rowData.id}`}>
                    <Edit style={{color: "gray"}}/>
                  </Link>
                ),
                tooltip: t("ListaPrendas.EditarProd"),
                onClick: rowData,
              }),
            ]}
            data={this.props.Products}
            title={t("ListaPrendas.Titulo")}
          />
        </div>
      );
    } else {
      return (
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            marginLeft: "20%",
          }}
        >
          <LogoScrean/>
          <h1 style={{ paddingTop: "20px", marginLeft: "50px" }}>
            {t("History.NoHay")}
          </h1>
        </div>
      );
    }
  }
}

function mapStateToProps(state) {
  return { Products: state.productsState.products.allClothes };
}

function mapDispatchToProps(dispatch) {
  return {
    getProductsAdmin: () => dispatch(getProductsAdmin()),
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withTranslation("global")(ProductList));
