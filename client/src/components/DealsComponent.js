import React from 'react'
import Controls from '../commons/Controls'
import theme from '../utilities/theme'
import { useNavigate } from 'react-router-dom';

const   DealsComponent = () => {

  const navigate = useNavigate()
  const content = [
    {
      image: "./assests/images/image1.jpg",
      text: "Deal of the day 15% off on vegetables",
      onClick: () => handleVegetableDeal(),  
    },
    {
      image: "./assests/images/image2.jpg",
      text: "Exclusive 20% discount on fruits",
      onClick: () => handleFruitDeal(), 
    },
    {
      image: "./assests/images/image3.jpg",
      text: "Fresh milk 10% off",
      onClick: () => handleMilkDeal(),  
    }
  ];

  const handleVegetableDeal = () => {
    navigate('/categories/vegetable') 
  };

 
  const handleFruitDeal = () => {
    navigate('/categories/fruits')  
  };

 
  const handleMilkDeal = () => { 
    navigate('/categories/dairy') 
  };


  return (
    <Controls.Grid container justifyContent="center"  mt={5}>
        <Controls.Grid item xs={10}>
            <Controls.Grid item my={3}>
                <Controls.Typography variant='caption1'sx={{ color: theme.palette.one.title, fontWeight: 'bold', fontSize: {xs:"28px",sm:'30px'} }}>Limited Time Offers</Controls.Typography>
            </Controls.Grid>
      <Controls.Grid item xs={12} sx={{display:{xs:"block",sm:"flex"}}} gap={2} >
        {content.map((item, index) => (
          <Controls.Grid 
            item 
            xs={12} 
            sm={6} 
            md={4}
            mb={{xs:2}} 
            key={index} 
            sx={{ position: 'relative', overflow: 'hidden', borderRadius: '8px',display:{xs:"block",sm:"flex"},justifyContent:{xs:"center",sm:"space-between"},
            transition: 'transform 0.3s ease, opacity 0.3s ease',  borderTopLeftRadius:"40px",borderBottomRightRadius:"40px",
            '&:hover': {
              transform: 'scale(1.05)',  
              opacity: 0.9,  
            }, }}
          >
           
            <Controls.Box 
              component="img" 
              src={item.image} 
              alt="Deal Image" 
              sx={{
                width: '100%',
                height: '100%',
                objectFit: 'cover',
                display: 'block',
    
              }}
            />

             
            <Controls.Box
              sx={{
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                backgroundColor: 'rgba(15, 14, 14, 0.5)',
                zIndex: 1,
              }}
            />

             
            <Controls.Box
              sx={{
                position: 'absolute',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                zIndex: 2,
                textAlign: 'center',  
              }}
            >
              <Controls.Typography 
                variant='caption1' 
                sx={{
                  fontSize: { xs: "20px", sm: "15px", md: "20px", lg: "30px", xl: "35px" },
                  fontWeight: 700,
                  color:theme.palette.one.btn
                }}
              >
                {item.text}
              </Controls.Typography>
              <Controls.Grid item>
              <Controls.Button variant='outlined' sx={{padding:{sm:"2px",md:"4px",lg:"6px",xl:"10px"},color:theme.palette.one.btn,border:"2px solid white",textTransform:"initial",backgroundColor:"transparent"}} onClick={item.onClick}>shop now&nbsp; <Controls.ArrowForwardIcon sx={{fontSize:{xs:"small",sm:"medium",xl:"large"}}}/></Controls.Button>
              </Controls.Grid>
            </Controls.Box>
          </Controls.Grid>
        ))}
      </Controls.Grid>
      </Controls.Grid>
    </Controls.Grid>
  );
};

export default DealsComponent;
