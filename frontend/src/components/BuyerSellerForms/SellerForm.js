import React, { useState } from 'react'

import Button from '@mui/material/Button';

import { addSeller ,addBuyer} from '../../configurations/web3';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { setUserTypeSeller } from '../../state/slices/user';
import './SellerForm.css';
function SellerForm() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [address, setAddress] = useState("");
    const [name, setName] = useState("");
    const handleSellerForm = async () => {
        const resB = await addBuyer(name , address);
        const res = await addSeller(name);
        if (res === true) {
            dispatch(setUserTypeSeller());
        }
        navigate('/');
    }
    return (
        <>
            <div className="seller-form">
                <form >
                    <label for="fname">Full Name</label>
                    <input type="text" id="fname" value={name} onChange={e => setName(e.target.value)} placeholder="Your name.." />
                    <label for="lname">Your Address</label>
                    <input type="text" id="lname" value={address} onChange={e => setAddress(e.target.value)} placeholder="Your address" />
                    <Button variant="contained" onClick={handleSellerForm}>Add Seller</Button>
                </form>
            </div>
        </>
    )
}

export default SellerForm;