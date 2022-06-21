import React, { Fragment, useEffect , useState } from "react";
import { DataGrid } from "@mui/x-data-grid";
import "./ProductList.css";
import { useSelector, useDispatch } from "react-redux";
// import {
//     clearErrors,
//     getAllOrders,
//     deleteOrder
// } from "../../state/action-creators/orderAction";
import { Link } from "react-router-dom";
import { useAlert } from "react-alert";
import { Button } from "@material-ui/core";
import EditIcon from "@material-ui/icons/Edit";
import SideBar from "./Sidebar";
import { useNavigate } from "react-router-dom";
import {ecommerce , address} from '../../configurations/web3'
const Web3 = require('web3');
const OrderList = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const alert = useAlert();

    // const { error, orders } = useSelector((state) => state.allOrdersReducer);

    const [error , setError] = useState(false);
    const [orders , setOrders] = useState([]);
    useEffect(() => {
        if (error) {
            alert.error(error);
            setError(false);
        }
        ecommerce.methods.getSellerOrders().call({ from: address })
        .then((orders) => {
            setOrders(orders);
            
        })
       
    }, [error]);
    console.log("orders" , orders);

    const columns = [
        { field: "id", headerName: "Order ID", minWidth: 200 },

        {
            field: "status",
            headerName: "Status",
            minWidth: 150,
            cellClassName: (params) => {
                return params.getValue(params.id, "status") === "Delivered"
                    ? "greenColor"
                    : "redColor";
            },
        },
        {
            field: "itemsQty",
            headerName: "Item Qty",
            type: "number",
            minWidth: 150,
        },

        {
            field: "amount",
            headerName: "Amount",
            type: "number",
            minWidth: 270,
            flex: 0.5,
        },

        {
            field: "actions",
            headerName: "Actions",
            minWidth: 150,
            type: "number",
            sortable: false,
            renderCell: (params) => {
                return (
                    <Fragment>
                        <Link to={`/seller/order/${params.getValue(params.id, "id")}`}>
                            <EditIcon />
                        </Link>
                    </Fragment>
                );
            },
        },
    ];

    const rows = [];

    orders &&
        orders.forEach((item) => {
            rows.push({
                id: item.ordId,
                itemsQty: item.qnt,
                amount:`${ Web3.utils.fromWei(item.amt, 'ether')} eth`,
                status: item.orderStatus,
            });
        });

    return (
        <Fragment>

            <div className="dashboardPage">
                <SideBar />
                <div className="dashboardContainer">
                    <h1 id="productListHeading">ALL ORDERS</h1>

                    <DataGrid
                        rows={rows}
                        columns={columns}
                        pageSize={10}
                        rowsPerPageOptions={[10]}
                        disableSelectionOnClick
                        className="productListTable"
                        autoHeight
                    />
                </div>
            </div>
        </Fragment>
    );
};

export default OrderList;
