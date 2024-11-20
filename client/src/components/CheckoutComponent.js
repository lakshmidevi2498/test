import React, { useEffect, useState } from 'react'
import Controls from '../commons/Controls' 
import { useDispatch, useSelector } from 'react-redux'; 
import { loadCheckoutInitiate } from '../redux/action/loadCheckoutAction';
import { deleteCheckoutInitiate } from '../redux/action/deleteCheckoutAction';
import { useNavigate } from 'react-router-dom';
import theme from '../utilities/theme';
import CheckComponentOne from './CheckComponentOne';
import useMediaQuery from '@mui/material/useMediaQuery';
import { CardActions } from '@mui/material';
import { getUserId } from './GlobalFunctionsComponent';

const CheckoutComponent = () => {

  const isMobile = useMediaQuery('(max-width: 768px)');

 

  
  const [products, setProducts] = useState([])
  const [ orderId ,setOrderId] = useState(null)
  const navigate = useNavigate()

  const dispatch = useDispatch()
  const loadCheckout = useSelector((state) => state.loadcheckout.data || [])
  console.log("loadCheckout data", loadCheckout)
  

  const deleteCheckout = useSelector((state)=>state.deletecheckout.data || [])
  console.log("deleteCheckout",deleteCheckout)

  useEffect(() => {
    const fetchCheckoutProducts = async () => {
      let userId = getUserId();

      console.log("userIdproductId", userId);

      dispatch(loadCheckoutInitiate(userId))  

    }
    fetchCheckoutProducts();

  }, [])
  useEffect(() => {
    const checkoutData = loadCheckout.data?.checkoutProducts?.products || [];
    console.log("checkoutData", checkoutData);
    
    if (checkoutData.length > 0) {
      setProducts(checkoutData);
    }
  }, [loadCheckout.data]);

  useEffect(() => {
    const checkoutId = loadCheckout.data?.checkoutProducts?._id;  
    if (checkoutId) {
        setOrderId(checkoutId);
        localStorage.setItem('orderId',checkoutId) 
        console.log("checkoutId",checkoutId) 
    }
}, [loadCheckout]); 


  const handleIncrement = async (id) => {
    try { 
      setProducts((prevProducts) =>
        prevProducts.map((item) =>
          item._id === id ? { ...item, quantity: item.quantity + 1 } : item
        )
      );
      
    } catch (error) {
      console.log("error",error)
      
    }

   
  };

  const handleDecrement = (id) => {
    setProducts((prevProducts) =>
      prevProducts.map((item) =>
        item._id === id && item.quantity > 1
          ? { ...item, quantity: item.quantity - 1 }
          : item
      )
    );
  };


  const handleRemoveFromCheckout = async (productId) => {

    let userId = getUserId();

    console.log("userIdproductId", userId, productId);

    try {

      await dispatch(deleteCheckoutInitiate(userId, productId))
      await dispatch(loadCheckoutInitiate(userId))

     
      

     
    } catch (error) {
      console.error("AxiosError:", error);
      alert("Failed to remove item from checkout.");
    }
  };
  const totalPrice = products.reduce((total, item) => total + (item.price * item.quantity), 0);
  const totalItems = products.reduce((total, item) => total + ( item.quantity), 0);
        console.log("totalItems",totalItems, totalPrice)
        localStorage.setItem("totalPrice",totalPrice)
        localStorage.setItem("totalItems",totalItems)


  const handleNavigateToPayment = () => {
    navigate('/payment')
  }

  const handleNavigate = () => {
    navigate('/')
  }

  const text = "  Proceed to secure checkout"
  const words = text.split(" ");


  return (
    <>
      <Controls.Grid container justifyContent='center' >
      <Controls.Grid item xs={12} sx={{ textAlign: 'center', backgroundColor: theme.palette.one.bg, padding: { xs: "4px", sm: "15px" } }}>
          <Controls.Typography
            variant="text1" className="fadeInText" sx={{ color: theme.palette.one.btn, fontSize: { xs: "10px", sm: "18px" } }}
          >
          Proceed to secure checkout

          </Controls.Typography>
        </Controls.Grid>
        <Controls.Grid item xs={11}>
          <Controls.ArrowBackIcon sx={{ marginTop: "10px", cursor: "pointer" }} onClick={handleNavigate} />
        </Controls.Grid>
        {isMobile ? 
        (<>
          <Controls.Grid item xs={12} sm={10}>
          <Controls.Grid item >
          {products.length > 0 ? (
          <Controls.Grid Container >
            <Controls.Card >
            <Controls.Grid item sx={{ backgroundColor: theme.palette.one.title, padding: "3px", color: theme.palette.one.btn }}>
                                    <Controls.Typography variant='caption1' sx={{ fontSize: "25px" }}>Order Summary</Controls.Typography>
                                </Controls.Grid> 
              { products.map((item, index) => (
                <>

                  <Controls.Grid item xs={11} sx={{ display: "block", margin: "auto", padding: "10px" }} key={index}> 
                    <Controls.Grid item sx={{display:"flex"}} xs={12}>
                    <Controls.Grid item xs={6}>
                      <Controls.CardMedia component="img" src={item.image} width="100%" height="100%" sx={{ height: "150px",objectFit:"cover" }} />
                      </Controls.Grid>
                      <Controls.Grid item xs={6}>
                      <Controls.CardContent>
                        <Controls.Typography
                          variant='text1'
                          sx={{ fontSize: '20px', fontWeight: 'bold' }}
                        >
                          {item.name}
                        </Controls.Typography>
                        <Controls.Grid container justifyContent="space-between">
                          <Controls.Grid item>
                            <Controls.Typography variant='caption1' sx={{ fontSize: '18px', fontWeight: "medium",color:theme.palette.one.bg }}>
                              Price: Rs {item.price * item.quantity}
                              
                            </Controls.Typography>
                          </Controls.Grid>
                          <Controls.Grid item>
                            <Controls.Typography variant='caption1' sx={{ fontSize: '18px', fontWeight: "medium" }}>
                               
                              Qty:{item.quantity} {item.quantity > 1 ? 'pieces' : 'piece'}
                            </Controls.Typography>
                          </Controls.Grid>
                        </Controls.Grid>
                        
                        </Controls.CardContent>
                        </Controls.Grid>
                        </Controls.Grid>

                        <CardActions>
                        <Controls.Grid container alignItems="center" gap={0.5} mt={3}>
                          <Controls.Grid item onClick={() => handleDecrement(item._id)}>
                            <Controls.Button variant="outlined">
                              <Controls.RemoveIcon fontSize="small"/>
                            </Controls.Button>
                          </Controls.Grid>

                          {item.quantity}
                          <Controls.Grid item onClick={() => handleIncrement(item._id)}>
                            <Controls.Button variant="outlined">
                              <Controls.AddIcon fontSize="small"/>
                            </Controls.Button>
                          </Controls.Grid>
                        </Controls.Grid>
                        <Controls.Grid item sx={{}} mt={2}>
                          <Controls.Button
                            variant='contained'
                            sx={{ textTransform: 'initial', backgroundColor: 'lightcoral' }} onClick={() => handleRemoveFromCheckout(item._id)}
                          >
                            Remove 
                          </Controls.Button>
                        </Controls.Grid>
                        </CardActions>
                      
                  </Controls.Grid>

                </>
              )) }
              {products.length > 0 && (
                <Controls.Grid item xs={12} sx={{ display: "block" ,backgroundColor:"#b6faf1"}}>
                <Controls.Card sx={{ borderRadius: "10px", padding: 2,backgroundColor:"transparent" }}>
                    <Controls.Grid item sx={{}} mt={1}>
                        <Controls.Typography variant='caption1' sx={{ fontSize: "18px", fontWeight: "bold" }}> Your Cart Total Price</Controls.Typography>
                    </Controls.Grid>
                    <Controls.Grid item sx={{ display: "flex", justifyContent: "space-between", fontSize: "18px", borderTop: "1px dashed black", borderBottom: "1px dashed black" }} mt={2}>
                        <Controls.Typography variant='caption1' sx={{}}>total items</Controls.Typography>
                        <Controls.Typography variant='caption1'  >{totalItems} {totalItems > 1 ? 'pieces' : 'piece'}</Controls.Typography>
                    </Controls.Grid>
                    <Controls.Grid item sx={{ display: "flex", justifyContent: "space-between", }} mt={2}>
                        <Controls.Typography variant='caption1' sx={{ fontSize: "25px", }}>Total Price</Controls.Typography>
                        <Controls.Typography variant='caption1' sx={{ fontSize: "25px", }}>₹{totalPrice}/-</Controls.Typography>
                    </Controls.Grid>
                    <Controls.Grid item mt={2}>
                        <Controls.Button variant='contained' sx={{ textTransform: "initial", backgroundColor: "green", color: "white" }}
                            onClick={() => handleNavigateToPayment(products)}
                        >Proceed to Pay</Controls.Button>
                    </Controls.Grid>
                </Controls.Card>
            </Controls.Grid>

              )}
             

            </Controls.Card>
          </Controls.Grid>
          ) : (
          <Controls.Grid
            container
            item
            xs={12}
            
            sx={{
                display: "block", 
                alignItems: "center",
                textAlign: "center",
                overflow: "hidden" 
            }}
        >
            <Controls.Grid item xs={12}>
                <Controls.Box
                    component="img"
                    src="./assests/images/Animation - 1730963363634.gif"
                   sx={{justifyContent:"center",margin:"auto",textAlign:"center",display:"flex",alignItems:"center"}}
                    
                />
            </Controls.Grid>
            <Controls.Grid item sx={{ textAlign: "center" }} xs={12}>
                <Controls.Typography
                    variant="text1"
                    sx={{ fontSize: { xs: "20px", sm: "30px" } }}
                >
                    Your bag is empty
                </Controls.Typography>
            </Controls.Grid>
        </Controls.Grid>
      )}
        </Controls.Grid>
            </Controls.Grid>

        </>) : (
          <>
          
          <CheckComponentOne products={products}handleIncrement={handleIncrement} handleNavigateToPayment={handleNavigateToPayment} handleRemoveFromCheckout={handleRemoveFromCheckout} handleDecrement={handleDecrement}
        totalPrice={totalPrice} totalItems={totalItems}/>
          </>
        )}
        
        

        </Controls.Grid> 

    </>
  )
}

export default CheckoutComponent