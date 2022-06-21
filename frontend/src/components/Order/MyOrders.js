import React,{useEffect , useState} from 'react';
import {useDispatch , useSelector} from 'react-redux';
import { useAlert } from "react-alert";
import { DataGrid } from "@mui/x-data-grid";
import "./myOrders.css";
// import { clearErrors , myOrders } from '../../state/action-creators/orderAction';
// import {loadUser} from '../../state/action-creators/userAction';
import Typography from "@material-ui/core/Typography";
import LaunchIcon from "@material-ui/icons/Launch";
import {Link} from 'react-router-dom';
import {ecommerce, address} from '../../configurations/web3';
const Web3 = require('web3');

const MyOrders = () => {
    const dispatch = useDispatch();
    const alert = useAlert();
    // const {loading , error , orders} = useSelector((state) => state.myOrdersReducer);
    const [orders , setOrders] = useState([]);
    useEffect(() => {
        ecommerce.methods.getBuyerOrders().call({from: address})
        .then((orders) => {
            setOrders(orders);
            
        })
      }, []);
      console.log("orders" , orders);

    const columns = [
        {field: 'id' , headerName: "Order ID" , minWidth: 250 , flex: 1},
        {field: "status" , headerName: "status" ,minWidth: 150 , cellClassName: (params) => {
            return params.getValue(params.id , "status") === "Delivered" ? "greenColor" : "redColor";
        }},
        {field: "itemsQty" , headerName: "Items Qty" , type: "number" , minWidth: 150 ,},
        {field: "amount" , headerName: "Amount" , type: "number" , minWidth: 250 ,},
        {field: "actions" , headerName: "Actions" ,type: "number" , minWidth: 150 , renderCell: (params) => {
            return (
                <Link to={`/order/${params.getValue(params.id , "id")}`} >
                    <LaunchIcon />
                </Link>
            );
        }}
    ];

    let rows = [];

    {orders && orders.forEach((order , index) => {
        rows.push({
            id: order.ordId,
            status: order.orderStatus,
            itemsQty: order.qnt,
            amount: `${Web3.utils.fromWei(order.amt, 'ether')} eth`,
        });
    })};
    
  return <>
    <div className="myOrdersPage">
        <DataGrid 
            rows={rows}
            columns={columns}
            pageSize={10}
            className="myOrdersTable"
            autoHeight={true}
        />
        <Typography id="myOrdersHeading">Orders</Typography>
    </div>
  </>;
};

export default MyOrders;
