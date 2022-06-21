import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import './Header.css';
import { SpeedDial, SpeedDialAction } from '@material-ui/lab';
import profilePng from '../../images/CG.gif_p50.gif'
import Backdrop from '@material-ui/core/Backdrop';
import DashboardIcon from '@material-ui/icons/Dashboard';
import PersonIcon from '@material-ui/icons/Person';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import ListAltIcon from "@material-ui/icons/ListAlt";
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { useSelector } from 'react-redux';
import {setOldUserFalse} from '../../state/slices/user';
import BusinessCenterIcon from '@mui/icons-material/BusinessCenter';
function UserOptions({ user }) {
    const [open, setOpen] = useState(false);
    const dispatch = useDispatch();
    // const {cartItems} = useSelector((state) => state.cartReducer);
    const {userType} = useSelector((state) => state.user);
    const {cartItems} = useSelector((state) => state.cart);
    const options = [
        { icon: < ListAltIcon />, name: "Orders", func: orders },
        { icon: <PersonIcon />, name: "Profile", func: account },
        { icon: <ShoppingCartIcon style={{color: cartItems.length > 0 ? "tomato": "unset"}}/>, name: `Cart(${cartItems.length})`, func: cart},
        { icon: <ExitToAppIcon />, name: "Logout", func: logout },
        {icon: <BusinessCenterIcon /> , name: "products", func: products},
    ]

    if (userType === "seller") {
        options.unshift({
            icon: <DashboardIcon />, name: "Dashboard", func: dashboard
        });
    }

    const navigate = useNavigate();
    function dashboard() {
        setOpen(!open);
        navigate(`/dashboard`);
    }
    function orders() {
        setOpen(!open);
        navigate(`/my-all-orders`);
    }
    function account() {
        setOpen(!open);
        navigate("/account");
    }
    function logout() {
        dispatch(setOldUserFalse());
        navigate(`/`);
        alert.success(`Successfully logged out `);
    }
    function cart() {
        navigate(`/cart`);
    }
    function products() {
        navigate(`/products`);
    }

    return (
        <>
            <Backdrop open={open} style={{zIndex: "1040"}}/>
            <SpeedDial
                className="speedDial"
                ariaLabel='SpeedDial tooltil example'
                onClose={() => setOpen(false)}
                onOpen={() => setOpen(true)}
                open={open}
                direction='down'
                icon={<img
                    className="speedDialIcon"
                    // src={user.avatar.url ? user.avatar.url : profilePng}
                    src={profilePng}
                    alt="Profile" />}
            >
                { options.map((item) => (
                    <SpeedDialAction 
                        icon={item.icon} 
                        tooltipTitle={item.name} 
                        open={true} 
                        onClick={item.func} 
                        tooltipOpen={window.innerWidth <= 600 ? true : false}
                    />
                ))}
            </SpeedDial>
        </>
    )
}

export default UserOptions;
