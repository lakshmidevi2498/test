import React, { useState } from 'react';
import Controls from '../commons/Controls';
import { Select } from '@mui/material';
import theme from '../utilities/theme';
import axios from 'axios';
import { useEffect } from 'react';
import {useSelector,useDispatch} from 'react-redux'
import { loadOrderHistoryInitiate } from '../redux/action/loadOrderHistoryAction';
import { OrderHistoryPatchInitiate } from '../redux/action/orderHistoryPatchAction';

const OrderCancellationComponent = ({param ,setCancel }) => {
    const [data, setData] = useState([]);
    const [id ,setId] = useState(null)
    const [cancelled , setCancelled] = useState(true)
    const [response , setResponse] = useState(null) 

    const dispatch = useDispatch()

    

    console.log("Initial id:", param);
    
    useEffect(() => {
      console.log("id in useEffect:", param); 
      if (param && Array.isArray(param) && param.length > 0) {   
        setData(param);
      }
    }, [param]);
    
    useEffect(() => {
      if (data.length > 0) {
        console.log("length", data.length);
        const Id = data[0];
        const requireId = Id._id;
        console.log("orderId", Id);
        console.log("requireId", requireId);
        setId(requireId)
      }
    }, [data]);
 
    
    
    const getUserId = () => {
        const socialUserId = localStorage.getItem("socialUserId");
        const signupUserId = localStorage.getItem("signupUserId");
        const signinUserId = localStorage.getItem("signinUserId");
    
        if (socialUserId && socialUserId !== "null") return socialUserId;
        if (signupUserId) return signupUserId;
        if (signinUserId) return signinUserId;
        return null;
      };      

    const links = [
        { name: 'wrong item was selected.' },
        { name: 'Shipping Address Incorrect' },
        { name: 'Payment Issues' },
        { name: 'Delayed Delivery' },
        { name: 'Found a Better Price' }
    ];

    const [selectedReason, setSelectedReason] = useState('');

    const handleReasonChange = (event) => {
        setSelectedReason(event.target.value);
    };

    const handleCancellation = async () => {
        const body = { orderedStatus: "cancelled", selectedReason ,shippingStatus:"cancelled"};
        setCancel(false);
    
        // Make sure the patch action returns a promise
        await dispatch(OrderHistoryPatchInitiate(id, body));
    
        let userId = getUserId();
    console.log("userId",userId)
        // Make sure loadOrderHistoryInitiate is dispatched after patch action completes
        await dispatch(loadOrderHistoryInitiate(userId));
    };
    


    // useEffect(()=>{
    //     if(response.data?.orderedStatus){
    //         setCancelled(false)
    //     }

    // },[])

    return (
        <Controls.Grid container justifyContent="center" mt={3}>
            {cancelled && (
            <Controls.Grid item xs={12}>
                <Controls.Card sx={{ borderRadius: "20px", border: "2px solid gray",padding:2 }}>
                    <Controls.Grid item>
                        <Controls.Grid item xs={12}>
                            <Controls.Grid item mb={1}>
                                <Controls.Typography variant='caption1' sx={{fontSize:"20px",fontWeight:"bold",color:theme.palette.one.title}}>Select the reason for order cancel</Controls.Typography>
                            </Controls.Grid>
                            <Controls.Select
                                value={selectedReason}
                                onChange={handleReasonChange}
                                displayEmpty
                                sx={{ fontWeight: "medium", fontFamily: "Poppins", fontSize: "20px",width:"100%" }}
                                MenuProps={{
                                   
                                    anchorOrigin: {
                                        vertical: 'bottom', 
                                        horizontal: 'left',
                                    },
                                    transformOrigin: {
                                        vertical: 'top', 
                                        horizontal: 'left',
                                    },
                                    MenuListProps: {
                                        sx: {
                                            padding: 0, 
                                        },
                                    },
                                }}
                            >
                                <Controls.MenuItem value="" disabled>
                                    Select  reason
                                </Controls.MenuItem>
                                {links.map((link) => (
                                    <Controls.MenuItem key={link.name} value={link.name}>
                                        {link.name}
                                    </Controls.MenuItem>
                                ))}
                            </Controls.Select>
                        </Controls.Grid>
                        <Controls.Grid item mt={5} sx={{textAlign:"center"}}>
                            <Controls.Button variant="secondary" onClick={handleCancellation} sx={{textTransform:"initial"}}>
                                Confirm Cancellation
                            </Controls.Button>
                        </Controls.Grid>
                    </Controls.Grid>
                </Controls.Card>
            </Controls.Grid>
            ) }
        </Controls.Grid>
    );
};

export default OrderCancellationComponent;
