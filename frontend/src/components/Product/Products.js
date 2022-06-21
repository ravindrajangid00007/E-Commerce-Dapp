import React , {useState , useEffect} from 'react';
import "./Products.css";
import ProductCard from "./ProductCard";
import Typography from '@mui/material/Typography';
import {ecommerce} from '../../configurations/web3';


function Products() {
    const [products , setProducts] = useState(undefined);


    useEffect(() => {
        const getAllProducts = async () => {
            console.log("ecommerce at products" , ecommerce)
            ecommerce.methods.getAllProducts().call()
            .then((products) => {
                console.log("products" , products);
                setProducts(products);

            });
        }
        getAllProducts();
    }, [])
    
    
    return (
        <>
            <div className="productsPage">
                <div className="productsBlock">
                    <h2 className="productsHeading">Products</h2>
                    <div className="productsList">
                        {products &&
                            products.map((product) => (
                                <ProductCard key={product.pid} product={product} />
                            ))}
                    </div>
                </div>
            </div>
        </>
    )
}

export default Products