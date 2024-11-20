import React from 'react'
import Controls from '../commons/Controls'
import theme from '../utilities/theme'

const WhyChooseComponent = () => {

    const content = [
        {img:"./assests/images/piggy-bank.png",text:"Save more ",descp:"on your purchase"},
        {img:"./assests/images/vegetable.png",text:"Farm Fresh Foods",descp:"Promising Forever, Delivering Always"},
        {img:"./assests/images/free-shipping.png",text:"On-Time Delivery ",descp:"Arrives Today, Just for You"},
    ]
    return (
        <>
            <Controls.Grid container justifyContent="center" mt={5}>
                <Controls.Grid item xs={10} sx={{ justifyContent: "center", alignItems: "center", textAlign: "center" }}>
                    <Controls.Grid
                        item
                        sx={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 2 }}
                    >
                        <Controls.Divider
                            sx={{ width: {xs:"50px",sm:"100px"}, height: "4px", backgroundColor: "green" }}
                        />

                        <Controls.Typography
                            variant="h4"
                            sx={{ whiteSpace: 'nowrap', color: theme.palette.one.bg, fontWeight: "bold",fontSize:{xs:"16px",md:"18px",lg:"20px",xl:"25px"} }}
                        >
                            Why Choose Us
                        </Controls.Typography>

                        <Controls.Divider
                            sx={{ width:{xs:"50px",sm:"100px"}, height: "4px", backgroundColor: "green" }}
                        />
                    </Controls.Grid>
                    <Controls.Grid container justifyContent='center' spacing={2} mt={5} >
                        {content.map((item,index)=>(
                            <Controls.Grid item xs={12} sm={4}md={4} key={index}>
                                <Controls.Card sx={{height:"auto",width:{xs:"100%",},backgroundColor:"#d0f0f7","&:hover":{boxShadow: "2px 2px 8px rgba(0, 0, 0, 0.3)" }}}>
                                    
                                    <Controls.Box component="img" src={item.img} width="100%" height="100%" sx={{width:"150px",height:"150px",padding:"20px"}}/>
                                    <Controls.Grid item>
                                        <Controls.Typography variant='h5' sx={{fontWeight:"bold",fontSize:{xs:"22px",sm:"20px",lg:"25px"}}}>{item.text}</Controls.Typography>
                                    </Controls.Grid>
                                    <Controls.Grid item mb={4}>
                                        <Controls.Typography variant='h6' sx={{color:"gray",fontSize:{xs:"14px",sm:"12px"}}}>{item.descp}</Controls.Typography>
                                    </Controls.Grid>
                                </Controls.Card>

                            </Controls.Grid>
                        ))}
                    </Controls.Grid>

                </Controls.Grid>
            </Controls.Grid>
        </>
    )
}

export default WhyChooseComponent