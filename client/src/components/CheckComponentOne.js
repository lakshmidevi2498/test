import React from 'react'
import Controls from '../commons/Controls' 
import theme from '../utilities/theme';

const CheckComponentOne = ({ handleIncrement, handleNavigateToPayment, handleRemoveFromCheckout, handleDecrement, products, totalPrice, totalItems }) => {
    return (
        <>
            <Controls.Grid item  xs={11}>
                <Controls.Grid item xs={12} mt={4} sx={{ display: "flex", justifyContent: "space-between" }} gap={2}>

                    <Controls.Grid item xs={9}>
                        <Controls.Card sx={{ borderRadius: "10px" }}>
                            {products.length > 0 ?
                             (<>
                                <Controls.Grid item sx={{ backgroundColor: theme.palette.one.title, padding: "3px", color: theme.palette.one.btn }}>
                                    <Controls.Typography variant='caption1' sx={{ fontSize: "25px" }}>Order Summary</Controls.Typography>
                                </Controls.Grid>
                                <Controls.Divider />
                                <Controls.Grid item sx={{ backgroundColor: "lightgray", padding: "3px", color: theme.palette.one.btn }}>
                                    <Controls.Grid item sx={{ display: "flex", justifyContent: "space-between", paddingX: "30px" }} gap={2}>
                                        {["product", "name", "price", "amount", "quantity", "Action"].map((item, index) => (
                                            <Controls.Typography variant='caption1' sx={{ fontSize: "25px" }} key={index}>
                                                {item}
                                            </Controls.Typography>
                                        ))}
                                    </Controls.Grid>
                                    <Controls.Grid item gap={2}>

                                    </Controls.Grid>

                                </Controls.Grid>



                                <Controls.Grid container >

                                    {products.length > 0 && products.map((item, index) => (
                                        <Controls.Grid container key={index} sx={{ display: "flex", justifyContent: "space-between", paddingY: "10px" }} gap={0.5}>
                                            <Controls.Grid item xs={2} textAlign="center">
                                                <Controls.CardMedia component="img" src={item.image} sx={{ height: "80px", width: "80px" }} />
                                            </Controls.Grid>

                                            <Controls.Grid item xs={1.5} textAlign="center">
                                                <Controls.Typography variant="caption1" sx={{ fontSize: '15px', fontWeight: 'bold' }}>
                                                    {item.name}
                                                </Controls.Typography>
                                            </Controls.Grid>

                                            <Controls.Grid item xs={2} textAlign="center">
                                                <Controls.Typography variant="caption1" sx={{ fontSize: '15px' }}>
                                                    Rs {item.price}
                                                </Controls.Typography>
                                            </Controls.Grid>

                                            <Controls.Grid item xs={2} textAlign="center">
                                                <Controls.Typography variant="caption1" sx={{ fontSize: '15px' }}>
                                                    Rs {item.price * item.quantity}
                                                </Controls.Typography>
                                            </Controls.Grid>

                                            <Controls.Grid item xs={2} textAlign="center">
                                                <Controls.Grid container alignItems="center" justifyContent="center">
                                                    <Controls.Button variant="outlined" sx={{ minWidth: 0, padding: 1 }} onClick={() => handleDecrement(item._id)}>
                                                        <Controls.RemoveIcon fontSize="small" />
                                                    </Controls.Button>
                                                    <Controls.Typography variant="caption1" sx={{ fontSize: '15px', marginX: 1 }}>
                                                        {item.quantity}
                                                    </Controls.Typography>
                                                    <Controls.Button variant="outlined" sx={{ minWidth: 0, padding: 1 }} onClick={() => handleIncrement(item._id)}>
                                                        <Controls.AddIcon fontSize="small" />
                                                    </Controls.Button>
                                                </Controls.Grid>
                                            </Controls.Grid>

                                            <Controls.Grid item xs={2} textAlign="center">
                                                <Controls.Button
                                                    variant="contained"
                                                    sx={{ backgroundColor: 'lightcoral', textTransform: 'initial' }}
                                                    onClick={() => handleRemoveFromCheckout(item._id)}
                                                >
                                                    Remove
                                                </Controls.Button>
                                            </Controls.Grid>
                                        </Controls.Grid>
                                    ))}

                                </Controls.Grid>
                            </>) : (
                                <>
                                <Controls.Grid
              container
              item
              xs={12}
              
              sx={{
                  display: "block", 
                  alignItems: "center",
                  textAlign: "center",
                  overflow: "hidden" 
              }}
          >
              <Controls.Grid item xs={12}>
                  <Controls.Box
                      component="img"
                      src="./assests/images/Animation - 1730963363634.gif"
                     sx={{justifyContent:"center",margin:"auto",textAlign:"center",display:"flex",alignItems:"center"}}
                      
                  />
              </Controls.Grid>
              <Controls.Grid item sx={{ textAlign: "center" }} xs={12}>
                  <Controls.Typography
                      variant="text1"
                      sx={{ fontSize: { xs: "20px", sm: "30px" } }}
                  >
                      Your bag is empty
                  </Controls.Typography>
              </Controls.Grid>
          </Controls.Grid>
                                </>
                            ) }
                        </Controls.Card>
                    </Controls.Grid>
                    {products.length > 0 && 
                    (<Controls.Grid item xs={3} sx={{ display: "block" }}>
                        <Controls.Card sx={{ borderRadius: "10px", padding: 2 }}>
                            <Controls.Grid item sx={{}} mt={1}>
                                <Controls.Typography variant='caption1' sx={{ fontSize: "18px", fontWeight: "bold" }}> Your Cart Total Price</Controls.Typography>
                            </Controls.Grid>
                            <Controls.Grid item sx={{ display: "flex", justifyContent: "space-between", fontSize: "18px", borderTop: "1px dashed black", borderBottom: "1px dashed gray" }} mt={2}>
                                <Controls.Typography variant='caption1' sx={{}}>total items</Controls.Typography>
                                <Controls.Typography variant='caption1'  >{totalItems} {totalItems > 1 ? 'pieces' : 'piece'}</Controls.Typography>
                            </Controls.Grid>
                            <Controls.Grid item sx={{ display: "flex", justifyContent: "space-between", }} mt={2}>
                                <Controls.Typography variant='caption1' sx={{ fontSize: "25px", }}>Total Price</Controls.Typography>
                                <Controls.Typography variant='caption1' sx={{ fontSize: "25px", }}>₹{totalPrice}/-</Controls.Typography>
                            </Controls.Grid>
                            <Controls.Grid item mt={2}>
                                <Controls.Button variant='contained' sx={{ textTransform: "initial", backgroundColor: "green", color: "white" }}
                                    onClick={() => handleNavigateToPayment(products)}
                                >Proceed to Pay</Controls.Button>
                            </Controls.Grid>
                        </Controls.Card>
                    </Controls.Grid>)}
                </Controls.Grid> 
            </Controls.Grid>
        </>
    )
}

export default CheckComponentOne