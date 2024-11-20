import React, { useEffect, useState } from 'react';
import Controls from '../commons/Controls';
import theme from '../utilities/theme';
import { useDispatch, useSelector } from 'react-redux';
import { loadOrderHistoryInitiate } from '../redux/action/loadOrderHistoryAction';
import OrderStatusComponent from './OrderStatusComponent';
import { getUserId } from './GlobalFunctionsComponent';

const OrderHistoryComponent = () => {
  const [orderHistory, setOrderHistory] = useState([]); 
  const dispatch = useDispatch();

  const loadOrderhistory = useSelector((state) => state.loadOrderhistory.data || {});
  console.log("loadOrderhistory", loadOrderhistory);



  useEffect(() => {
    const fetchOrderHistory = () => {
      const userId = getUserId();
      if (userId) {
        dispatch(loadOrderHistoryInitiate(userId));
      }
    };

    fetchOrderHistory();
  }, [dispatch]);

  useEffect(() => {
    if (loadOrderhistory?.data?.orderDetails) {
      setOrderHistory(Object.values(loadOrderhistory.data.orderDetails));  
  }
    console.log("ordered in useEffect",orderHistory)
  }, [loadOrderhistory ,orderHistory]);
 

  const text = "Your recent Orders";
  const words = text.split(" "); 

  if(loadOrderhistory == {}){
    return null
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

    <Controls.Grid item xs={12} sm={10} md={8} lg={6} p={{ xs: 1, sm: 2, md: 3, lg: 4 }}>
      {orderHistory.map((order, index) => (
         <Controls.Grid item key={index}>
          <Controls.Card key={index} sx={{ paddingX: "20px", paddingY: "10px", marginBottom: "20px",border:`1px solid ${theme.palette.one.links}` }}>
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
        
        <OrderStatusComponent order={order} />
        </Controls.Card>
        </Controls.Grid>
      ))}
    </Controls.Grid>
  </Controls.Grid>
</>
);
};

export default OrderHistoryComponent;
