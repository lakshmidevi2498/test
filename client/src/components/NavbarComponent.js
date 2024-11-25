import React, { useEffect, useState } from 'react';
import AppBar from '@mui/material/AppBar';
import { NavLink, useNavigate } from 'react-router-dom';
import Controls from '../commons/Controls'
import useMediaQuery from '@mui/material/useMediaQuery';
import { useSelector } from 'react-redux';
import { deepOrange, deepPurple, teal } from '@mui/material/colors';
import theme from '../utilities/theme';
import { getToken, getUserId } from './GlobalFunctionsComponent';
import { useSearchParams } from 'react-router-dom';

const NavbarComponent = ({value1,value2 ,value3 ,value4 ,value5,image}) => {
  const [activeLink, setActiveLink] = useState('Home');
  const [nameOne, setNameOne] = useState('')
  const [nameTwo, setNameTwo] = useState('')
  const [named, setNamed] = useState('')
  const [wishlistCount, setWishlistCount] = useState(0)
  const [cartCount, setCartCount] = useState(0)
  const [checkoutCount, setCheckoutCount] = useState(0)
  const [drawerOpen, setDrawerOpen] = useState(false);
  const isMobile = useMediaQuery('(max-width: 600px)'); 
  const [token ,setToken] = useState(null)
  const [searchParams] = useSearchParams();

  
  const tokenn = searchParams.get('token');
  const id = searchParams.get('id');
  const username = searchParams.get('name');

  useEffect(() => {
    if (tokenn) {
      localStorage.setItem('googleToken', tokenn);
      console.log('Google token:', localStorage.getItem('googleToken'));
    }
    if (id) {
      localStorage.setItem('socialUserId', id);
      console.log('currentUserId:', localStorage.getItem('socialUserId'));
    }
    if (username) {
      localStorage.setItem('username', username);
    }
  }, [token, id, username]);




 
  const Token = tokenn || localStorage.getItem('Token');
const name = localStorage.getItem('username') || localStorage.getItem('signinUserName') || localStorage.getItem('signupUserName');
console.log("localStorage.getItem('googleToken')",localStorage.getItem('googleToken'))
  useEffect(() => { 
    setToken(Token);
    console.log("token in navbar",token) 
  }, [Token]);  
  

  
 
  
  useEffect(() => {
    if (name) {
      setNamed(name);
      console.log("name",name)
    } 
  }, [name]); 
  
  // useEffect(() => {
  //   // Log token and named state when they change
  //   console.log("Updated token:", token);
  //   console.log("Updated named:", named);
  // }, [token, named]); 

  const loadWishlist = useSelector((state) => state.loadwishlist.data || {});
  const loadCartData = useSelector((state) => state.loadcartproducts.data || {});
  const loadCheckout = useSelector((state)=>state.loadcheckout.data || [] )

  console.log("loadWishlist", loadWishlist);
  console.log("loadCartData", loadCartData);
  console.log("loadCheckout", loadCheckout);

  
  const cartItems = loadCartData.data?.cartProducts?.productId || [];
  const wishlistItems = loadWishlist.data?.wishlistData?.productId || [];
  const checkoutItems = loadCheckout.data?.checkoutProducts?.products || [];

  console.log("cartItems", cartItems);
  console.log("wishlistItems", wishlistItems);
  console.log("checkoutItems", checkoutItems);


 
  useEffect(() => {
    let userId = getUserId()
    let token= getToken()
    if(userId && token){
    if (Array.isArray(cartItems)) {
      const totalCartItems = cartItems.reduce((acc, item) => {
         
        const quantity = parseInt(item.quantity, 10) || ""; 
        return acc + quantity;
      }, 0);
  
      console.log("Total Cart Items:", totalCartItems);
      setCartCount(totalCartItems);
    } 
  }else {
      console.warn("cartItems is not an array:", cartItems);
    }
  }, [loadCartData]);

  
  useEffect(() => {
    let userId = getUserId()
    let token= getToken()
    if(userId && token){
    if (Array.isArray(wishlistItems)) {
      const totalWishlistItems = wishlistItems.reduce((acc, item) => {
        const quantity = parseInt(item.quantity ,10) || ""; 
        return acc +  quantity  ;
      }, 0)
      console.log("Total Wishlist Items:", totalWishlistItems);
      setWishlistCount(totalWishlistItems);
    } 
  }else {
      console.warn("wishlistItems is not an array:", wishlistItems);
    }
  }, [loadWishlist]);

  useEffect(() => {
    let userId = getUserId()
    let token= getToken()
    if(userId && token){
    if (Array.isArray(checkoutItems)) {
      const totalCheckoutItems = checkoutItems.reduce((acc, item) => {
        const quantity = parseInt(item.quantity ,10) || ""; 
        return acc +  quantity  ;
      }, 0)
      console.log("Total checkoutItems:", totalCheckoutItems);
      setCheckoutCount(totalCheckoutItems);
    } 
  }else {
      console.warn("checkoutItems is not an array:", checkoutItems);
    }
  }, [loadCheckout,checkoutItems]);

  const getAvatarColor = (name) => { 
    const firstChar = name.charAt(0).toUpperCase();
  
    if (firstChar >= 'A' && firstChar <= 'I') {
      return deepOrange[500];   
    } else if (firstChar >= 'J' && firstChar <= 'R') {
      return deepPurple[500];   
    } else {
      return teal[500];        
    }
  };


  const navigate = useNavigate()

  const handleLinkClick = (link) => {
    setActiveLink(link);
    setDrawerOpen(false);
  };

  const toggleDrawer = (open) => (event) => {

    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      alert("cvbnm")
      return;
    }
    setDrawerOpen(open);
  };

  const links = [
    { name: 'categories', href: '/categories/vegetable' },
    { name: 'About Us', href: '/aboutus' }, 
  ];



  const drawerLinks = (
    <Controls.Box
      sx={{ width: 250 }}
      role="presentation"
      onClick={() => setDrawerOpen(false)}
      onKeyDown={() => setDrawerOpen(false)}
    >
       
      {links.map((link) => (
                    <NavLink
                      key={link.name}
                      to={link.href}
                      style={({ isActive }) => ({
                        color:  theme.palette.one.links,
                        textDecoration: 'none',
                        cursor: 'pointer',
                        fontFamily:"poppins",
                        fontWeight:isActive ? "bold " :"normal",
                        fontSize:{sm:"25px" },
                        display:"flex",
                        padding:"10px"
                      })}
                      className="custom-navlink"
                      onClick={() => handleLinkClick(link.name)}
                    >
                      {link.name}
                    </NavLink>
                  ))} 
    </Controls.Box>
  );

  const handleHome = () => {
    navigate('/')
  }

  const handleNavigate = () => {
    navigate('/profile')
  }
  const handleCartPage = () => {
    navigate('/cartpage')

  }
  const handleWishlistPage = () => {
    navigate('/wishlist')

  }
  const handleCheckoutPage = () => {
    navigate('/checkout')
  }

  const handleLogin = () => {
    navigate('/login')
  }

  const handleSignup = () => {
    navigate('/register')
  }

  return (
    <>
      <Controls.Box sx={{ flexGrow: 1, top:0,position:"sticky", zIndex: 150 }}>
        <AppBar position="static" sx={{   backgroundColor:"white",height: { xs: "60px", sm: '80px' }, justifyContent: 'center', padding: { xs: "10px", sm: "10px", md: "20px", lg: "30px" },zIndex:100 }}>
          <Controls.Grid container alignItems="center" justifyContent="space-between">
            <Controls.Grid item sx={{ display: 'flex', order: { xs: 1 }, cursor: "pointer", alignItems: "center" }} gap={1} onClick={handleHome}>
              <Controls.Box component="img" src="/assests/images/vegetable.png" alt="Vector Image" width="50px" height="50px" mt={0} />
              <Controls.Typography variant="text1" component="div" 
              sx={{ color:theme.palette.one.title,fontWeight:"bold",
              display: { xs: 'none', sm: "block" }, fontSize: { xs: '10px', sm: "15px", md: "18px" }, marginTop: { xs: "0px", md: "5px", sm: "15px" }, marginBottom: { xs: '0px', sm: '8px', md: "10px" } }}>
                Farm Fresh Foods
              </Controls.Typography>
            </Controls.Grid>

            {isMobile ? (
              <Controls.Grid item sx={{ order: { xs: 3, sm: 2 } }}>
                <Controls.IconButton edge="start"  aria-label="menu" onClick={toggleDrawer(true)} sx={{color:theme.palette.one.links,fontFamily:"poppins", fontWeight:"bold",  fontSize:"18px"}}>
                  <Controls.MenuIcon />
                </Controls.IconButton>
              </Controls.Grid>
            ) : (
              <Controls.Grid item sx={{ order: { xs: 3, sm: 2 }, display:value1}}>
                <Controls.Box sx={{ display: 'flex', gap: { xs: 3, sm: 2, md: 7 } }}>
  {links.map((link) => (
    <NavLink
      key={link.name}
      to={link.href}
      style={({ isActive }) => ({
        color: theme.palette.one.links,
        textDecoration: 'none',
        cursor: 'pointer',
        fontFamily: "poppins",
        fontWeight: isActive ? "bold" : "normal"
      })}
      className="custom-navlink"
      onClick={() => handleLinkClick(link.name)}
    >
      <Controls.Box sx={{ fontSize: { sm: "18px", md: "20px" } }}>
        {link.name}
      </Controls.Box>
    </NavLink>
  ))}
</Controls.Box>

              </Controls.Grid>
            )}
           

            <Controls.Grid item sx={{ order: { xs: 2, sm: 3 }, display: "flex" }} gap={2} >
            <Controls.Grid item mt={{xs:0,sm:0,md:1,lg:0}}  gap={2} sx={{display: "flex" }}>
            <Controls.Badge
                  badgeContent={cartCount}
                  color="secondary"
                  overlap="rectangular"
                  sx={{
                    '& .MuiBadge-badge': {  
                      fontSize: '14px',
                      height: '20px',
                      minWidth: '20px',
                      
                    },
                    display:value2
                  }}
                >
              <Controls.ShoppingCartOutlinedIcon sx={{fontSize:{xs:"25px",sm:"28px",md:"30px",lg:"35px"},color: theme.palette.one.links}} onClick={handleCartPage}/>
              </Controls.Badge> 
              
              
                <Controls.Badge
                  badgeContent={wishlistCount}
                  color="secondary"
                  overlap="rectangular"
                  sx={{
                    '& .MuiBadge-badge': {  
                      fontSize: '14px',
                      height: '20px',
                      minWidth: '20px',
                    },
                    display:value3
                  }}
                >
                  <Controls.FavoriteBorderIcon
                    sx={{ fontSize:{xs:"25px",sm:"28px",md:"30px",lg:"35px"}, color: theme.palette.one.links }}onClick={handleWishlistPage}
                  />
                </Controls.Badge>
                <Controls.Badge
                  badgeContent={checkoutCount}
                  color="secondary"
                  overlap="rectangular"
                  sx={{
                    '& .MuiBadge-badge': {  
                      fontSize: '14px',
                      height: '20px',
                      minWidth: '20px',
                    },
                    display:value4
                  }}
                >
                <Controls.ShoppingBagOutlinedIcon sx={{ fontSize:{xs:"25px",sm:"28px",md:"30px",lg:"35px"}, color: theme.palette.one.links }}onClick={handleCheckoutPage}/> 
                </Controls.Badge>
                </Controls.Grid>
                <Controls.Grid item sx={{display:value5}}>
                {token ? (
                    <Controls.Avatar onClick={handleNavigate} sx={{ bgcolor: getAvatarColor(named),fontSize:{xs:"small",sm:"medium",md:"large"},width: { xs: 30, sm: 35, md: 40 }, height: { xs: 30, sm: 35, md: 40 } }}>
                    {( named ? named.charAt(0) :"").toUpperCase()}
                  </Controls.Avatar>
                ) : (
                  <Controls.Grid item sx={{display:"flex",color:theme.palette.one.links,cursor:"pointer"}} mt={1}>
                   <Controls.Typography variant='h6'sx={{fontSize:"14px"}} onClick={handleLogin}>signin/</Controls.Typography>
                   <Controls.Typography variant='h6'sx={{fontSize:"14px"}} onClick={handleSignup}>signup</Controls.Typography>
                 </Controls.Grid>
                  
                )}
                </Controls.Grid>
               
             
            </Controls.Grid>
          </Controls.Grid>
        </AppBar>

        <Controls.Drawer anchor="right" open={drawerOpen} onClose={toggleDrawer(false)}>
          {drawerLinks}
        </Controls.Drawer>
      </Controls.Box>
    </>
  );
};

export default NavbarComponent