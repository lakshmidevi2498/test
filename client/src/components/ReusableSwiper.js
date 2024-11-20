import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import { Pagination, Navigation } from 'swiper/modules';
import { useRef, useEffect, useState } from 'react';
import Controls from '../commons/Controls';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom'; 
import theme from '../utilities/theme'; 
import { postCartInitiate } from '../redux/action/postCartAction';
import { loadCartInitiate } from '../redux/action/loadCartAction';
import { deleteCartInitiate } from '../redux/action/deleteCartAction';
import { postWishlistInitiate } from '../redux/action/postWishlistAction';
import { loadWishlistInitiate } from '../redux/action/loadWishlistAction';
import { deleteWishlistInitiate } from '../redux/action/deleteWishlistAction'; 
import { postCheckoutInitiate } from '../redux/action/postCheckoutAction';
import { getUserId } from './GlobalFunctionsComponent';


const ReusableSwiper = ({ product, topValue, leftValue }) => {

  
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const productsData = useSelector((state) => state.loadproductsdata.data2 || {});
  const actualData = productsData.data || [];

  const loadCartData = useSelector((state) => state.loadcartproducts.data || []);

  const wishlistData = useSelector((state) => state.postwishlist.data || [])
  console.log("wishlistData", wishlistData)

  const loadWishlist = useSelector((state) => state.loadwishlist.data || [])
  console.log("loadWishlist", loadWishlist)
  useEffect(() => {
    console.log("product", product)
  }, [])
  const swiperRef = useRef(null);


   

const isProductInWishlist = (productId) => {
    const isWishlist = loadWishlist?.data?.wishlistData?.productId ?? [];

    console.log("isWishlist", isWishlist)
    return Array.isArray(isWishlist) && isWishlist.some((item) => item._id === productId);

}
const handleRemoveFromWishlist = async (productId) => {
    let userId = getUserId(); 

   if(userId){
    await dispatch(deleteWishlistInitiate(userId, productId))
    await dispatch(loadWishlistInitiate(userId))
   }


}

const handleAddToWishlist = async (productId) => {
    let userId = getUserId(); 

    if(userId){

    await dispatch(postWishlistInitiate(userId, productId))
    await dispatch(loadWishlistInitiate(userId))
    }

}

const handleAddToCart = async (productId) => {
    let userId = getUserId();
 
    if(userId){

    await dispatch(postCartInitiate(userId, productId));
    await dispatch(loadCartInitiate(userId));
    }
};

const handleRemoveFromCart = async (productId) => {
    let userId = getUserId();
 
    if(userId){
    await dispatch(deleteCartInitiate(userId,productId))
    await dispatch(loadCartInitiate(userId));
    }

};

const isProductInCart = (productId) => {


    const cartProducts = loadCartData.data?.cartProducts?.productId || [];

    console.log("cartProducts", cartProducts)
    return Array.isArray(cartProducts) && cartProducts.some((item) => item._id === productId);

};

const handleBuynow = async (productId) => {

  try {
      let userId = getUserId()
      if(userId){
      await dispatch(postCheckoutInitiate(userId, productId))
      navigate('/checkout')
      }
      
  } catch (error) {
      console.log("error",error)
  }     
      }


  return (
    <>
      <Controls.Grid item>
        <Swiper
          spaceBetween={10}
          modules={[Pagination, Navigation]}
          onSwiper={(swiper) => {
            swiperRef.current = swiper;
          }}
          style={{ width: '100%' }}
          breakpoints={{
            1600: { slidesPerView: 5 },
            1440: { slidesPerView: 4 },
            1024: { slidesPerView: 3 },
            764: { slidesPerView: 2 },
            576: { slidesPerView: 1 },
            320: { slidesPerView: 1 },
          }}
        >
          {product.map((item, index) => (
            <SwiperSlide key={index}>
              <Controls.Card sx={{ border: '1px solid lightGray', position: 'relative',borderTopLeftRadius: "30px",
                                        borderBottomRightRadius: "30px", }}>
                 {isProductInWishlist(item._id) ? (
                                        <Controls.FavoriteIcon sx={{ position: "absolute", top: 18, right: 18, color: "red" ,}} onClick={() => handleRemoveFromWishlist(item._id)} />

                                    ) : (
                                        <Controls.FavoriteIcon sx={{ position: "absolute", top: 18, right: 18, color: "lightgray" }} onClick={() => handleAddToWishlist(item._id)} />

                                    )}
                
                  <Controls.CardMedia
                    component="img"
                    src={item.image}
                    sx={{
                      width: '200px',
                      height: '200px',
                      alignItems: 'center',
                      justifyContent: 'center',
                      display: 'flex',
                      margin: 'auto',
                    }}
                  />
                <Controls.CardContent>
                  <Controls.Grid item>
                    <Controls.Typography
                      variant="text1"
                      sx={{ fontSize: '17px', fontWeight: 'bold' }}
                    >
                      {item.name}
                    </Controls.Typography>
                  </Controls.Grid>
                  <Controls.Grid item sx={{ display: 'flex', justifyContent: 'space-between',marginY: "15px", }}>
                    <Controls.Grid item>
                      <Controls.Typography variant="caption1" sx={{
                                                        fontSize: "13px",
                                                        color: theme.palette.one.bg,
                                                        fontWeight: 'bold'
                                                    }}>
                        Price: Rs {item.price}
                      </Controls.Typography>
                    </Controls.Grid>
                    <Controls.Grid item>
                      <Controls.Typography variant="h6" sx={{ fontSize: '13px',color: "#666" }}>
                        Qty: {item.quantity}
                      </Controls.Typography>
                    </Controls.Grid>
                  </Controls.Grid>
                </Controls.CardContent>
                <Controls.CardActions
                  sx={{ display: 'flex', justifyContent: 'space-between', paddingX: '10px', borderTop: "1px solid #ddd" }}
                >
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
            </SwiperSlide>
          ))}
        </Swiper>


        <Controls.Grid
          sx={{
            cursor: 'pointer',
            color: theme.palette.one.bg,
            position: 'absolute',
            top: topValue,
            left: leftValue,
            zIndex: 100,
            borderRadius: '50%',
            padding: "2px",
            transform: 'translateY(-50%)',
            border: '2px solid #db0707',
            display: 'flex',
            fontSize: '24px',
          }}
          onClick={() => swiperRef.current?.slidePrev()}
        >
          <Controls.ChevronLeft />
        </Controls.Grid>


        <Controls.Grid
          sx={{
            cursor: 'pointer',
            color: theme.palette.one.bg,
            position: 'absolute',
            top: topValue,
            right: leftValue,
            zIndex: 100,
            borderRadius: '50%',
            padding: "2px",
            transform: 'translateY(-50%)',
            border: '2px solid #db0707',
            display: 'flex',
            fontSize: '24px',
          }}
          onClick={() => swiperRef.current?.slideNext()}
        >
          <Controls.ChevronRight />
        </Controls.Grid>
      </Controls.Grid>
    </>
  )
}

export default ReusableSwiper