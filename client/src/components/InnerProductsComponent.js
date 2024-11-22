import React, { useEffect, useState } from 'react'
import Controls from '../commons/Controls'
import NavbarComponent from './NavbarComponent'
import { useLocation, useNavigate } from 'react-router-dom'
import theme from '../utilities/theme'
import { getToken, getUserId } from './GlobalFunctionsComponent'
import { postCartInitiate } from '../redux/action/postCartAction'
import { loadCartInitiate } from '../redux/action/loadCartAction'
import { deleteCartInitiate } from '../redux/action/deleteCartAction'
import { postCheckoutInitiate } from '../redux/action/postCheckoutAction'
import { useSelector ,useDispatch } from 'react-redux'


const InnerProductsComponent = () => {
    const [product, setProduct] = useState([])
  
    const [count, setCount] = useState(1)
 
    const location = useLocation()
    const navigate = useNavigate()
    const dispatch = useDispatch()

    const loadCartData = useSelector((state) => state.loadcartproducts.data || []);


    useEffect(() => {
        console.log("location", location)
        console.log("address in payment Component---->", location.state?.product)
        const item = location.state?.product
        setProduct(item)
        const type = item.type
        console.log("type",type)
        localStorage.setItem('type',type)
    }, [])
   


    const handleNavigate = () => {
        navigate('/categories/vegetable')
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
            
            <Controls.Grid container justifyContent="center" mt={5}   >

                <Controls.Grid
                    item
                    xs={10}
                    sx={{
                        justifyContent: "center",
                        alignItems: "center",
                    }}
                >
                    <Controls.Grid item xs={10} >
                        <Controls.ArrowBackIcon sx={{ marginTop: "10px", cursor: "pointer" }} onClick={handleNavigate} />
                    </Controls.Grid>

                    <Controls.Grid
                        container 
                        alignItems="center" 
                    >

                        <Controls.Grid item xs={12} sm={6}  sx={{order:{xs:2,sm:1},margin:"auto",display:"block",alignItems:"center",textAlign:"center"}}>
                            <Controls.Box
                                component="img"
                                src={product.image}
                                width="100%" height="100%"
                                sx={{ width: {xs:"200px",md:"300px",lg:"400px"}, height: "100%" }}
                            />
                        </Controls.Grid>


                        <Controls.Grid item xs={12} sm={6}  sx={{order:{xs:1,sm:2},}}>
                            <Controls.Grid item>
                                <Controls.Typography variant="caption1" sx={{ fontWeight: "bold", fontSize: { xs:"23px",sm:"30px",md: "45px" }, color: theme.palette.one.bg }}>Product Details of {product.name}</Controls.Typography>
                            </Controls.Grid>

                            <Controls.Grid item>
                                <Controls.Typography variant="caption1" sx={{ fontWeight: "bold", fontSize: { xs:"20px",sm: "25px" } }}>Product Price:{product.price}Rs</Controls.Typography>
                            </Controls.Grid>

                            <Controls.Grid item>
                                <Controls.Typography variant="caption1" sx={{ fontWeight: "medium", fontSize: { xs:"18px",sm: "20px" } }}>Product Quantity :{product.quantity} {product.type === "vegetable" || product.type === "oils" || product.type === "dals" || product.type === "fruits" ? "kg" :
                                    product.type === "dairy" ? "liter" : "piece"}</Controls.Typography>
                            </Controls.Grid>
                            <Controls.Grid container justifyContent="space-between" alignItems="center" mt={2}>
                                <Controls.Grid item xs={10} sm={8} md={6}lg={4} sx={{ display: "flex", }} gap={3}>
                                {isProductInCart(product._id) ? (
                                            <Controls.Button
                                                variant='contained'
                                                sx={{ textTransform: "initial", backgroundColor: "lightcoral" }}
                                                onClick={() => handleRemoveFromCart(product._id)}
                                            >
                                                Remove from Cart
                                            </Controls.Button>
                                        ) : (
                                            <Controls.Grid container spacing={2} sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                                                <Controls.Grid item>
                                                    <Controls.Button variant="outlined" sx={{ textTransform: 'initial', fontSize: { xs: '12px' } }} onClick={()=>handleBuynow(product._id)}>
                                                        Buy now
                                                    </Controls.Button>
                                                </Controls.Grid>

                                                <Controls.Grid item>
                                                    <Controls.Button
                                                        variant="primary"
                                                        sx={{ textTransform: 'initial', fontSize: { xs: '12px' } }}
                                                        onClick={() => handleAddToCart(product._id)}
                                                    >
                                                        Add to Cart
                                                    </Controls.Button>
                                                </Controls.Grid>
                                            </Controls.Grid>
                                        )}
                                </Controls.Grid>
                            </Controls.Grid>
                        </Controls.Grid>
                    </Controls.Grid>
                </Controls.Grid>

            </Controls.Grid>

        </>
    )
}

export default InnerProductsComponent