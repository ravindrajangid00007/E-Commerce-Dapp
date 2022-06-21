import React, { useState , useEffect } from 'react';
import { Link } from "react-router-dom";
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import HamburgerMenu from 'react-hamburger-menu';
import './Header.css';
import SearchBar from './SearchBar.js';
import Button from '@mui/material/Button';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { checkSellerPresent, checkBuyerPresent } from '../../configurations/web3'
import { setOldUserTrue, setOldUserFalse } from '../../state/slices/user';
import {setUserTypeBuyer , setUserTypeSeller } from '../../state/slices/user';
function Header() {
    const navigate = useNavigate();
    const [showHamburgerMenu, setShowHamburgerMenu] = useState(false);
    const dispatch = useDispatch();
    const { isOldUser } = useSelector((state) => state.user);
  const { cartItems } = useSelector((state) => state.cart);
    
    const [oldUser , setOldUser] = useState(false);
    const handleBuyer = async () => {
        const res = await checkBuyerPresent();
        if (res === true) {
            dispatch(setOldUserTrue());
            dispatch(setUserTypeBuyer());
            navigate('/');
        } else {
            navigate('/buyer-form');
        }
    }
    const handleLogout = async () => {
        dispatch(setOldUserFalse());
        navigate('/');
    }



    const handleSeller = async () => {
        const res = await checkSellerPresent();
        if (res === true) {
            dispatch(setOldUserTrue());
            dispatch(setUserTypeSeller());
            navigate('/');
        } else {
            navigate('/seller-form');
        }
    }

    useEffect(() => {
        console.log("render again")
    }, [isOldUser])
    
    return (
        <>
            <div className="navbar-back">
                <div className="navbar-container">
                    <div className="side-space"></div>
                    <div className="main-container">
                        <Link to="/">
                            <div className="nav-logo-container">
                                FH
                            </div>
                        </Link>

                        <SearchBar />
                        <div className={showHamburgerMenu ? "profile-cart mobile-profile-cart " : "profile-cart"}>
                            <div className="login-profile">
                                {isOldUser === true ? (<div>
                                    <Button disabled>User</Button>
                                    <Button variant="contained" onClick={handleLogout}>Logout</Button>

                                </div>)
                                    : (<div>
                                        <Button variant="contained" onClick={handleBuyer}>Buyer</Button>
                                        <Button variant="contained" onClick={handleSeller}>Seller</Button>
                                    </div>)
                                }
                            </div>
                            <div className="cart-icon">
                                <Link to="/cart">
                                    <p className="cart-item-count">
                                        {cartItems.length}
                                    </p>
                                    <ShoppingCartIcon className="shopping-cart-icon" />
                                </Link>
                            </div>
                        </div>
                        <HamburgerMenu
                            className="ham-burger-menu"
                            isOpen={showHamburgerMenu}
                            menuClicked={(e) => { setShowHamburgerMenu(!showHamburgerMenu) }}
                            width={28}
                            height={20}
                            strokeWidth={3}
                            rotate={0}
                            color='white'
                            borderRadius={5}
                            animationDuration={0.5}
                        />
                    </div>
                    <div className="side-space"></div>
                </div>
            </div>
        </>
    )
}

export default Header