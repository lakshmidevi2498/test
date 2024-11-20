import React, { useEffect, useState } from 'react'
import Controls from '../commons/Controls' 
import { useDispatch, useSelector } from 'react-redux'
import { loadWishlistInitiate } from '../redux/action/loadWishlistAction'
import { deleteWishlistInitiate } from '../redux/action/deleteWishlistAction'
import { postCartInitiate } from '../redux/action/postCartAction'
import { loadCartInitiate } from '../redux/action/loadCartAction'
import { deleteCartInitiate } from '../redux/action/deleteCartAction'
import theme from '../utilities/theme'
import { useNavigate } from 'react-router-dom'
import {getUserId} from './GlobalFunctionsComponent'

const WishlistComponent = () => {
    const [products, setProducts] = useState([]) 

  
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const loadWishlist = useSelector((state) => state.loadwishlist.data || [])
    console.log("loadWishlist", loadWishlist)

    const loadCartData = useSelector((state) => state.loadcartproducts.data || []);

    const deleteWishlistData = useSelector((state) => state.deletewishlist.data || [])
    console.log("deleteWishlistData", deleteWishlistData)

    useEffect(() => {
        const fetchWishlist = async () => {
            let userId = getUserId();
if(userId){
            await dispatch(loadWishlistInitiate(userId))
}

        }
        fetchWishlist();

    }, [deleteWishlistData])
    useEffect(() => {
        const wishlistProducts = loadWishlist.data?.wishlistData?.productId || [];

        console.log("wishlist products", wishlistProducts);
        if (wishlistProducts.length > 0) {
            setProducts(wishlistProducts);
            console.log("setProductswishlistProducts", products)

        }

    }, [loadWishlist])

    const handleRemoveFromWishlist = async (productId) => {
        let userId = getUserId();
        console.log("current userId:", userId)
        await dispatch(deleteWishlistInitiate(userId, productId))
        //  dispatch(loadWishlistInitiate(userId))
        const freshwishlistdata = deleteWishlistData.data?.wishlist?.productId || [];

        console.log("wishlist products in handleRemoveFromWishlist", freshwishlistdata);
        setProducts(freshwishlistdata);
        console.log("setProducts", products)

    }
    const handleAddToCart = async (productId) => {
        let userId = getUserId();

        console.log("current userId:", userId);
      if(userId){
        await dispatch(postCartInitiate(userId, productId));
        await dispatch(loadCartInitiate(userId));
      }

    }

    const isProductInCart = (productId) => {


        const cartProducts = loadCartData.data?.cartProducts?.productId || [];

        console.log("cartProducts", cartProducts)
        return Array.isArray(cartProducts) && cartProducts.some((item) => item._id === productId);

    };
    const handleRemoveFromCart = async (productId) => {
        let userId = getUserId();
            if(userId){
        await dispatch(deleteCartInitiate(productId, userId))
        dispatch(loadCartInitiate(userId));
            }

    }

    const handleNavigate = () => {
        navigate('/')
    }

    const text = "Your wishlist awaits! Dreams are just a click away from coming true"
    const words = text.split(" ");

    return (
        <>
            <Controls.Grid container justifyContent="center">
                <Controls.Grid item xs={12} sx={{ textAlign: 'center', backgroundColor: theme.palette.one.bg, padding: { xs: "4px", sm: "15px" } }}>
                    <Controls.Typography
                        variant="text1" className="fadeInText" sx={{ color: theme.palette.one.btn, fontSize: { xs: "10px", sm: "18px" } }}
                    >
                        {words.map((word, wordIndex) => (
                            <span key={wordIndex} className="word"  >
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

                <Controls.Grid container
                    spacing={2}
                    item
                    xs={10}
                    sx={{
                        alignItems: "center",
                        margin: "auto",
                    }}>
                    {products.length > 0 ? (products.map((item, index) => (
                        <Controls.Grid key={index} item xs={12} sm={6} md={4} lg={3}
                            sx={{ display: 'flex', justifyContent: 'center', }} gap={2}>
                            <Controls.Card sx={{
                                width: '100%',
                                position: 'relative',
                                display: "block",
                                padding: '10px',
                                borderTopLeftRadius: "30px",
                                borderBottomRightRadius: "30px",
                            }}>

                                <Controls.FavoriteIcon sx={{ position: "absolute", top: 18, right: 18, color: "red" }} onClick={() => handleRemoveFromWishlist(item._id)} />




                                <Controls.CardMedia
                                    component='img'
                                    src={item.image}
                                    width="100%"
                                    sx={{ width: "200px", height: "200px", padding: "10px", alignItems: "center", justifyContent: "center", display: "flex", margin: "auto" }}
                                />
                                <Controls.CardContent>
                                    <Controls.Typography variant='text1' sx={{ fontSize: "17px", fontWeight: "bold" }}>{item.name}</Controls.Typography>
                                    <Controls.Grid sx={{ display: "flex", justifyContent: "space-between" }} my={1}>
                                        <Controls.Typography variant='caption1' sx={{ fontSize: '18px', fontWeight: "medium", color: theme.palette.one.bg }}>Price: Rs {item.price}</Controls.Typography>
                                        <Controls.Typography variant='caption1' sx={{ fontSize: '18px', fontWeight: "medium", color: "#666" }}>Qty: {item.quantity}</Controls.Typography>
                                    </Controls.Grid>
                                </Controls.CardContent>
                                <Controls.CardActions>
                                    {isProductInCart(item._id) ? (
                                        <Controls.Button
                                            variant='contained'
                                            sx={{ textTransform: "initial", backgroundColor: "lightcoral" }}
                                            onClick={() => handleRemoveFromCart(item._id)}
                                        >
                                            Remove from Cart
                                        </Controls.Button>
                                    ) : (
                                        <Controls.Button
                                            variant='contained'
                                            sx={{ textTransform: "initial", backgroundColor: "lightgreen" }}
                                            onClick={() => handleAddToCart(item._id)}
                                        >
                                            Add to Cart
                                        </Controls.Button>
                                    )}
                                </Controls.CardActions>
                            </Controls.Card>
                        </Controls.Grid>
                    ))) : (
                        <>
                            <Controls.Grid
                                container
                                item
                                xs={12}
                                
                                sx={{
                                     
                                    justifyContent: "center",
                                    alignItems: "center",
                                    textAlign: "center",
                                    overflow: "hidden"  
                                }}
                            >
                                <Controls.Grid item xs={12}>
                                    <Controls.Box
                                        component="img"
                                        src="./assests/images/Animation - 1730963748748.gif"
                                       
                                        
                                    />
                                </Controls.Grid>
                                <Controls.Grid item sx={{ textAlign: "center" }} xs={12}>
                                    <Controls.Typography
                                        variant="text1"
                                        sx={{ fontSize: { xs: "20px", sm: "30px" } }}
                                    >
                                        Your Wishlist is empty
                                    </Controls.Typography>
                                </Controls.Grid>
                            </Controls.Grid>


                        </>
                    )}
                </Controls.Grid>


            </Controls.Grid>
        </>
    )
}

export default WishlistComponent