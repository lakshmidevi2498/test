import React, { useEffect, useState } from 'react'
import Controls from '../commons/Controls'
import { loadProductsDataInitiate } from '../redux/action/loadProductsDataAction'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import ReusableSwiper from './ReusableSwiper'
import theme from '../utilities/theme'

const RelatedProducts = () => {
    const [related , setRelated] = useState([])
    const [loading, setLoading] = useState(true);
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const productsData = useSelector((state) => state.loadproductsdata.data2 || {});
    const actualData = productsData.data || [];

    useEffect(() => {
        
            dispatch(loadProductsDataInitiate());
            setLoading(false);
       
    }, []);

    useEffect(() => {
        const productType = localStorage.getItem('type')
        console.log("productType",productType)
        if (actualData.length > 0) {
            
            const filtered = actualData.filter((products) => products.type === productType);
            setRelated(filtered);
            console.log("filtered",filtered)
        }
    }, [actualData]);
  return (
    <>
    <Controls.Grid container justifyContent="center">
        <Controls.Grid item xs={10} mb={5}>
            <Controls.Grid item mb={3} mt={8}>
                <Controls.Typography variant='caption1'sx={{ color: theme.palette.one.title, fontWeight: 'bold', fontSize: '30px' }}>Related Products</Controls.Typography>
            </Controls.Grid>
            <Controls.Grid item mb={2}>
<ReusableSwiper product={related}  topValue={ {xs:"150%",sm:'130%',md:"145%",lg:"165%",xl:"90%"}}  
            leftValue={"9%"}/>
            </Controls.Grid>    
        </Controls.Grid>
    </Controls.Grid>
    
    </>
  )
}

export default RelatedProducts