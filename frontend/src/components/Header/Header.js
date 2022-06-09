import React , {useState} from 'react';
import { Link } from "react-router-dom";
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import HamburgerMenu from 'react-hamburger-menu';
import './Header.css';
import SearchBar from './SearchBar.js';

function Header() {
  const [showHamburgerMenu, setShowHamburgerMenu] = useState(false);
    let isAuthenticated = false;
    let cartItems = {};
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
                                {isAuthenticated === true ? (<div>
                                   user
                                </div>)
                                    : (<div>
                                        <Link to="/login">Buyer/Seller</Link>
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