import React, { useEffect, useState } from 'react'
import Container from '@mui/material/Container'
import Controls from '../commons/Controls'
import theme from '../utilities/theme'
import OrderStatusComponent from './OrderStatusComponent'
import { useLocation, useNavigate } from 'react-router-dom'
import OrderCancellationComponent from './OrderCancellationComponent'
import  {useSelector ,useDispatch} from 'react-redux'
import { loadOrderHistoryInitiate } from '../redux/action/loadOrderHistoryAction'
import { getToken, getUserId } from './GlobalFunctionsComponent'

const OrderHistoryUpdated = () => {

    const [orderDetails,setOrderDetails] = useState([])
    const [cancel , setCancel] = useState(false)
    const [id , setId] = useState(null)
    const [orderHistory, setOrderHistory] = useState([]);
    const dispatch = useDispatch() 
    

    const location = useLocation()
    const navigate = useNavigate()

 useEffect(()=>{
  const { id } = location.state || {};
  console.log("Received ID:", id); 
  setId(id)

 },[])  

    const responseData = useSelector((state)=> state.patchorderhistory.data || {})
    console.log("responseData",responseData)  

    const loadOrderhistory = useSelector((state) => state.loadOrderhistory.data || {});
    console.log("loadOrderhistory", loadOrderhistory);



    useEffect(() => {
      const userId = getUserId();
      let token = getToken()
      if (userId && token) {
          dispatch(loadOrderHistoryInitiate(token,userId));
      }
  }, [dispatch]);

  useEffect(() => {
    if (loadOrderhistory?.data?.orderDetails) {
        const orderData = Object.values(loadOrderhistory.data.orderDetails);
        setOrderHistory(orderData);

        if (id) {
            const orderDetails = orderData.filter((item) => item._id === id);
            console.log("Filtered orderDetails:", orderDetails);
            setOrderDetails(orderDetails);
        }
    }
}, [loadOrderhistory, id]);

    useEffect(()=>{
      if(id){
        console.log("idand",id)
        const orderDetails = orderHistory.filter((item) => item._id === id);
        console.log("orderDetails in oor",orderDetails);
        setOrderDetails(orderDetails)}

    },[id])



    const text = "Your  Order Details";
  const words = text.split(" ");

  const handleNavigate =() => {
    navigate('/orderdetails')
  }

  const handleOrderCancel = () => {
    setCancel(true)
  }


  return (
    <>
    <Controls.Grid container justifyContent="center" >
    <Controls.Grid item xs={12} sx={{ textAlign: 'center', backgroundColor: theme.palette.one.bg, padding: { xs: "4px", sm: "15px" } }}>
      <Controls.Typography variant="text1" className="fadeInText" sx={{ color: theme.palette.one.btn, fontSize: { xs: "10px", sm: "18px" } }}>
        {words.map((word, wordIndex) => (
          <span key={wordIndex} className="word">
            {word.split("").map((char, charIndex) => (
              <span key={charIndex} style={{ animationDelay: `${(wordIndex * 5 + charIndex) * 0.1}s` }}>
                {char}
              </span>
            ))}
          </span>
        ))}
      </Controls.Typography>
    </Controls.Grid>
    <Controls.Grid item xs={10}>
          <Controls.ArrowBackIcon sx={{ marginTop: "10px", cursor: "pointer" }} onClick={handleNavigate} />
        </Controls.Grid>

    <Controls.Grid item xs={11} sm={10} md={8} lg={6} p={{ xs: 1, sm: 2, md: 3, lg: 4 }}>
    
        {orderDetails.map((order, index) => (
          <>
            <Controls.Grid item key={index}>
             {order.orders && (
            
                <Controls.Grid item sx={{ display: "block" }}>
                <Controls.Grid item sx={{ display: {xs:"block",sm:"flex"}, justifyContent: {xs:"center",sm:"space-between"} }}>
                    <Controls.Grid item>
                    <Controls.Typography variant="caption1" sx={{ fontSize: {xs:"14px",sm:"18px"}, fontWeight: "bold" }}>
                    OrderId: {order.orders._id}
                    </Controls.Typography>
                    </Controls.Grid >
                    <Controls.Grid item>
                    <Controls.Typography variant="caption1" sx={{ fontSize: {xs:"12px",sm:"18px"}, fontWeight: "bold" }}>
                    OrderedDate: {new Date(order.orders.checkoutDate).toLocaleDateString("en-US", {
                        year: "numeric",
                        month: "short",
                        day: "numeric",
                    })}
                    </Controls.Typography>
                    </Controls.Grid >
                </Controls.Grid>
                {order.orders?.products.map((product, proIndex) => (
                    <Controls.Grid item key={proIndex} sx={{ display: "flex" }} gap={5}>
                    <Controls.Grid item>
                        <Controls.Box component="img" src={product.image} sx={{ width: "80px", height: "80px" }} />
                    </Controls.Grid>
                    <Controls.Grid item mt={4}>
                        <Controls.Typography variant="text1" sx={{ fontWeight: "bold" }}>
                        {product.name}
                        </Controls.Typography>
                    </Controls.Grid>
                    </Controls.Grid>
                ))}
                <Controls.Grid item sx={{ display: "flex", justifyContent: "space-between", borderBottom: "1px dashed gray" ,}} xs={12} sm={12}>
                    <Controls.Typography variant='caption1'>No.of items: </Controls.Typography>
                    <Controls.Typography variant='caption1'>{order?.items}</Controls.Typography>
                </Controls.Grid>
                <Controls.Grid item sx={{ display: "flex", justifyContent: "space-between" }} xs={12}>
                    <Controls.Typography variant='caption1' sx={{ fontSize: "18px", fontWeight: "bold" }}>Total Price:</Controls.Typography>
                    <Controls.Typography variant='caption1' sx={{ fontSize: "18px", fontWeight: "bold" }}> ₹{order?.totalAmount}</Controls.Typography>
                </Controls.Grid>

                <Controls.Grid item>
                    <Controls.Grid item>
                    <Controls.Typography variant="caption1" sx={{ color: theme.palette.one.title, fontSize: {xs:"13px",sm:'15px'}, fontWeight: "bold" }}>
                        PaymentStatus: {order?.paymentStatus}
                    </Controls.Typography>
                    </Controls.Grid>
                    
                </Controls.Grid>
                </Controls.Grid>
            
            )}
            <Controls.Grid item mt={5}>
            <OrderStatusComponent order={order} responseData={responseData}/>
            </Controls.Grid>
            
            
            
        </Controls.Grid>
        {!cancel ? (
            order?.orderedStatus === "processing"  ? 
            <Controls.Grid item mt={10}>
            <Controls.Button variant='outlined' sx={{textTransform:"initial",borderRadius:"30px"}} onClick={handleOrderCancel}>Cancel Order</Controls.Button>
        </Controls.Grid> :
        <Controls.Grid item mt={5}>
        <Controls.Button variant='outlined' sx={{textTransform:"initial",borderRadius:"30px", }} onClick={handleOrderCancel}>Your Order cancelled successfully</Controls.Button>
    </Controls.Grid> 
        ) : (
<OrderCancellationComponent param={orderDetails} setCancel={setCancel} />
        )}
          
    {cancel && (<>
    
    </>
   )}
   </>
        ))}
 
      
    </Controls.Grid>
      
    </Controls.Grid>
    </>
  )
}

export default OrderHistoryUpdated