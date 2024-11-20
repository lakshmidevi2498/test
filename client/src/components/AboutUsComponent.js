import React from 'react'
import Controls from '../commons/Controls'
import theme from '../utilities/theme'

const AboutUsComponent = () => {
  return (
    <>
     <Controls.Grid container justifyContent="center">
        <Controls.Grid item sx={{backgroundColor:"#faf3d2",padding:4,textAlign:"center"}} xs={12}>
            <Controls.Typography variant='text1' sx={{fontSize:{xs:"40px",fontWeight:"bold",color:theme.palette.one.title}}}>
                About Us 
            </Controls.Typography>
        </Controls.Grid>
        <Controls.Grid item xs={10}>
            <Controls.Grid item mt={3}>
        <Controls.Typography variant='text1' sx={{fontSize:{xs:"18px",sm:"25px"},color:theme.palette.one.bg,fontWeight:"bold"}}> Sustainable Organic Farming for a Healthier Future</Controls.Typography>
        <Controls.Grid item  xs={12}sx={{display:{xs:"block",sm:"flex"},justifyContent:{xs:"center",sm:"space-between"},alignItems:"center"}}  mt={1}gap={3}>
            
            <Controls.Grid item xs={12} sm={6}>
                <Controls.Box component="img" src="./assests/images/about1.avif" sx={{width:{xs:"100%",sm:"300px",md:"400px",lg:"550px"},height:{xs:"100%",sm:"300px",md:"320px",lg:"100%"},borderTopLeftRadius:"80px",borderBottomRightRadius:"80px"}}/>
            </Controls.Grid>
            <Controls.Grid item xs={12} sm={6} sx={{marginRight:"auto"}}>
               <Controls.Typography variant='text1' sx={{fontSize:{xs:"16px",sm:"12px",md:"14px",lg:"18px"}}}>At Farm Fresh Foods, we are passionate about providing fresh, nutritious, and sustainably grown organic produce to our community. We believe in the power of nature to nourish, and we are committed to cultivating crops without the use of harmful chemicals, pesticides, or synthetic fertilizers. Our goal is to promote a healthier lifestyle, preserve the environment, and support biodiversity through ethical and responsible farming practices.</Controls.Typography>
               <Controls.Grid item mt={1}>
                <Controls.Typography variant='text1'sx={{fontSize:{xs:"16px",sm:"12px",md:"14px",lg:"18px"},}} >Healthy soil is the foundation of any successful organic farm. We use natural methods like composting, mulching, and crop rotation to maintain healthy, fertile soil that produces robust, nutrient-dense crops.</Controls.Typography>
                </Controls.Grid>
            </Controls.Grid>
        </Controls.Grid>
        </Controls.Grid>
        <Controls.Grid item mt={3}>
        <Controls.Typography variant='text1' sx={{fontSize:{xs:"18px",sm:"25px"},color:theme.palette.one.bg,fontWeight:"bold"}}>Our Philosophy</Controls.Typography>
        
        <Controls.Grid item  xs={12}sx={{display:{xs:"block",sm:"flex"},justifyContent:{xs:"center",sm:"space-between"},alignItems:"center"}}  mt={1}gap={3}>
            <Controls.Grid item xs={12} sm={6}>
                <Controls.Typography variant='text1'sx={{fontSize:{xs:"16px",sm:"12px",md:"14px",lg:"18px"}}}>We are more than just farmers — we are stewards of the land. Our philosophy revolves around working in harmony with nature, preserving the integrity of the soil, and producing food that is not only healthy for you but also for the planet. By using crop rotation, composting, and natural pest control methods, we ensure that our farms are productive and sustainable for future generations.</Controls.Typography>
                <Controls.Grid item mt={1} >
                <Controls.Typography variant='text1'sx={{fontSize:{xs:"16px",sm:"12px",md:"14px",lg:"18px"},}} >We believe in regenerative agriculture that works with the land, not against it. Our farming practices conserve water, reduce soil erosion, and foster a diverse ecosystem on our farm. We aim to leave the earth in better condition than we found it.</Controls.Typography>
                </Controls.Grid>
            </Controls.Grid>
            <Controls.Grid item xs={12} sm={6} sx={{textAlign:"right"}}>
                <Controls.Box component="img" src="./assests/images/about2.jpg" sx={{width:{xs:"100%",sm:"300px",md:"400px",lg:"550px"},height:{xs:"100%",sm:"300px",md:"320px",lg:"100%"},borderTopLeftRadius:"80px",borderBottomRightRadius:"80px"}}/>
            </Controls.Grid>
        </Controls.Grid>
        </Controls.Grid>
        </Controls.Grid>
        
    </Controls.Grid>
    </>
  )
}

export default AboutUsComponent