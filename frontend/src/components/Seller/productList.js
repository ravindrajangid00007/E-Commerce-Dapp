import React, { Fragment, useEffect, useState } from "react";
import { DataGrid } from '@mui/x-data-grid';
import "./ProductList.css";
import { useSelector, useDispatch } from "react-redux";
// import {
//     clearErrors,
//     getAdminProducts,
//     deleteProduct
// } from "../../state/action-creators/productAction";
import { Link } from "react-router-dom";
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";
import SideBar from "./Sidebar";
import { useNavigate } from "react-router-dom";
import {ecommerce , address} from '../../configurations/web3';
const Web3 = require('web3');

// import {DELETE_PRODUCT_RESET} from '../../state/constants/productConstants';
const ProductList = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [error, setError] = useState(false);
    // const { error, products } = useSelector((state) => state.productReducer);
    const [products , setProducts] = useState([]);

    useEffect(() => {
        ecommerce.methods.getSellerProducts().call({ from: address})
            .then((products) => {
                console.log("products", products);
                setProducts(products);
            });
    }, []);

    console.log("outside productlist " , products);
    const columns = [
        { field: "id", headerName: "Product ID", minWidth: 200, flex: 1 },

        {
            field: "name",
            headerName: "Name",
            minWidth: 250
        },
        {
            field: "stock",
            headerName: "Stock",
            type: "number",
            minWidth: 150
        },

        {
            field: "price",
            headerName: "Price",
            type: "number",
            minWidth: 250

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
                        <Link to={`/seller/product/${params.getValue(params.id, "id")}`}>
                            <EditIcon />
                        </Link>
                    </Fragment>
                );
            },
        },
    ];

    const rows = [];

    products &&
        products.forEach((item) => {
            rows.push({
                id: item.pid,
                stock: item.stock,
                price: Web3.utils.fromWei(item.price, 'ether'),
                name: item.name,
            });
        });

    return (
        <Fragment>
            <div className="dashboardPage">
                <SideBar />
                <div className="dashboardContainer">
                    <h1 id="productListHeading">ALL PRODUCTS</h1>

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

export default ProductList;
