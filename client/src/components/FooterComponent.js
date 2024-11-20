import React from 'react'
import Controls from '../commons/Controls'
import { useNavigate } from 'react-router-dom';
import theme from '../utilities/theme';

const FooterComponent = () => {
    const navigate = useNavigate()
    const links = [ 
        { name: 'Vegetables', href: '/vegetables' },
        { name: 'Fruits', href: '/fruits' },
        { name: 'Oils ', href: '/oils' },
        { name: 'Dals', href: '/dals' },
        { name: 'Dairy', href: '/dairy' },
    ]; 

    const content3 = [
          "Secure Checkout", "Fast Delivery", "Free Shipping", "No Hidden Fees", "Easy Returns"
    ];

    const content4 = [
        "Monday to Friday: 9 AM - 6 PM", "Saturday: 10 AM - 4 PM ", "Sunday: Closed"
    ];
    const content5=[
        "Email: support@example.com", "Contact No: +91 9685745698",
    ]

    const icons = [
        { Icon: Controls.WhatsAppIcon, key: 'whatsapp' },
        { Icon: Controls.FacebookIcon, key: 'facebook' },
        { Icon: Controls.InstagramIcon, key: 'instagram' },
        { Icon: Controls.LinkedInIcon, key: 'linkedin' },
    ]

    const handleNavigate = (value) => { 
        navigate(value)
    }
    return (
        <>
            <Controls.Grid container justifyContent="center" mt={5} sx={{backgroundColor:"#7a4958"}} color="white">
    <Controls.Grid item xs={10}  sx={{ paddingY: "40px" }}>
        <Controls.Grid container justifyContent='center'>
            
            <Controls.Grid item xs={12} sx={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between' }}>
                 
                <Controls.Grid item xs={12} sm={6} md={3} lg={3} sx={{ paddingY: '20px' }}>
                    <Controls.Typography variant='caption1' sx={{ fontWeight: "bold", fontSize: { xs: "20px", xl: "20px" } }}>Categories</Controls.Typography>
                    <Controls.List sx={{ paddingLeft: '20px', listStyleType: 'disc' }}>
                        {links.map((item, index) => (
                            <Controls.ListItem key={index} sx={{ fontWeight: "medium", padding: 1, display: 'list-item', fontFamily: "poppins", cursor: "pointer", fontSize: { xs: "16px" } ,"&:hover":{color:"black"}}} onClick={() => { handleNavigate(item.href) }}>
                                {item.name}
                            </Controls.ListItem>
                        ))}
                    </Controls.List>
                </Controls.Grid>


                 
                <Controls.Grid item xs={12} sm={6} md={3} lg={3} sx={{ padding: '20px' }}>
                    <Controls.Typography variant='caption1' sx={{ fontWeight: "bold", fontSize: { xs: "20px" } }}>Payment and Shipping</Controls.Typography>
                    <Controls.List sx={{ paddingLeft: '20px', listStyleType: 'disc' }}>
                        {content3.map((item, index) => (
                            <Controls.ListItem key={index} sx={{ fontWeight: "medium", display: 'list-item', fontFamily: "poppins", fontSize: { xs: "16px" } ,"&:hover":{color:"black"}}}>{item}</Controls.ListItem>
                        ))}
                    </Controls.List>
                </Controls.Grid>
 
                <Controls.Grid item xs={12} sm={6} md={3} lg={3} sx={{ padding: '20px' }}>
                    <Controls.Typography variant='caption1' sx={{ fontWeight: "bold", fontSize: { xs: "20px" } }}>Our Timings</Controls.Typography>
                    <Controls.List sx={{ paddingLeft: '20px', listStyleType: 'disc' }}>
                        {content4.map((item, index) => (
                            <Controls.ListItem key={index} sx={{ fontWeight: "medium", display: 'list-item', fontFamily: "poppins", fontSize: { xs: "16px" } ,"&:hover":{color:"black"}}}>{item}</Controls.ListItem>
                        ))}
                    </Controls.List>
                </Controls.Grid>

                
                <Controls.Grid item xs={12} sm={6} md={3} lg={3} sx={{ padding: '20px' }}>
                    <Controls.Typography variant='caption1' sx={{ fontWeight: "bold", fontSize: { xs: "20px" } }}>Contact Us</Controls.Typography>
                    <Controls.List sx={{ paddingLeft: '20px', listStyleType: 'disc' }}>
                        {content5.map((item, index) => (
                            <Controls.ListItem key={index} sx={{ fontWeight: "medium", display: 'list-item', fontFamily: "poppins", fontSize: { xs: "16px" } ,"&:hover":{color:"black"}}}>{item}</Controls.ListItem>
                        ))}
                    </Controls.List>
                </Controls.Grid>
            </Controls.Grid>

        </Controls.Grid>
         
        <Controls.Grid item sx={{ justifyContent: "center", alignItems: "center", textAlign: "center" }} gap={3} xs={12}>
            <Controls.Grid item>
                {icons.map(({ Icon, key }) => (
                    <Icon key={key} sx={{ fontSize: "30px", color: "" }} />
                ))}
            </Controls.Grid>
        </Controls.Grid>
    </Controls.Grid>
</Controls.Grid>

        </>
    )
}

export default FooterComponent
