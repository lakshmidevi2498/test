import React, { useEffect, useState } from 'react';
import Controls from '../commons/Controls';
import theme from '../utilities/theme';
import { useDispatch, useSelector } from 'react-redux';
import { loadOrderHistoryInitiate } from '../redux/action/loadOrderHistoryAction';
import { useNavigate } from 'react-router-dom';
import {getToken, getUserId} from './GlobalFunctionsComponent'

const OrderHistoryDetailsComponent = () => {

    const [orderHistory, setOrderHistory] = useState([]);
    const [ordered, setOrdered] = useState([]);
    const [status, setStatus] = useState(null);
    const dispatch = useDispatch();
    const navigate = useNavigate()
  
    const loadOrderhistory = useSelector((state) => state.loadOrderhistory.data || {});
    console.log("loadOrderhistory", loadOrderhistory);
  

  
    useEffect(() => {
      const fetchOrderHistory = () => {
        const userId = getUserId();
        let token = getToken()
        if (userId && token) {
          dispatch(loadOrderHistoryInitiate(token,userId));
        }
      };
  
      fetchOrderHistory();
    }, [dispatch]);
  
    useEffect(() => {
      if (loadOrderhistory?.data?.orderDetails) {
        setOrderHistory(Object.values(loadOrderhistory.data.orderDetails));  
    }
      console.log("orderHistory in useEffect",orderHistory)
    }, [loadOrderhistory]);

    const text = " Your Recent Orders";
    const words = text.split(" "); 

    const handleOrderDetails = (id) => {
        console.log("id in handleOrderDetails 6734506d62bb6fa2bb1977a5",id);
        if(orderHistory){
        const orderDetails = orderHistory.filter((item) => item._id === id);
        console.log("orderDetails",orderDetails);
        
    //  navigate('/historyorder',{state:{ order:orderDetails}})
    navigate('/historyorder',{state:{ id:id}})
        }
    }

    const handleNavigate = () => {
      navigate('/profile')
    }
  return (
    <>
    <Controls.Grid container justifyContent="center">
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
         <Controls.Grid item xs={10} sm={8} md={6} mt={3}>
        
            <Controls.Grid item xs={12}> 
                { (loadOrderhistory?.data?.orderDetails) ? (orderHistory.map((order, index) => (
         <Controls.Grid item key={index}>
          <Controls.Card key={index} sx={{ paddingX: "20px", paddingY: "10px", marginBottom: "20px",border:`1px solid ${theme.palette.one.links}`, }} >
        <Controls.Grid item sx={{display:"flex",justifyContent:"space-between"}}>
        <Controls.Grid item>
        {order.orders && (
          
            <Controls.Grid item sx={{ display: "block" }}>
              <Controls.Grid item sx={{ display: {xs:"block",sm:"flex"}, justifyContent: {xs:"center",sm:"space-between"} }}>
                <Controls.Grid item>
                <Controls.Typography variant="caption1" sx={{ fontSize: {xs:"14px",sm:"18px"}, fontWeight: "bold" ,color:(order.orderedStatus === "processing" ? theme.palette.one.title : order.orderedStatus === "cancelled" ? theme.palette.one.bg:"black")}}>
                {order.orderedStatus === "processing" ? "Order Confirmed" : order.orderedStatus === "cancelled" ? "Order Cancelled":"dfghj"}
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

             
                <Controls.Grid item sx={{
                    marginLeft:{xs:"100px"},marginBottom:{xs:"10px"}, }} xs={12}>
                  <Controls.Typography variant="caption1" sx={{ color: theme.palette.one.orange, fontSize: {xs:"13px",sm:'25px'}, fontWeight: "bold",textTransform:"inherit" }}>
                     {    order?.shippingStatus || order?.orderedStatus 
                     }
                  </Controls.Typography> 
                
              </Controls.Grid>
            </Controls.Grid>
          
        )}
        </Controls.Grid>
        <Controls.Grid item sx={{display:"block",marginY:"auto"}}>
            <Controls.ArrowForwardIosIcon onClick={()=>handleOrderDetails(order._id)}/>
        </Controls.Grid>
        </Controls.Grid>
        </Controls.Card>
        </Controls.Grid>
      ))) : (
        <Controls.Grid item sx={{textAlign:"center"}}>
          <Controls.Typography variant='text1' sx={{fontSize:"20px",fontWeight:"bold"}}>You don't have any orders yet</Controls.Typography>
          </Controls.Grid>
      )}
                

            </Controls.Grid>

         </Controls.Grid>
    </Controls.Grid>
    </>
  )
}

export default OrderHistoryDetailsComponent