import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation'; 
import { useRef, useEffect, useState } from 'react';
import Controls from '../commons/Controls';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { loadProductsDataInitiate } from '../redux/action/loadProductsDataAction';
import theme from '../utilities/theme'; 
import ReusableSwiper from './ReusableSwiper';     

const BestSellerComponent = () => {
  const [products, setProducts] = useState([]); 
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
    dispatch(loadProductsDataInitiate());
  }, [dispatch, navigate]);

  useEffect(() => {
    if (actualData.length > 0) {
      const filtered = actualData.filter((product) => product.type === 'essentials');
      setProducts(filtered);
      console.log("filtered in bestseller",filtered)
    }
  }, [actualData]);

  
 


 

  return (
    <Controls.Grid container justifyContent="center" mt={2} position="relative">
      <Controls.Grid item xs={10}>
        <Controls.Grid item my={3}>
          <Controls.Typography
            variant="caption1"
            sx={{ color: theme.palette.one.bg, fontWeight: 'bold', fontSize: '30px' }}
          >
            Weekly Essentials
          </Controls.Typography>
        </Controls.Grid>

      <ReusableSwiper product ={products} topValue={ '50%'}  
            leftValue={"10%"} />

      </Controls.Grid>
    </Controls.Grid>
  );
};

export default BestSellerComponent;
