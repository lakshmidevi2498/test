import React, { useEffect, useState } from 'react'
import Controls from '../commons/Controls'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { loadProductsDataInitiate } from '../redux/action/loadProductsDataAction';
import theme from '../utilities/theme';
import Fade from '@mui/material/Fade';
import CardsComponent from './CardsComponent';

const TodayDealsComponent = () => {

    const [products, setProducts] = useState([])
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const productsData = useSelector((state) => state.loadproductsdata.data2 || {});
    const actualData = productsData.data || [];

    useEffect(() => {

        dispatch(loadProductsDataInitiate());

    }, [dispatch, navigate]);

    useEffect(() => {
        if (actualData.length > 0) {
            const filtered = actualData.filter((product) => product.type === "vegetable");
            setProducts(filtered);
        }
    }, [actualData]);


    return (
        <>
            <Controls.Grid container justifyContent='center'>
                <Controls.Grid item xs={10} >
                    <Controls.Grid item sx={{}} my={4}>
                        <Controls.Typography variant='caption1' sx={{ color: theme.palette.one.bg, fontWeight: "bold", fontSize: "30px" }}>Organic & Natural </Controls.Typography>
                    </Controls.Grid>
                    <CardsComponent products ={products}/>

                </Controls.Grid>
            </Controls.Grid>
        </>
    )
}

export default TodayDealsComponent