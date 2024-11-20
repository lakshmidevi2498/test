import React, { useEffect, useState } from 'react'
import Controls from '../commons/Controls'
import NavbarComponent from './NavbarComponent'
import { useLocation, useNavigate } from 'react-router-dom'
import theme from '../utilities/theme'


const InnerProductsComponent = () => {
    const [product, setProduct] = useState([])
  
    const [count, setCount] = useState(1)
 
    const location = useLocation()
    const navigate = useNavigate()


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
                                <Controls.Grid item xs={12} sm={8} sx={{ display: "flex", }} gap={3}>
                                    <Controls.Grid item  >
                                        <Controls.Button variant="outlined" sx={{ textTransform: 'initial', fontSize: { xs: '12px' } }}>
                                            Buy now
                                        </Controls.Button>
                                    </Controls.Grid>
                                    <Controls.Grid item   >
                                        <Controls.Button variant="primary" sx={{ textTransform: 'initial', fontSize: { xs: '12px' } }}>Add To Cart</Controls.Button>
                                    </Controls.Grid>
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