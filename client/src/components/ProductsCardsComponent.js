import React from 'react'
import Controls from '../commons/Controls'
import theme from '../utilities/theme';

const ProductsCardsComponent = ({products ,isProductInWishlist ,handleRemoveFromWishlist ,handleAddToWishlist,handleInneProducts ,isProductInCart
     ,handleRemoveFromCart ,handleAddToCart ,handleBuynow
}) => {

    
  return (
    <>
    <Controls.Grid container justifyContent="center">
    {products.map((item) => (
                            <Controls.Grid key={item._id} item xs={12} sm={6} lg={4} md={6} sx={{ display: { xs: "block", sm: "flex" }, justifyContent: "center" }} gap={{xs:2,sm:4,md:2}}>
                                <Controls.Card  sx={{
                                        borderTopLeftRadius: "30px",
                                        borderBottomRightRadius: "30px",
                                        boxShadow: "0 0 10px rgba(0, 0, 0, 0.1)",
                                        position: "relative",
                                        marginBottom:2,
                                        border:"1px solid red",
                                        width:{xs:"auto",sm:"230px",md:"auto"},
                                        
                                       
                                        ":hover": {
                                            boxShadow: "0 0 15px rgba(0, 0, 0, 0.2)",
                                        },
                                    }}>
                                    {isProductInWishlist(item._id) ? (
                                        <Controls.FavoriteIcon sx={{ position: "absolute", top: 18, right: 18, color: "red" ,}} onClick={() => handleRemoveFromWishlist(item._id)} />

                                    ) : (
                                        <Controls.FavoriteIcon sx={{ position: "absolute", top: 18, right: 18, color: "lightgray" }} onClick={() => handleAddToWishlist(item._id)} />

                                    )}

                                    <Controls.CardMedia
                                        component='img'
                                        src={item.image}
                                        width="100%"
                                        sx={{ width: "250px", height: "200px", padding: "10px", alignItems: "center", justifyContent: "center", display: "flex", margin: "auto" }}
                                        onClick={()=>handleInneProducts(item)}
                                    />
                                    <Controls.CardContent>
                                        <Controls.Typography variant='text1' sx={{ fontSize: "17px", fontWeight: "bold" }}>{item.name}</Controls.Typography>
                                        <Controls.Grid sx={{ display: "flex", justifyContent: "space-between" }}>
                                            <Controls.Typography variant='caption1' sx={{ fontSize: "13px",
                                                        color: theme.palette.one.bg,
                                                        fontWeight: 'bold' }}>Price: Rs {item.price}</Controls.Typography>
                                            <Controls.Typography variant='text1' sx={{  fontSize: "13px",
                                                        color: "#666" }}>Qty: {item.quantity}</Controls.Typography>
                                        </Controls.Grid>
                                    </Controls.CardContent>
                                    <Controls.CardActions sx={{ display: "flex", justifyContent: "space-between" }}>
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
                            </Controls.Grid>
                        ))}
    </Controls.Grid>
    
    </>
  )
}

export default ProductsCardsComponent;