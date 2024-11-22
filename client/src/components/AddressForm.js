import React from 'react';
import Controls from '../commons/Controls';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import { TextField } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import {postAddressInitiate} from'../redux/action/postAddressAction'
import { useNavigate } from 'react-router-dom';
import theme from '../utilities/theme';
import {getToken, getUserId} from './GlobalFunctionsComponent'

const AddressForm = () => { 
    const navigate = useNavigate()

    const postAddress = useSelector((state)=>state.postAddress.data)
    console.log("postAddress",postAddress)

    const dispatch = useDispatch()
    const initialValues = {
        fname: '', lname: '', email: '', number: '', address: '', city: '',
        pincode: '', district: '', country: '',
    };

    const validationSchema = Yup.object().shape({
        fname: Yup.string().required('First name is required'),
        lname: Yup.string().required('Last name is required'),
        email: Yup.string().email('Invalid email format').required('Email is required'),
        number: Yup.string().required('Phone number is required')
            .matches(/^[0-9]{10}$/, 'Phone number must contain 10 digits only'),
        address: Yup.string().required('Address is required'),
        city: Yup.string().required('City is required'),
        pincode: Yup.string().required('Pincode is required'),
        district: Yup.string().required('District is required'),
        country: Yup.string().required('Country is required'),  
    });

    const onSubmit = async (values, actions) => {
        let userId = getUserId()
        let token = getToken()
    
        console.log("userId ", userId);
        console.log("Form Values:", values);
        actions.resetForm();
        if(userId && token){
        await dispatch(postAddressInitiate(token,values,userId))
        navigate('/addressdetails')
        } 

    };

    return (
        <Controls.Grid container justifyContent="center" sx={{ position: 'relative', height: {xs:'auto',lg:"100vh"} }}>
             
            <Controls.Box 
                sx={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    backgroundImage: "url('./assests/images/form.jpg')",
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                    zIndex: 1,
                }}
            />
             
            <Controls.Grid item xs={10} md={8} lg={6} sx={{ position: "relative", zIndex: 2, padding: 4,marginY:"auto",backgroundColor:'rgba(255, 255, 255, 0.3)',borderRadius:"20px"}}>
                <Controls.Typography variant='text1'sx={{}}>Add shipping address</Controls.Typography>
                <Formik
                    initialValues={initialValues}
                    validationSchema={validationSchema}
                    onSubmit={onSubmit}
                >
                    {({ errors, touched ,isSubmitting}) => (
                        <Form>
                            <Controls.Grid item sx={{ height: "auto" }}>
                                <Controls.Grid item xs={12} sx={{   }}>
                                    <Controls.Grid item xs={12} sx={{ mb: { xs: 2, sm: 3 }, mt: { xs: 3 }, display: { xs: 'center', sm: "flex" }, justifyContent: { xs: "center", sm: "space-between" }, color: "black" }} gap={3}>
                                        <Field
                                            name="fname"
                                            as={TextField}
                                            label="First Name"
                                            size="small"
                                            fullWidth
                                            autoComplete ="off" 
                                            error={touched.fname && Boolean(errors.fname)}
                                            helperText={touched.fname && errors.fname}
                                            sx={{marginBottom:{xs:3,sm:0}}}
                                        />
                                        <Field
                                            name="lname"
                                            as={TextField}
                                            label="Last Name"
                                            size="small"
                                            fullWidth
                                            autoComplete ="off" 
                                            error={touched.lname && Boolean(errors.lname)}
                                            helperText={touched.lname && errors.lname}
                                        />
                                    </Controls.Grid>
                                    <Controls.Grid item xs={12} sx={{ mb: { xs: 2, sm: 3 }, mt: { xs: 3 }, display: { xs: 'center', sm: "flex" }, justifyContent: { xs: "center", sm: "space-between" } }} gap={3}>
                                        <Field
                                            name="email"
                                            as={TextField}
                                            label="Email"
                                            size="small"
                                            fullWidth
                                            autoComplete ="off"  
                                            error={touched.email && Boolean(errors.email)}
                                            helperText={touched.email && errors.email}
                                            sx={{marginBottom:{xs:3,sm:0}}}
                                        />
                                        <Field
                                            name="number"
                                            as={TextField}
                                            label="Number"
                                            size="small"
                                            fullWidth
                                            autoComplete ="off" 
                                            error={touched.number && Boolean(errors.number)}
                                            helperText={touched.number && errors.number}
                                        />
                                    </Controls.Grid>
                                    <Controls.Grid item xs={12}>
                                        <Field
                                            name="address"
                                            as={TextField}
                                            label="Address"
                                            size="small"
                                            fullWidth
                                            autoComplete ="off" 
                                            error={touched.address && Boolean(errors.address)}
                                            helperText={touched.address && errors.address}
                                        />
                                    </Controls.Grid>
                                    <Controls.Grid item xs={12} sx={{ mb: { xs: 2, sm: 3 }, mt: { xs: 3 }, display: { xs: 'center', sm: "flex" }, justifyContent: { xs: "center", sm: "space-between" } }} gap={3}>
                                        <Field
                                            name="city"
                                            as={TextField}
                                            label="City"
                                            size="small"
                                            fullWidth
                                            autoComplete ="off" 
                                            error={touched.city && Boolean(errors.city)}
                                            helperText={touched.city && errors.city}
                                            sx={{marginBottom:{xs:3,sm:0}}}
                                        />
                                        <Field
                                            name="pincode"
                                            as={TextField}
                                            label="Pincode"
                                            size="small"
                                            fullWidth
                                            autoComplete ="off" 
                                            error={touched.pincode && Boolean(errors.pincode)}
                                            helperText={touched.pincode && errors.pincode}
                                        />
                                    </Controls.Grid>
                                    <Controls.Grid item xs={12} sx={{ mb: { xs: 2, sm: 3 }, mt: { xs: 3 }, display: { xs: 'center', sm: "flex" }, justifyContent: { xs: "center", sm: "space-between" } }} gap={3}>
                                        <Field
                                            name="district"
                                            as={TextField}
                                            label="District"
                                            size="small"
                                            fullWidth
                                            autoComplete ="off" 
                                            error={touched.district && Boolean(errors.district)}
                                            helperText={touched.district && errors.district}
                                            sx={{marginBottom:{xs:3,sm:0}}}
                                        />
                                        <Field
                                            name="country"
                                            as={TextField}
                                            label="Country"
                                            size="small"
                                            fullWidth
                                            autoComplete ="off" 
                                            error={touched.country && Boolean(errors.country)}
                                            helperText={touched.country && errors.country}
                                        />
                                    </Controls.Grid>
                                    <Controls.Grid item>
                                        <Controls.Button variant='secondary' sx={{textTransform:'initial'}} 
                                        disabled={isSubmitting}
                                        type='submit'>Add Address</Controls.Button>
                                    </Controls.Grid>
                                </Controls.Grid>
                            </Controls.Grid>
                        </Form>
                    )}
                </Formik>
            </Controls.Grid>  
        </Controls.Grid>
    );
}

export default AddressForm;
