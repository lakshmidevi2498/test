import React, { useEffect, useState } from 'react';
import Controls from '../commons/Controls';
import { useDispatch, useSelector } from 'react-redux';
import { loadCartInitiate } from '../redux/action/loadCartAction';
import { deleteWishlistInitiate } from '../redux/action/deleteWishlistAction';
import { loadWishlistInitiate } from '../redux/action/loadWishlistAction';
import { postWishlistInitiate } from '../redux/action/postWishlistAction';
import { useNavigate } from "react-router-dom" 
import { postCheckoutInitiate } from '../redux/action/postCheckoutAction';
import { deleteCartInitiate } from '../redux/action/deleteCartAction';
import theme from '../utilities/theme';
import Fade from '@mui/material/Fade';
import {getToken, getUserId} from './GlobalFunctionsComponent'
import { loadCheckoutInitiate } from '../redux/action/loadCheckoutAction';

const CartProductsComponent = () => {




  const navigate = useNavigate()
  const dispatch = useDispatch();
  const [cartData, setCartData] = useState([]);
  const [orderId, setOrderId] = useState(null);
  const [userId, setUserId] = useState(null);




  const loadWishlist = useSelector((state) => state.loadwishlist.data || [])
  console.log("loadWishlist", loadWishlist)

  const postCheckout = useSelector((state) => state.postcheckout.data || [])
  console.log("postCheckout data", postCheckout)

  useEffect(() => {
    const fetchCartProducts = async () => {
      try {
        let userId = getUserId();
        let token = getToken()

        console.log("current userId:", userId ,token);



        if (userId && token) {
          await dispatch(loadCartInitiate(token,userId));
        } else {
          console.error("No valid userId found.");
        }
      } catch (error) {
        console.error("Failed to load cart products:", error);
      }
    };
    fetchCartProducts();
  }, [dispatch]);

  const loadCartData = useSelector((state) => state.loadcartproducts.data || []);
  console.log("loadCartData", loadCartData);


  const handleRemoveFromWishlist = async (productId) => {
    let userId = getUserId(); 
    let token = getToken()
    if(userId){
    await dispatch(deleteWishlistInitiate(token,userId, productId))
    await dispatch(loadWishlistInitiate(token,userId))
    }

  }

  const handleAddToWishlist = async (productId) => {
    let userId = getUserId();
    let token = getToken()

    console.log("current userId:", userId ,token);
    if(userId && token){
    await dispatch(postWishlistInitiate(token,userId, productId))
    await dispatch(loadWishlistInitiate(token,userId))
    }
  }

  const isProductInWishlist = (productId) => {
    const isWishlist = loadWishlist?.data?.wishlistData?.productId ?? [];

    console.log("isWishlist", isWishlist)
    return Array.isArray(isWishlist) && isWishlist.some((item) => item._id === productId);

  }



  useEffect(() => {
    if (loadCartData.data && loadCartData.data.cartProducts) {
      const cartProducts = loadCartData.data.cartProducts.productId;

      setCartData(cartProducts);

      setOrderId(loadCartData.data.cartProducts._id);
      setUserId(loadCartData.data.cartProducts.userId);
    }
  }, [loadCartData]);

  const handleCheckOut = async (productId) => {
    let userId = getUserId();
    let token = getToken()

  console.log("userId,productId", userId, productId ,token)
  if(userId && token){
    await dispatch(deleteCartInitiate(token,userId, productId))
    await dispatch(loadCartInitiate(token,userId))

    await dispatch(postCheckoutInitiate(token,userId, productId))
    await dispatch(loadCheckoutInitiate(token,userId))
  }

  }
  const handleNavigate = () => {
    navigate('/')
  }
  const text = " Your cart is ready! Just a step away from bringing your favorites home."
  const words = text.split(" ");

  return (
    <>
      <Controls.Grid container sx={{ justifyContent: 'center' }}  >
        <Controls.Grid item xs={12} sx={{ textAlign: 'center', backgroundColor: theme.palette.one.bg, padding: { xs: "4px", sm: "15px" } }}>
          <Controls.Typography
            variant="text1" className="fadeInText" sx={{ color: theme.palette.one.btn, fontSize: { xs: "10px", sm: "18px" } }}
          >
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
        <Controls.Grid
          container
          spacing={2}
          item
          xs={10}
          sx={{
            alignItems: "center",
            margin: "auto",
            textAlign: "center",
          }}
        >
          {cartData.length > 0 ? (
            cartData.map((item, index) => (
              <Controls.Grid
                key={index}
                item
                xs={12} sm={6} md={4} lg={3}
                sx={{ display: 'flex', justifyContent: 'center' }}
              >
                <Controls.Tooltip
                  title="Buy me !!"
                  arrow
                  placement="top"
                  TransitionComponent={Fade}
                  TransitionProps={{ timeout: 600 }}
                  slotProps={{
                    popper: {
                      modifiers: [
                        {
                          name: 'offset',
                          options: {
                            offset: [0, -70],
                          },
                        },
                      ],
                    },
                  }}
                >
                  <Controls.Card
                    sx={{
                      width: '100%',
                      position: 'relative',
                      display: "block",
                      padding: '10px',
                      borderTopLeftRadius: "30px",
                      borderBottomRightRadius: "30px",
                      border:`1px solid ${theme.palette.one.bg}`
                    }}
                    gap={2}
                  >
                    {isProductInWishlist(item._id) ? (
                      <Controls.FavoriteIcon
                        sx={{
                          position: "absolute",
                          top: 18,
                          right: 40,
                          color: "red",
                        }}
                        onClick={() => handleRemoveFromWishlist(item._id)}
                      />
                    ) : (
                      <Controls.FavoriteIcon
                        sx={{
                          position: "absolute",
                          top: 18,
                          right: 40,
                          color: "lightgray",
                        }}
                        onClick={() => handleAddToWishlist(item._id)}
                      />
                    )}


                    <Controls.CardMedia
                      component='img'
                      src={item.image}
                      width="100%"
                      sx={{ width: "200px", height: "200px", padding: "10px", alignItems: "center", justifyContent: "center", display: "flex", margin: "auto" }}
                  
                    />


                    <Controls.CardContent sx={{ textAlign: "start" }}>
                      <Controls.Typography
                        variant="text1"
                        sx={{ fontSize: '20px', fontWeight: 'bold' }}
                      >
                        {item.name}
                      </Controls.Typography>

                      <Controls.Grid container justifyContent="space-between">
                        <Controls.Grid item>
                          <Controls.Typography
                            variant="caption1"
                            sx={{ fontSize: '18px', fontWeight: "medium", color: theme.palette.one.bg }}
                          >
                            Price: Rs {item.price}
                          </Controls.Typography>
                        </Controls.Grid>

                        <Controls.Grid item>
                          <Controls.Typography
                            variant="caption1"
                            sx={{ fontSize: '18px', fontWeight: "medium", color: "#666" }}
                          >
                            Qty: {item.quantity}
                          </Controls.Typography>
                        </Controls.Grid>
                      </Controls.Grid>

                      <Controls.Grid item mt={2}>
                        <Controls.Button
                          variant="contained"
                          sx={{
                            textTransform: 'initial',
                            backgroundColor: theme.palette.one.links,
                          }}
                          onClick={() => handleCheckOut(item._id)}
                        >
                          Add to bag
                        </Controls.Button>
                      </Controls.Grid>
                    </Controls.CardContent>
                  </Controls.Card>
                </Controls.Tooltip>
              </Controls.Grid>
            ))
          ) : (
            <>
            <Controls.Grid item  xs={12} >
              <Controls.Grid item sx={{display:"block",alignItems:"center",}}>
                <Controls.Box
                  component="img"
                  src="./assests/images/Animation - 1730963467545.gif"
                  sx={{
                    width: { xs: "100%", sm: "400px" },
                    height: "auto",
                    maxWidth: "400px"
                }}
                />
              </Controls.Grid>
              <Controls.Grid item>
              <Controls.Typography variant="text1" sx={{ fontSize: { xs: "20px", sm: "30px" },textAlign:"center" }}>
                Your cart is empty
              </Controls.Typography>
              </Controls.Grid>
              </Controls.Grid>
            </>
          )}
        </Controls.Grid>

      </Controls.Grid>

    </>
  );
};

export default CartProductsComponent;
