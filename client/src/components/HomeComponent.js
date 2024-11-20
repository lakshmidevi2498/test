import React, { useEffect } from 'react'
import Controls from '../commons/Controls'
import theme from '../utilities/theme';
import { useNavigate } from 'react-router-dom';

const HomeComponent = () => {
  const navigate = useNavigate()
 
const params = new URLSearchParams(window.location.search);

 
console.log("params:", params);

 
const token = params.get('token');
const id = params.get('id');
const username = params.get('name'); 

useEffect(() => { 
  if (token) {
    localStorage.setItem('googleToken', token);
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
    
    const handleNavigate = () => {
      navigate('/categories/vegetable')
    }
  return (
    <>
    <Controls.Grid container justifyContent="center" sx={{ overflow: 'hidden' }}>
  <Controls.Grid item>
    <Controls.Box
      component="img"
      src="./assests/images/bg.avif" width="100%" height="100%"
      sx={{
        top:{xs:0,sm:0},
        width: { xs: '100%', sm: '100vw' },  
        height: { xs: 'auto', md: '100vh',md:"auto" },  
        position:"relative",
        zIndex:1 ,
        objectFit:"cover"  
      }}
     
    />
     <Controls.Grid item  sx={{ position: 'absolute',
        top: {xs:"25%",sm:"45%",md:'65%'},  
        right: {xs:"-20%",sm:'-27%',md:'-29%',lg:"-28%",xl:"-25%"},  
        transform: 'translate(-50%, -50%)',  
        zIndex: 2,}}>
          <Controls.Grid item>
          <Controls.Typography variant='text1' sx={{color:theme.palette.one.title ,fontSize:{xs:"10px",sm:"26px",md:"35px",lg:"50px",xl:"80px"},textShadow: "2px 2px 4px rgba(0, 0, 0, 0.3)",}}>Freshness delivered to your doorstep!</Controls.Typography>
          </Controls.Grid>
          <Controls.Grid item sx={{textAlign:"center" }} mt={{xs:1,sm:4}} onClick={handleNavigate}>
        <Controls.Button variant='primary' sx={{textTransform:"initial",paddingX:{xs:"10px",sm:"20px",lg:"30px",xl:"35px"},paddingY:{xs:"3px",sm:"8px",lg :"12px",xl:"15px"},fontSize:{xs:"10px",sm:"15px",md:"20px",xl:"25px"},}}>Shop now &nbsp; <Controls.ArrowForwardIcon sx={{fontSize:{xs:"small",sm:"medium",xl:"large"}}}/></Controls.Button>
        
        </Controls.Grid>
     </Controls.Grid>
  </Controls.Grid>
</Controls.Grid>
    </>
  )
}

export default HomeComponent