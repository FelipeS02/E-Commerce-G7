import React, { Component, forwardRef } from "react";
import { connect } from "react-redux";
import MaterialTable, { MTableToolbar } from "material-table";
import { BsFillLockFill, BsFillUnlockFill } from "react-icons/bs";
import { FaShieldAlt, FaTimes, FaKey } from "react-icons/fa";
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
import {
  getAllUsers,
  userSetAdmin,
  resetPassword,
  blockUser,
  unblockUser,
} from "../../actions/authActions";
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

class UserList extends Component {
  componentDidMount() {
    this.props.getAllUsers();
  }

  render() {
    const { t } = this.props;
    return (
      <div style={{ width: "70%", margin: "2.5%", marginLeft: "7.5%" }}>
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
            pageSize: 10,
            pageSizeOptions: [10, 15, 20],
          }}
          icons={tableIcons}
          columns={[
            { title: t("Listado-Users.Id"), field: "id", filtering: false },
            {
              title: t("Listado-Users.Nombre"),
              field: "name",
              filtering: false,
            },
            {
              title: t("Listado-Users.Email"),
              field: "email",
              filtering: false,
            },
            {
              title: "isAdmin",
              field: "isAdmin",
              lookup: { true: "TRUE", false: "FALSE" },
            },
          ]}
          actions={[
            (rowData) => ({
              icon: FaShieldAlt,
              tooltip: t("Listado-Users.SetAdmin"),
              onClick: async (event, rowData) => {
                await this.props.userSetAdmin(
                  rowData.id,
                  rowData.email,
                  "addAdmin"
                );
                this.props.getAllUsers();
              },
              disabled: rowData.isAdmin === true,
            }),
            (rowData) => ({
              icon: FaTimes,
              tooltip: t("Listado-Users.RemoveAdmin"),
              onClick: async (event, rowData) => {
                await this.props.userSetAdmin(
                  rowData.id,
                  rowData.email,
                  "removeAdmin"
                );
                await this.props.getAllUsers();
              },
              disabled: rowData.isAdmin === false,
            }),
            {
              icon: FaKey,
              tooltip: t("Listado-Users.ResetPassword"),
              onClick: async (event, rowData) => {
                await this.props.resetPassword(rowData.email);
                await this.props.getAllUsers();
              },
            },
            {
              icon: BsFillLockFill,
              tooltip: t("Listado-Users.BlockUser"),
              onClick: async (event, rowData) => {
                await this.props.blockUser(rowData.email);
                await this.props.getAllUsers();
              },
            },
            {
              icon: BsFillUnlockFill,
              tooltip: t("Listado-Users.UnblockUser"),
              onClick: async (event, rowData) => {
                await this.props.unblockUser(rowData.email);
                await this.props.getAllUsers();
              },
            },
          ]}
          data={this.props?.Data}
          title={t("Listado-Users.ListaOrdenes")}
        />
      </div>
    );
  }
}

function mapStateToProps(state) {
  return { Data: state.userState.allUsers };
}

function mapDispatchToProps(dispatch) {
  return {
    resetPassword: (email) => dispatch(resetPassword(email)),
    getAllUsers: () => dispatch(getAllUsers()),
    userSetAdmin: (id, email, set) => dispatch(userSetAdmin(id, email, set)),
    blockUser: (email) => dispatch(blockUser(email)),
    unblockUser: (email) => dispatch(unblockUser(email)),
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withTranslation("global")(UserList));
