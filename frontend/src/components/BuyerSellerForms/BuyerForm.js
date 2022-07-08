import React , {useState} from 'react'
import Button from '@mui/material/Button';
import {addBuyer} from '../../configurations/web3';
import {useNavigate} from 'react-router-dom';
import {useSelector , useDispatch} from 'react-redux';
import {setUserTypeBuyer} from '../../state/slices/user';
function BuyerForm() {
    
    const [name , setName] = useState("");
    const [address, setAddress] = useState("");
    const navigate = useNavigate();
    const dispatch = useDispatch();


    const handleBuyerForm = async () => {
        const res = await addBuyer(name , address);
        if(res === true) {
            dispatch(setUserTypeBuyer());
        }
        navigate('/');
    }

    return (
        <>
            <div className="seller-form">
                <form >
                    <label for="fname">Full Name</label>
                    <input type="text" id="fname" value={name} onChange={e => setName(e.target.value)} placeholder="Your name.." />

                    <label for="lname">Delivery Address</label>
                        <input type="text" id="lname" value={address} onChange={e => setAddress(e.target.value)}  placeholder="delivery address" />
                    <Button variant="contained" onClick={handleBuyerForm}>Add Buyer</Button>
                </form>
            </div>
        </>
    )
}

export default BuyerForm