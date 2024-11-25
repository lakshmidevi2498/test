import React, { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom';
import Controls from '../commons/Controls';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { loadAddressInitiate } from '../redux/action/loadAddressAction'
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import theme from '../utilities/theme';
import { razorpayOrderInitiate } from '../redux/action/razorpayOrderAction';
import { razorpayOrderValidateInitiate } from '../redux/action/razorpayOrderValidationAction';
import { deleteOrderInitiate } from '../redux/action/deleteOrderAction';
import { loadCheckoutInitiate } from '../redux/action/loadCheckoutAction'; 
import { sendNotificationInitiate } from '../redux/action/sendNotificationAction';
import { getToken, getUserId } from './GlobalFunctionsComponent';

const PaymentsComponent = () => {
 

    const [address, setAddress] = useState([])
    const [value, setValue] = React.useState('');
    const [price, setPrice] = useState(null)
    const [item, setItem] = useState(null)
    const [paymentId, setPaymentId] = useState(null)
    const [razorpayOrderId, setRazorpayOrderId] = useState(null)
    const [product, setProduct] = useState([])
    const [useraddress, setUserAddress] = useState(null)
    const [id, setId] = useState(null)
    const [name ,setName] = useState(null)

    const razorpayOrderDetails = useSelector((state) => state.razopayorder.data || [])
    console.log("razorpayOrderDetails", razorpayOrderDetails)

    const razorpayOrderValidateDetails = useSelector((state) => state.razorpayordervalidate.data || [])
    console.log("razorpayOrderValidateDetails", razorpayOrderValidateDetails)

    const orderDeleted = useSelector((state) => state.deleteorder.data || [])
    console.log("orderDeleted", orderDeleted)

    const currency = "INR";
    const receiptId = "qwsaql";

    const navigate = useNavigate()
    const location = useLocation();
    const dispatch = useDispatch();
    const loadAddress = useSelector((state) => state.loadAddress.data)
    console.log("loadAddress", loadAddress)

    useEffect(() => {
        const fetchAddress = async () => {
            let userId = getUserId();
            let token = getToken()

            if (userId && token) {
                try {
                    await dispatch(loadAddressInitiate(token,userId)) 
                } catch (error) {
                    console.error("Error fetching addresses:", error);
                }
            } else {
                console.warn("No userId found to fetch address data.");
            }
        };

        fetchAddress();
    }, []);


    useEffect(() => {
        const currentAddress = loadAddress.data?.userAddress
        if (Array.isArray(currentAddress)) {
            const presentAddress = currentAddress[0];
            setAddress(presentAddress);
            console.log("presentAddress is an array", presentAddress)

        }
        else {
            setAddress(currentAddress)
            console.log("currentAddress not an array", currentAddress)
        }



    }, [loadAddress])

    console.log("location", location);
    console.log("address in payment page---->", location.state?.address)



    useEffect(() => {
        if (location.state?.address) {
            setUserAddress(location.state.address);
        }
    }, [location.state?.address]);

    useEffect(() => {
        const totalprice = localStorage.getItem("totalPrice")
        if (totalprice > 0) {
            setPrice(totalprice)
        }

        const totalItems = localStorage.getItem("totalItems")
        setItem(totalItems)
        const orderId = localStorage.getItem('orderId')
        setId(orderId)
        console.log("setId", orderId)

    }, [])




    const handleChange = (event) => {

        if (event.target.value === "upi") {

            setValue(event.target.value);

        }
        else {
            setValue(event.target.value);
        }

    };
    useEffect( ()=>{
        if (razorpayOrderValidateDetails && razorpayOrderValidateDetails.data) {
            const responseOrderId = razorpayOrderValidateDetails.data.orderId;                                    ;
            const responsePaymentId = razorpayOrderValidateDetails.data.paymentId;
            console.log("responseOrderId", responseOrderId);
            setPaymentId(responsePaymentId);
            setRazorpayOrderId(responseOrderId);
            console.log("responseOrderId",responseOrderId ,responsePaymentId)
          } else {
            console.log("Data not available yet");
          }

    },[razorpayOrderValidateDetails])

    useEffect(() => {
     
        
        const username = localStorage.getItem('signinUserName') || localStorage.getItem('signupUserName') || localStorage.getItem('username') 
    setName(username)
    console.log("username in navbar",username)
    

  }, [])

    const sendPushNotification = async (token) => { 
        try {
const body = {
    title: `Hai ${name}`,
    body: 'Your order Placed Successfully',
  }

  dispatch(sendNotificationInitiate(body,token))


        } catch (error) {
          console.error('Error sending notification:', error);
        }
      };

    const handleRazorpay = async () => {
        try {
            await dispatch(razorpayOrderInitiate({
                amount: price * 100,
                currency,
                receipt: receiptId,
            }));


            if (razorpayOrderDetails?.data) {
                console.log("Order response", razorpayOrderDetails);
                const order = razorpayOrderDetails.data;


                if (order?.id) {
                    const options = {
                        key: "rzp_test_mqSCiPTo2G5Peh",
                        amount: price * 100,
                        currency,
                        name: "Grocery",
                        description: "Test Transaction",
                        image: "./assets/images/vegetable.png",
                        order_id: order.id,
                        handler: async function (res) {
                            const body = {
                                razorpay_order_id: res.razorpay_order_id,
                                razorpay_payment_id: res.razorpay_payment_id,
                                razorpay_signature: res.razorpay_signature
                            };
                            console.log("Payment success body", body);

                            try {
                                await dispatch(razorpayOrderValidateInitiate(body));
                               
                                 if(id && price && item){
                                   console.log("id,price ,item",id,price ,item)
                                 
                                await dispatch(deleteOrderInitiate(id,price ,item ));
                                console.log("Order deleted successfully", id);

                                localStorage.removeItem('orderId');
                                localStorage.removeItem('totalItems');
                                localStorage.removeItem('totalPrice');
                                let userId = getUserId()
                                let token = getToken()
                                if(userId && token){
                                    console.log("userId",userId)
                                    await dispatch(loadCheckoutInitiate(token,userId))
                                    sendPushNotification(token)
                                }
                                
                                 }
                            } catch (deleteError) {
                                console.error("Error during order deletion:", deleteError);
                                alert("Payment was successful, but there was an issue finalizing the order. Please contact support.");
                            }
                        },
                        prefill: {
                            name: "Lakshmi",
                            email: "lakshmi@gmail.com",
                            contact: "9056890110"
                        },
                        notes: {
                            address: "Razorpay Corporate Office"
                        },
                        theme: {
                            color: "#3399cc"
                        }
                    };

                    const rzp1 = new window.Razorpay(options);
                    rzp1.on("payment.failed", function (response) {
                        console.log("Payment failed", response.error);
                        alert("Payment failed. Please try again.");
                    });
                    rzp1.open();
                } else {
                    console.error("Order ID is not available");
                }
            } else {
                console.error("Order details are not yet available");
            }
        } catch (error) {
            console.error("Error processing the order or payment:", error);
            alert("There was an error processing your payment. Please try again later.");
        }
    };






    const radioStyles = {
        color: 'orange',
        '&.Mui-checked': {
            color: 'orange',
            backgroundColor: 'lightorange',
            fontFamily: "poppins",
        },
        '&.MuiRadio-root:hover': {
            backgroundColor: 'lightgray',
            fontFamily: "poppins",
        },
    };

    const handleChangeAddress = () => {
        navigate('/addressdetails')


    }

    const handleAddAddress = () => {
        navigate('/address')

    }

    const handleNavigate = () => {
        navigate('/checkout')
    }

    const handlealert = () => {
        alert("Please select a payment method and your address")
    }



    return (
        <>
            {price ? (
                <>
                    {(paymentId !== null && razorpayOrderId !== null ) ?
                        <>
                            <Controls.Grid item xs={10}>
                                <Controls.ArrowBackIcon sx={{ marginTop: "10px", cursor: "pointer" }} onClick={handleNavigate} />
                            </Controls.Grid>
                            <Controls.Grid item sx={{ display: "block", alignItems: "center", textAlign: "center", }} mt={4}>

                                <Controls.Box component="img" src="https://uxwing.com/wp-content/themes/uxwing/download/e-commerce-currency-shopping/order-placed-purchased-icon.svg" width="100%" height="100%" sx={{ width: {xs:'200px',sm:"350px"}, height: "250px", }} />
                                <Controls.Typography variant='h4' sx={{fontSize:{xs:'16px',sm:"18px",md:"24px"}}}> order palced successfully</Controls.Typography>
                                <Controls.Typography variant='h6' sx={{fontSize:"12px",sm:"16px",md:"18px"}}>Order_Id:{razorpayOrderId}</Controls.Typography>
                            </Controls.Grid>
                        </> :
                        <Controls.Grid container justifyContent="center">
                            <Controls.Grid item mb={4} sx={{ display: "flex" }} gap={2} xs={9} p={{ xs: 0, sm: 5 }}>
                                <Controls.ArrowBackIcon sx={{ marginTop: "10px", cursor: "pointer" }} onClick={handleNavigate} />
                                <Controls.Typography variant="caption1" sx={{ fontSize: { xs: "25px" } }}>Checkout</Controls.Typography>
                            </Controls.Grid>
                            <Controls.Grid item xs={10} md={8} >

                                <Controls.Grid item>
                                    <Controls.Typography variant='text1' sx={{ fontWeight: "bold", color: theme.palette.one.bg, fontSize: { xs: "18px", sm: "22px" } }}>1.Select a deliveery address</Controls.Typography>
                                    <Controls.Card>
                                        <Controls.Grid item p={2}>
                                            <Controls.Grid item sx={{ display: "flex", justifyContent: "space-between", }}>

                                                {address ? <Controls.Grid item sx={{ display: "flex", justifyContent: "space-between" }} xs={12}>
                                                    <Controls.Grid item  >
                                                        <Controls.Typography variant='caption1' sx={{ fontSize: "20px", fontWeight: "medium" }}>Current Address</Controls.Typography>
                                                    </Controls.Grid>
                                                    <Controls.Grid item  >
                                                        <Controls.EditIcon onClick={handleChangeAddress} sx={{ cursor: "pointer", }} />
                                                    </Controls.Grid>
                                                </Controls.Grid> :
                                                    <Controls.Typography variant='h6' sx={{ fontSize: "18px", cursor: "pointer" }} onClick={handleAddAddress}>Add Address</Controls.Typography>}

                                            </Controls.Grid>
                                            <Controls.Divider sx={{ marginBottom: 1 }} />
                                            <Controls.Grid item xs={10} sx={{ justifyContent: "center" }}>
                                                <Controls.Typography variant='h6' sx={{ fontSize: "16px" }}>
                                                    {useraddress ? (
                                                        <>
                                                            <Controls.Box component="span" sx={{ fontWeight: "bold" }}>{useraddress.name}</Controls.Box> | {useraddress.number} | {useraddress.email}
                                                            | {useraddress.address} | <Controls.Box component="span" sx={{ color: theme.palette.one.title }}>{useraddress.city}</Controls.Box> | {useraddress.pincode}
                                                            | <Controls.Box component="span" sx={{ color: theme.palette.one.title }}>{useraddress.district}</Controls.Box> | {useraddress.country}
                                                        </>
                                                    ) : address ? (
                                                        <>
                                                            <Controls.Box component="span" sx={{ fontWeight: "bold" }}>{address.name}</Controls.Box>  | {address.number} | {address.email}
                                                            | {address.address} | <Controls.Box component="span" sx={{ color: theme.palette.one.title }}>{address.city}</Controls.Box> | {address.pincode}
                                                            | <Controls.Box component="span" sx={{ color: theme.palette.one.title }}>{address.district}</Controls.Box> | {address.country}
                                                        </>
                                                    ) : (
                                                        ""
                                                    )}
                                                </Controls.Typography>

                                            </Controls.Grid>
                                        </Controls.Grid>
                                    </Controls.Card>
                                </Controls.Grid>
                                <Controls.Grid item mt={3}>
                                    <Controls.Typography variant='text1' sx={{ fontWeight: "bold", color: theme.palette.one.bg, fontSize: { xs: "18px", sm: "22px" } }}>2.Select a Payment Method</Controls.Typography>

                                    <Controls.Card sx={{ padding: 2 }}>
                                        <Controls.Grid item>
                                            <Controls.Grid item>
                                                <Controls.Typography variant='caption1' sx={{ fontWeight: "medium", fontSize: "22px" }}>Choose a Method</Controls.Typography>
                                            </Controls.Grid>
                                            <Controls.Divider sx={{ marginBottom: 1 }} />
                                            <FormControl component="fieldset">
                                                <RadioGroup
                                                    aria-labelledby="demo-controlled-radio-buttons-group"
                                                    name="controlled-radio-buttons-group"
                                                    value={value}
                                                    onChange={handleChange}

                                                >
                                                    <FormControlLabel
                                                        value="cash"
                                                        label="Cash on Delivery"
                                                        control={<Radio sx={radioStyles} />}
                                                        sx={{ fontFamily: "poppins", }}
                                                    />
                                                    <FormControlLabel
                                                        value="netbanking"
                                                        label="Net Banking"
                                                        control={<Radio sx={radioStyles} />}
                                                    />
                                                    <FormControlLabel
                                                        value="upi"
                                                        label="Other UPI apps"
                                                        control={<Radio sx={radioStyles} />}
                                                    />
                                                    <FormControlLabel
                                                        value="cards"
                                                        label="Credit and Debit Cards"
                                                        control={<Radio sx={radioStyles} />}
                                                    />
                                                </RadioGroup>
                                            </FormControl>


                                        </Controls.Grid>

                                    </Controls.Card>
                                </Controls.Grid>
                                <Controls.Grid item mt={3}>
                                    <Controls.Typography variant='text1' sx={{ fontWeight: "bold", color: theme.palette.one.bg, fontSize: "22px" }}>3.Order details</Controls.Typography>

                                    <Controls.Card sx={{ padding: { xs: 1, sm: 5 } }}>

                                        <Controls.Grid item paddingX={{ xs: 0, sm: 3 }}>
                                            <Controls.Typography variant='caption1' sx={{ fontSize: { xs: "16px", sm: "18px" } }}>OrderId:{id}</Controls.Typography>
                                        </Controls.Grid>
                                        <Controls.Grid item px={{ xs: 2, sm: 8 }}>
                                            <Controls.Grid item sx={{ display: "flex", justifyContent: "space-between" }}>
                                                <Controls.Typography variant='caption1' sx={{ fontSize: "16px" }}>No.of items : </Controls.Typography>
                                                <Controls.Typography>{item}</Controls.Typography>
                                            </Controls.Grid>
                                            <Controls.Grid item sx={{ display: "flex", justifyContent: "space-between" }}>
                                                <Controls.Typography variant='caption1' sx={{ fontSize: "24px", color: theme.palette.one.bg }}>Order Total :  </Controls.Typography>
                                                <Controls.Typography variant='caption1' sx={{ fontSize: "24px", color: theme.palette.one.bg }}>{price}/-</Controls.Typography>
                                            </Controls.Grid>


                                        </Controls.Grid>
                                    </Controls.Card>
                                </Controls.Grid>
                                <Controls.Grid item sx={{ justifyContent: "end", display: "flex" }} my={3}>
                                    {value && (address || useraddress) ? <Controls.Button variant='secondary' onClick={handleRazorpay}>checkout</Controls.Button> :
                                        <Controls.Button variant='secondary' onClick={handlealert}>checkout</Controls.Button>}

                                </Controls.Grid>




                            </Controls.Grid>

                        </Controls.Grid>}</>
            ) : (
                <Controls.Grid item sx={{ display: "block", textAlign: "center" }} p={5}>
                    <Controls.Typography variant='caption1' sx={{ fontSize: "30px" }}>No current Payments</Controls.Typography>
                </Controls.Grid>
            )
            }

        </>
    )
}

export default PaymentsComponent