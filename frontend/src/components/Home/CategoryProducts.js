import React, { useEffect, useState } from 'react';
import Carousel from 'react-material-ui-carousel'
import ProductCard from '../Product/ProductCard';
import { useSelector } from 'react-redux';
import ElasticCarousel from 'react-elastic-carousel';
import './CategoryProducts.css';
import Ecommerce from '../../Abi/Ecommerce.json';
const Web3 = require('web3');

const CategoryProducts = ({ category }) => {
    const breakpoints = [
        { width: 1, itemsToShow: 2 },
        { width: 350, itemsToShow: 3 },
        { width: 550, itemsToShow: 4 },
        { width: 800, itemsToShow: 6 },
        { width: 1200, itemsToShow: 7 },
    ]
    const [products, setProducts] = useState([]);
    // const { categoryProducts } = useSelector((state) => state.categoryWiseProductsReducer);
    useEffect(() => {
        const func = async () => {
            if (window.ethereum) {
                window.web3 = new Web3(window.ethereum);
                await window.ethereum.enable()
            } else if (window.web3) {
                window.web3 = new Web3(window.web3.currentProvider)
            } else {
                window.alert('Non-ethereum browser , pleases install metamask')
            }
            const web3 = window.web3;
            const accounts = await web3.eth.getAccounts();
            console.log("accounts 0", accounts[0]);
            let address = accounts[0];
            let balance = await web3.eth.getBalance(address);
            console.log("balance", balance);
            //load ecommerce contract
            const abi = Ecommerce.abi;
            const networkId = await web3.eth.net.getId();

            let ecommerce = new web3.eth.Contract(abi, "0x098eD50e0eCf3e57db629D6C5c1e42547721862d");
            ecommerce.methods.getProductsByCategory(category).call().
                then((products) => {
                    setProducts(products);
                })
        }
        func();
    },[]);

    return (
        <>
            {products.length > 0 &&
                <div className="category-wise-product-container" title={`section-${category}`} id={category}>
                    <h2>{category}</h2>
                    <ElasticCarousel breakPoints={breakpoints} pagination={false}>
                        {
                            products.map((product, i) => (
                                <ProductCard key={i} product={product} />
                            ))
                        }
                    </ElasticCarousel>
                </div>}
        </>
    )
};

export default CategoryProducts;
