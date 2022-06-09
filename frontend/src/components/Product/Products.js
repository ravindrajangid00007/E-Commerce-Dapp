import React , {useState} from 'react'
import "./Products.css";
import ProductCard from "./ProductCard";
import { useParams } from 'react-router-dom';
import Pagination from "react-js-pagination";
import Slider from '@mui/material/Slider';
import Typography from '@mui/material/Typography';
import { useLocation } from 'react-router-dom';

const categories = [
    "Toys",
    "Eelectronics",
    "Stationary",
    "Books",
    "Camera",
];

function Products() {
    const location = useLocation();
    let products = [];
    let productsCount = 0;
    let resultPerPage = 8;
    let filteredProductsCount = 0;                                                  


    const params = useParams();
    const keyword = params.keyword;
    const [currentPage, setCurrentPage] = useState(1);
    const [price, setPrice] = useState([0, 100]);
    const [category, setCategory] = useState("");
    const [ratings, setRatings] = useState(0);

    const setCurrentPageNo = (e) => {
        setCurrentPage(e);
    }

    const priceHandler = (event, newValue) => {
        setPrice(newValue);
    };

    const ratingHandler = (event, newValue) => {
        setRatings(newValue);
    }

    return (
        <>
            <div className="productsPage">

                <div className="filterbox">
                    <Typography>Price (ETH)</Typography>
                    <Slider
                        getAriaLabel={() => 'Temperature range'}
                        value={price}
                        onChange={priceHandler}
                        valueLabelDisplay="on"
                        min={0}
                        max={100}
                    // getAriaValueText={valuetext}
                    />
                    <Typography>Categories</Typography>
                    <ul className="categoryBox">
                        <li
                            className="categoryLink"
                            onClick={() => { setCategory("") }}
                        >All</li>
                        {categories.map((category) => (
                            <li
                                className="categoryLink"
                                key={category}
                                onClick={() => { setCategory(category) }}
                            >{category}</li>
                        ))}
                    </ul>
                    <Typography>Ratings</Typography>
                    <Slider
                        aria-label="Temperature"
                        defaultValue={ratings}
                        key={`slider-${ratings}`}
                        onChange={ratingHandler}
                        marks
                        valueLabelDisplay="auto"
                        step={1}
                        min={0}
                        max={5}
                    />
                </div>
                <div className="productsBlock">
                    <h2 className="productsHeading">Products</h2>
                    <div className="productsList">
                        {products &&
                            products.map((product) => (
                                <ProductCard key={product._id} product={product} />
                            ))}
                    </div>
                    {resultPerPage <= filteredProductsCount && (
                    <div className="paginationBox">
                        <Pagination
                            activePage={currentPage}
                            itemsCountPerPage={resultPerPage}
                            totalItemsCount={productsCount}
                            onChange={setCurrentPageNo}
                            nextPageText="Next"
                            prevPageText="Prev"
                            firstPageText="FirstPage"
                            lastPageText="Last"
                            itemClass="page-item"
                            linkClass="page-link"
                            activeClass="pageItemActive"
                            activeLinkClass="pageLinkActive"
                        />
                    </div>)}
                </div>

            </div>
        </>
    )
}

export default Products