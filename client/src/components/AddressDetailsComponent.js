import React, { useEffect, useState } from 'react';
import Controls from '../commons/Controls';
import { useDispatch, useSelector } from 'react-redux';
import { loadAddressInitiate } from '../redux/action/loadAddressAction';
import { useNavigate } from 'react-router-dom';
import theme from '../utilities/theme';
import { getUserId } from './GlobalFunctionsComponent';

const AddressDetailsComponent = () => {
   

    const [allAddress, setAllAddress] = useState([]);
    const [selectedAddress, setSelectedAddress] = useState(null);
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const loadAddress = useSelector((state) => state.loadAddress.data);
    console.log("loadAddress in AddressDetailsComponent", loadAddress);



    useEffect(() => {
        let userId = getUserId()
       

        if (userId) {
            try {
                dispatch(loadAddressInitiate(userId));
            } catch (error) {
                console.error("Error fetching addresses:", error);
            }
        } else {
            console.warn("No userId found to fetch address data.");
        }
    }, []);

    useEffect(() => {
        const currentAddresses = loadAddress?.data?.userAddress || [];
        setAllAddress(currentAddresses);
        console.log("currentAddresses in AddressDetailsComponent", currentAddresses);
    }, [loadAddress]);

    const handleSelectAddress = (address) => {
        console.log("Selected Address:", address);
        setSelectedAddress(address);
    };

    const handleProceedToPayment = () => {
        if (selectedAddress) {
            navigate('/payment', { state: { address: selectedAddress } });
        } else {
            alert("Please select an address before proceeding.");
        }
    };

    const handleAddAddress = () => {
        navigate('/address');
    };

    return (
        <>
            <Controls.Grid container justifyContent="center">
                <Controls.Grid item xs={10} lg={8} mt={5}>
                    <Controls.Grid item xs={12}>
                        {allAddress.length > 0 ? (
                            allAddress.map((address, index) => (
                                <Controls.Card key={index} sx={{ marginBottom: "20px" }}>
                                    <Controls.Grid item p={{xs:2,md:5}} sx={{ display: {xs:"block",sm:"flex"}, justifyContent: {xs:"center",sm:"space-between"} }} gap={1}>
                                        <Controls.Typography variant='caption1' sx={{ fontSize: {xs:"18px",md:"22px"}, marginBottom: 2 }}>
                                        <Controls.Box component="span" sx={{fontWeight:"bold"}}>{address.name}</Controls.Box>  | {address.number} | {address.email}
                                                | {address.address} | <Controls.Box component="span" sx={{color:theme.palette.one.title}}>{address.city}</Controls.Box> | {address.pincode}
                                                | <Controls.Box component="span" sx={{color:theme.palette.one.title}}>{address.district}</Controls.Box> | {address.country}
                                           
                                        </Controls.Typography><br/>
                                        <Controls.FormControlLabel
                                            value={address}
                                            label="Select"
                                            control={
                                                <Controls.Radio 
                                                    checked={selectedAddress === address}
                                                    onChange={() => handleSelectAddress(address)}
                                                    sx={{
                                                        color: 'orange',
                                                        '&.Mui-checked': {
                                                            color: 'orange',
                                                            backgroundColor: 'lightorange'
                                                        },
                                                        '&.MuiRadio-root:hover': {
                                                            backgroundColor: 'lightgray'
                                                        },
                                                    }}
                                                />
                                            }
                                        />
                                    </Controls.Grid>
                                </Controls.Card>
                            ))
                        ) : (
                            <Controls.Grid item>
                                <Controls.Typography variant='caption1' onClick={handleAddAddress} sx={{fontSize:{xs:"15px",sm:"20px"},cursor:"pointer"}}>
                                    Add Address+
                                </Controls.Typography>
                            </Controls.Grid>
                        )}
                        <Controls.Grid item sx={{display:{xs:"block",sm:"flex"},justifyContent:"space-between"}}>
                        <Controls.Grid item>
                                <Controls.Typography variant='caption1' onClick={handleAddAddress} sx={{fontSize:{xs:"15px",sm:"20px"},cursor:"pointer"}}>
                                    Add Address+
                                </Controls.Typography>
                            </Controls.Grid>
                        <Controls.Grid item sx={{ display: "flex", justifyContent: {xs:"center",sm:"end"}, mt: 2 }}>
                            <Controls.Button variant="primary" color="primary" onClick={handleProceedToPayment}>
                                Proceed to Payment
                            </Controls.Button>
                        </Controls.Grid>
                        </Controls.Grid>
                    </Controls.Grid>
                </Controls.Grid>
            </Controls.Grid>
        </>
    );
};

export default AddressDetailsComponent;
