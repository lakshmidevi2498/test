import React, { useEffect, useState } from 'react';
import Controls from '../commons/Controls';
import { useParams, useNavigate } from 'react-router-dom';
import { loadProductsDataInitiate } from '../redux/action/loadProductsDataAction';
import { useDispatch, useSelector } from "react-redux";
import axios from 'axios';
import { postCartInitiate } from '../redux/action/postCartAction';
import { loadCartInitiate } from '../redux/action/loadCartAction';
import { deleteCartInitiate } from '../redux/action/deleteCartAction';
import { postWishlistInitiate } from '../redux/action/postWishlistAction';
import { loadWishlistInitiate } from '../redux/action/loadWishlistAction';
import { deleteWishlistInitiate } from '../redux/action/deleteWishlistAction';
import { NavLink } from 'react-router-dom';
import theme from '../utilities/theme';
import ProductsCardsComponent from './ProductsCardsComponent' 
import { postCheckoutInitiate } from '../redux/action/postCheckoutAction';
import { getUserId } from './GlobalFunctionsComponent';

const ProductsComponent = () => {
    const [loading, setLoading] = useState(true);
    const [activeLink, setActiveLink] = useState('Vegatebles');
    const [expanded, setExpanded] = useState(true);
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

    // const deleteWishlist = useSelector((state) => state.deletewishlist.data || [])
    // console.log("deleteWishlist", deleteWishlist)

    const [products, setProducts] = useState([]);




   


    useEffect(() => {
       

       
            dispatch(loadProductsDataInitiate());
            setLoading(false);
        
    }, [dispatch, navigate]);

    useEffect(() => {
        if (actualData.length > 0) {
            const filtered = actualData.filter((product) => product.type === id);
            setProducts(filtered);
        }
    }, [actualData, id]);

    useEffect(() => {
        let userId = getUserId();
 
        if(userId){
        dispatch(loadCartInitiate(userId));
        }
    }, [dispatch]);



    const isProductInCart = (productId) => {


        const cartProducts = loadCartData.data?.cartProducts?.productId || [];

        console.log("cartProducts", cartProducts)
        return Array.isArray(cartProducts) && cartProducts.some((item) => item._id === productId);

    };

    const isProductInWishlist = (productId) => {
        const isWishlist = loadWishlist?.data?.wishlistData?.productId ?? [];

        console.log("isWishlist", isWishlist)
        return Array.isArray(isWishlist) && isWishlist.some((item) => item._id === productId);

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
        await dispatch(deleteCartInitiate(productId, userId))
        await dispatch(loadCartInitiate(userId));
        }


    };

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
    const links = [
        { name: 'Vegetables', href: '/categories/vegetable' },
        { name: 'Fruits', href: '/categories/fruits' },
        { name: 'Oils', href: '/categories/oils' },
        { name: 'Dals', href: '/categories/dals' },
        { name: 'Dairy', href: '/categories/dairy' }
    ];

    const handleLinkClick = (link) => {
        setActiveLink(link);
    };

    const handleInneProducts = (item) => {
        if(item){
            navigate('/innerproducts',{state:{product:item}})
        }
        
 
    }

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

            const handleChange = (event, newExpanded) => {
                setExpanded(newExpanded);  
              };

    if (loading) return <div>Loading...</div>;

    return (
        <Controls.Grid container justifyContent="center"  spacing={10}>
            <Controls.Grid item xs={10} sx={{ display: { xs: "block", sm: "flex" }, justifyContent: { xs: "center", sm: "space-between" } }} gap={{ sm: 2, md: 0 }}>
                <Controls.Grid item xs={12} sm={3} mb={{ xs: 2, sm: 0 }}>
                    <Controls.Grid item sx={{ top: 120, position: "sticky" }} xs={12}>
                        <Controls.Accordion expanded={expanded} onChange={handleChange}>
                            <Controls.AccordionSummary
                                expandIcon={<Controls.ExpandMoreIcon />}
                                aria-controls="panel1-content"
                                id="panel1-header"
                                sx={{ fontWeight: "bold" ,fontFamily:"poppins",fontSize:"20px"}} 
                            >
                                Categories
                            </Controls.AccordionSummary>
                            <Controls.AccordionDetails>
                                <Controls.List>
                                    {links.map((link, index) => (
                                        <>
                                        <Controls.Grid item key ={index}>
                                            <NavLink
                                                key={link.name}
                                                to={link.href}
                                                style={({ isActive }) => ({
                                                    color: "black  ",
                                                    textDecoration: 'none',
                                                    cursor: 'pointer',
                                                    fontFamily: "poppins",
                                                    fontWeight: isActive ? "bold " : "normal",
                                                    fontSize: { sm: "25px" },
                                                    display: "flex",
                                                    padding: "10px"
                                                })}
                                                className="custom-navlink"
                                                onClick={() => handleLinkClick(link.name)}
                                            >
                                                {link.name}
                                            </NavLink>

                                            {index <= 3 && <Controls.Divider />}
                                            </Controls.Grid>

                                        </>

                                    ))}

                                </Controls.List>
                            </Controls.AccordionDetails>
                        </Controls.Accordion>
                    </Controls.Grid>
                </Controls.Grid>
                
                <Controls.Grid item xs={12} sm={10} md={9}  sx={{}}  >
                    <Controls.Grid container justifyContent="center" spacing={1}  mt={5}>
                        <ProductsCardsComponent products={products} isProductInWishlist ={isProductInWishlist} handleRemoveFromWishlist={handleRemoveFromWishlist} handleAddToWishlist={handleAddToWishlist} handleInneProducts={handleInneProducts} isProductInCart={isProductInCart}
                        handleRemoveFromCart={handleRemoveFromCart} handleAddToCart={handleAddToCart} handleBuynow={handleBuynow}/>
                    </Controls.Grid>
                </Controls.Grid>
            </Controls.Grid>
        </Controls.Grid>
    );
};

export default ProductsComponent;
