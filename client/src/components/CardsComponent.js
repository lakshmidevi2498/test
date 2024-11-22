import React ,{useState,useEffect}from 'react'
import Controls from '../commons/Controls';
import { useParams, useNavigate } from 'react-router-dom'; 
import { useDispatch, useSelector } from "react-redux"; 
import { postCartInitiate } from '../redux/action/postCartAction';
import { loadCartInitiate } from '../redux/action/loadCartAction';
import { deleteCartInitiate } from '../redux/action/deleteCartAction';
import { postWishlistInitiate } from '../redux/action/postWishlistAction';
import { loadWishlistInitiate } from '../redux/action/loadWishlistAction';
import { deleteWishlistInitiate } from '../redux/action/deleteWishlistAction'; 
import theme from '../utilities/theme'; 
import { postCheckoutInitiate } from '../redux/action/postCheckoutAction';
import { getToken, getUserId } from './GlobalFunctionsComponent';
import { loadCheckoutInitiate } from '../redux/action/loadCheckoutAction';

const CardsComponent = ({products}) => {

    const [loading, setLoading] = useState(true);
    const [activeLink, setActiveLink] = useState('Vegatebles');
    const { id } = useParams();
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const productsData = useSelector((state) => state.loadproductsdata.data2 || {});
    const actualData = productsData.data || [];

    const loadCartData = useSelector((state) => state.loadcartproducts.data || []);

    const wishlistData = useSelector((state) => state.postwishlist.data || [])
    console.log("wishlistData", wishlistData)

    const loadWishlist = useSelector((state) => state.loadwishlist.data || [])
    console.log("loadWishlist", loadWishlist)

    const loadCheckout = useSelector((state) => state.loadcheckout.data || [])
    console.log("loadCheckout data", loadCheckout)


// useEffect( ()=>{
//     const fetchCount = async() => {
//     let userId = getUserId()
//     console.log("userid------>",userId)
//     if(userId){
//         await dispatch(loadCartInitiate(userId))
//         await dispatch(loadCheckoutInitiate(userId))
//         await dispatch(loadWishlistInitiate(userId))
//     }
// }
// fetchCount()
// },[])
    const isProductInWishlist = (productId) => {
        let userId = getUserId()
        let token = getToken()
         if(userId && token){
        const isWishlist = loadWishlist?.data?.wishlistData?.productId ?? [];

        console.log("isWishlist", isWishlist)
        return Array.isArray(isWishlist) && isWishlist.some((item) => item._id === productId);
         }
    }
    const handleRemoveFromWishlist = async (productId) => {
        let userId = getUserId();
        let token = getToken()
 
      if(userId && token){
        await dispatch(deleteWishlistInitiate(token,userId, productId))
        await dispatch(loadWishlistInitiate(token,userId))
      }


    }

    const handleAddToWishlist = async (productId) => {
        let userId = getUserId();
        let token = getToken()
 
        if(userId && token){

        await dispatch(postWishlistInitiate(token,userId, productId))
        await dispatch(loadWishlistInitiate(token ,userId))
        }

    }

    const handleAddToCart = async (productId) => {
        let userId = getUserId();
        let token = getToken()
 
        if(userId && token){
        await dispatch(postCartInitiate(token,userId, productId));
        await dispatch(loadCartInitiate(token,userId));
        }
    };

    const handleRemoveFromCart = async (productId) => {
        let userId = getUserId();
        let token = getToken()
 
        if(userId && token ){
        await dispatch(deleteCartInitiate(token,userId,productId))
        await dispatch(loadCartInitiate(token,userId));
        }

    };

    const isProductInCart = (productId) => {

        let userId = getUserId()
        let token = getToken()
         if(userId && token){
        const cartProducts = loadCartData.data?.cartProducts?.productId || [];

        console.log("cartProducts", cartProducts)
        return Array.isArray(cartProducts) && cartProducts.some((item) => item._id === productId);
         }
    };

    const handleBuynow = async (productId) => {

try {
    let userId = getUserId()
    let token = getToken()
    if(userId && token){
    await dispatch(postCheckoutInitiate(token ,userId, productId))
    navigate('/checkout')
    }
    
} catch (error) {
    console.log("error",error)
}       
       
    }

  return (
    <>
    
   
    <Controls.Grid container justifyContent="center" spacing={2}>
                        {products.map((item, index) => (
                            <Controls.Grid item xs={12} sm={6} md={4} lg={3} key={index}>
                                <Controls.Card
                                    sx={{
                                        borderTopLeftRadius: "30px",
                                        borderBottomRightRadius: "30px",
                                        boxShadow: "0 0 10px rgba(0, 0, 0, 0.1)",
                                        position: "relative",
                                        
                                       
                                        ":hover": {
                                            boxShadow: "0 0 15px rgba(0, 0, 0, 0.2)",
                                        },
                                    }}
                                >
                                    {isProductInWishlist(item._id) ? (
                                        <Controls.FavoriteIcon sx={{ position: "absolute", top: 18, right: 18, color: "red" ,}} onClick={() => handleRemoveFromWishlist(item._id)} />

                                    ) : (
                                        <Controls.FavoriteIcon sx={{ position: "absolute", top: 18, right: 18, color: "lightgray" }} onClick={() => handleAddToWishlist(item._id)} />

                                    )}
                                   
                                        <Controls.CardMedia
                                            component='img'
                                            src={item.image}
                                            sx={{
                                                width: "100%",
                                                height: "200px",
                                                objectFit: "cover",
                                                borderRadius: "10px 10px 0 0",
                                            }}
                                        /> 
                                    <Controls.CardContent
                                        sx={{
                                            padding: "20px",
                                            backgroundColor: "#f7f7f7",
                                        }}
                                    >
                                        <Controls.Typography
                                            variant='text1'
                                            sx={{
                                                fontSize: "17px",
                                                fontWeight: "bold",
                                                marginBottom: "30px",
                                                
                                    
                                            }}
                                        >
                                            {item.name}
                                        </Controls.Typography>
                                        <Controls.Grid
                                            container
                                            sx={{
                                                display: 'flex',
                                                justifyContent: "space-between",
                                                marginY: '10px'
                                            }}
                                        >
                                            <Controls.Grid item>
                                                <Controls.Typography
                                                    variant='caption1'
                                                    sx={{
                                                        fontSize: "13px",
                                                        color: theme.palette.one.bg,
                                                        fontWeight: 'bold'
                                                    }}
                                                >
                                                    Price: Rs{item.price}
                                                </Controls.Typography>
                                            </Controls.Grid>
                                            <Controls.Grid item>
                                                <Controls.Typography
                                                    variant='text1'
                                                    sx={{
                                                        fontSize: "13px",
                                                        color: "#666"
                                                    }}
                                                >
                                                    Qty: {item.quantity}
                                                </Controls.Typography>
                                            </Controls.Grid>
                                        </Controls.Grid>
                                    </Controls.CardContent>
                                    
                                    <Controls.CardActions sx={{ display: "flex", justifyContent: "space-between",padding: "10px",
                                            justifyContent: "space-between",
                                            backgroundColor: "#f7f7f7",
                                            borderTop: " 1px solid #ddd", }}>
                                        {isProductInCart(item._id) ? (
                                            <Controls.Button
                                                variant='contained'
                                                sx={{ textTransform: "initial", backgroundColor: "lightcoral" }}
                                                onClick={() => handleRemoveFromCart(item._id)}
                                            >
                                                Remove from Cart
                                            </Controls.Button>
                                        ) : (
                                            <Controls.Grid container spacing={2} sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                                                <Controls.Grid item>
                                                    <Controls.Button variant="outlined" sx={{ textTransform: 'initial', fontSize: { xs: '12px' } }} onClick={()=>handleBuynow(item._id)}>
                                                        Buy now
                                                    </Controls.Button>
                                                </Controls.Grid>

                                                <Controls.Grid item>
                                                    <Controls.Button
                                                        variant="primary"
                                                        sx={{ textTransform: 'initial', fontSize: { xs: '12px' } }}
                                                        onClick={() => handleAddToCart(item._id)}
                                                    >
                                                        Add to Cart
                                                    </Controls.Button>
                                                </Controls.Grid>
                                            </Controls.Grid>
                                        )}
                                    </Controls.CardActions>
                                </Controls.Card>
                            </Controls.Grid>
                        ))}
                    </Controls.Grid>
        
    
    </>
  )
}

export default CardsComponent