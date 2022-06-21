import React, { useState, useEffect } from 'react';
import Sidebar from './Sidebar.js';
import Typography from '@mui/material/Typography';
import AccountTreeIcon from "@material-ui/icons/AccountTree";
import DescriptionIcon from "@material-ui/icons/Description";
import StorageIcon from "@material-ui/icons/Storage";
import SpellcheckIcon from "@material-ui/icons/Spellcheck";
import AttachMoneyIcon from "@material-ui/icons/AttachMoney";
import { Button } from "@material-ui/core";
import { useSelector, useDispatch } from "react-redux";
import { create } from 'ipfs-http-client';

// import { createProduct, clearErrors } from '../../state/action-creators/productAction';
import { useNavigate } from 'react-router-dom';
// import { NEW_PRODUCT_RESET } from '../../state/constants/productConstants';
import { ecommerce, address } from '../../configurations/web3';
import { useAlert } from "react-alert";
import "./NewProduct.css";
const Web3 = require('web3');

const NewProduct = () => {


    const categories = [
        "Laptop",
        "Footwear",
        "Bottom",
        "Tops",
        "Attire",
        "Camera",
        "SmartPhones",
    ];

    const [name, setName] = useState("");
    const [price, setPrice] = useState(0);
    const [category, setCategory] = useState("");
    const [stock, setStock] = useState(0);
    const [description, setDescription] = useState("");
    const [image, setImage] = useState("");
    const [imagePreview, setImagePreview] = useState("");
    const [error, setError] = useState(false);
    const [success, setSuccess] = useState(false);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const alert = useAlert();
    const [buffer, setBuffer] = useState("");
    const [loading, setLoading] = useState(false);
    // const { loading, error, success } = useSelector((state) => state.newProductReducer);
    const createProductImageChange = async (event) => {
        console.log("called 1")
        event.preventDefault()
        //process file for IPFS...
        const file = event.target.files[0]
        console.log("file", file)
        const reader = new FileReader();
        reader.readAsArrayBuffer(file)
        reader.onloadend = () => {
            console.log("called 2")
            if (reader.readyState === 2) {

                setImagePreview(reader.result[0]);
                console.log("set image preview", imagePreview);
            }
            setBuffer(Buffer(reader.result));
            console.log("buffer ", buffer);
        }

    }

    const uploadToIpfs = async () => {
        const client = create('https://ipfs.infura.io:5001/api/v0');
        try {
            console.log("called 3")
            console.log("buffer", buffer);
            const added = await client.add(buffer);
            console.log(added.path)
            return added.path;
        } catch (error) {
            console.log('Error uploading file: ', error)
        }
    }

    const createProductSubmitHandler = async (e) => {
        e.preventDefault();
        let imageHash = await uploadToIpfs();

        let productObj = {
            name: name,
            description: description,
            price: price,
            category: category,
            stock: stock,
            image: imageHash,
        }
        console.log("productObject", productObj);

        console.log("ecommerce", ecommerce);
        console.log("address", address);
        const weiValue = Web3.utils.toWei(price, 'ether');
        console.log("weiValue", weiValue);
        console.log("price", price);
        setLoading(true);
        ecommerce.methods.addProduct(name, weiValue, stock,description,category,imageHash).send({ from: address })
            .on('receipt', (r) => {
                console.log(r.events.SellerAdded.returnValues.name);
                setLoading(false);
                setSuccess(true);
            }).on('error', function (error, receipt) {
                console.log(error)
                setLoading(false);
                setError(false);
            });
    };



    useEffect(() => {
        if (error) {
            alert.error(error);
            setError(false);

        }
        if (success) {
            alert.success("Product create successfully");
            navigate("/admin/products");
            setSuccess(false);
        }
    }, [error, success, alert, navigate, dispatch]);

    return <>
        <div className="dashboardPage">
            <Sidebar />
            <div className="dashboardContainer">
                <Typography component="h1">Create Product</Typography>

                <form
                    className="createProductForm"
                    encType="multipart/form-data"
                    onSubmit={createProductSubmitHandler}
                >
                    <div>
                        <SpellcheckIcon />
                        <input
                            type="text"
                            placeholder="Product Name"
                            required
                            value={name}
                            onChange={(e) => { setName(e.target.value) }}
                        />
                    </div>
                    <div>
                        <AttachMoneyIcon />
                        <input
                            type="number"
                            placeholder="Price"
                            value={price}
                            step="0.00000000000000001"
                            required
                            onChange={(e) => { setPrice(e.target.value) }}
                        />
                    </div>
                    <div>
                        <DescriptionIcon />
                        <textarea
                            cols="30"
                            rows="2"
                            placeholder="Product Description"
                            value={description}
                            required
                            onChange={(e) => { setDescription(e.target.value) }}
                        ></textarea>
                    </div>
                    <div>
                        <AccountTreeIcon />
                        <select onChange={(e) => setCategory(e.target.value)}>
                            <option value="">Choose a Category:</option>
                            {categories.map((cat) => (
                                <option key={cat} value={cat}>
                                    {cat}
                                </option>
                            ))}
                        </select>
                    </div>
                    <div>
                        <StorageIcon />
                        <input
                            type="number"
                            placeholder="Stock"
                            required
                            value={stock}
                            onChange={(e) => setStock(e.target.value)}
                        />
                    </div>
                    <div id="createProductFormFile">
                        <input
                            type="file"
                            name="avatar"
                            accept="image/*"
                            required
                            onChange={createProductImageChange}
                        />
                    </div>
                    <div id="createProductFormImage">
                        <img src={imagePreview} alt="Product Preview" />
                    </div>
                    <Button
                        id="createProductBtn"
                        type="submit"
                        onClick={createProductSubmitHandler}
                        disabled={loading}
                    >
                        Create
                    </Button>
                </form>
            </div>
        </div>
    </>;
};

export default NewProduct;
