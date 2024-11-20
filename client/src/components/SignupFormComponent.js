import React, { useEffect, useState } from 'react';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import Controls from '../commons/Controls' 
import { useNavigate, } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { emailSignupInitiate } from '../redux/action/emailSignupAction';

const SignupFormComponent = () => { 
  const navigate = useNavigate()
  const dispatch = useDispatch() 

  const postedUserData = useSelector((state)=>state.postuserdata.data2)
  console.log("postedUserData",postedUserData)

  const initialValues = {
    fname: '', lname: '', email: '', phone: '', password: "", confirmPassword: "", gender: ""
  };

  const validationSchema = Yup.object().shape({
    fname: Yup.string().required('First name is required'),
    lname: Yup.string().required('Last name is required'),
    email: Yup.string().email('Invalid email format').required('Email is required'),
    phone: Yup.string().required('Phone number is required')
      .matches(/^[0-9]{10}$/, 'Phone number contains 10 digits only'),
    password: Yup.string().required("password is required"),
    confirmPassword: Yup.string().required("confirmpassword is required"),
    gender: Yup.string().required("gender is required")
  });

  const onSubmit = async (values, actions) => {
    console.log("Form Values:", values);
    actions.resetForm();
    handleSignup(values)

  }
  const handleNavigate = () => { 
    navigate('/login')
  }
  const handleSignup = (user) => {
    dispatch(emailSignupInitiate(user ,navigate)) 
  }
  useEffect(() => {
    const res = postedUserData.data;
    
    if (res && res.newUser) {
      console.log("res", res);
      localStorage.setItem("Token", res.token);
      console.log("token in signup", res.token);
  
      const userId = res.newUser._id;
      const userName = res.newUser.name;
      localStorage.setItem("signupUserId", userId);
      localStorage.setItem("signupUserName", userName);
    }
  }, [postedUserData]);
  
     


    
     
  
  const radioStyles = {
    color: 'black',
    '&.Mui-checked': {
        color: 'black',
        backgroundColor: 'lightwhite',
        fontFamily:"poppins",
    },
    '&.MuiRadio-label':{
      color:"black"
    },
    '&.MuiRadio-root:hover': {
        backgroundColor: 'lightgray',
        fontFamily:"poppins",
    },
};
const labelStyles = {
  color: 'black',  
  fontFamily: 'Poppins',
};



  return (
    <>
      <Controls.Grid container width="100%" height="100%" sx={{ position: "relative", }}>
        <Controls.Box component='img' src="./assests/images/form.jpg" sx={{ position: "relative", zIndex: 1, objectFit: "cover", width: "100%",
      height: {xs:"1000px",sm:"100vh"}, }} />
  
        <Controls.Box sx={{ position: "absolute", zIndex: 3, justifyContent: "center", alignItems: "center",width: "100%",
      height: "auto",}} mt={2}>
          <Controls.Grid item xs={11} sm={8} md={6} sx={{    justifyContent: "center",alignItems:"center",margin:"auto"}}>

            <Controls.Grid container sx={{ justifyContent: "center",  }}  >

              <Controls.Grid item xs={12} sx={{backgroundColor:'rgba(255, 255, 255, 0.3)',borderRadius:"20px",paddingX:5,paddingY:3, }}  >

                <Formik
                  initialValues={initialValues}
                  validationSchema={validationSchema}
                onSubmit={onSubmit}
                >
                  {({ errors, touched, isSubmitting, }) => (
                    <Form>
                      <Controls.Grid container spacing={2} item sx={{ height: "auto",alignItems:"center",}}>

                        <Controls.Grid item sx={{ textAlign: "center", justifyContent: "center" }} >
                          <Controls.Typography
                            variant='text1'
                            sx={{ fontWeight: "bold", fontSize: { xs: "15px", md: "20px", xl: "25px" } }}
                          >
                            Register for exclusive deals
                          </Controls.Typography>
                        </Controls.Grid>


                        <Controls.Grid container spacing={{xs:4,sm:2}} item>
                          <Controls.Grid item xs={12} sm={6}>
                            <Field
                              name="fname"
                              as={Controls.TextField}
                              label="First Name"
                              Placeholder="Your First Name"
                              size="small"
                              fullWidth
                              autoComplete="off"
                              error={touched.fname && Boolean(errors.fname)}
                              helperText={touched.fname && errors.fname}
                            />
                          </Controls.Grid>

                          <Controls.Grid item xs={12} sm={6}>
                            <Field
                              name="lname"
                              as={Controls.TextField}
                              label="Last Name"
                              Placeholder="Your Last Name"
                              size="small"
                              fullWidth
                              autoComplete="off"
                              error={touched.lname && Boolean(errors.lname)}
                              helperText={touched.lname && errors.lname}
                             
                            />
                          </Controls.Grid>
                        </Controls.Grid>


                        <Controls.Grid item xs={12} my={2}>
                          <Field
                            name="email"
                            as={Controls.TextField}
                            label="Email"
                            Placeholder="Your Email"
                            size="small"
                            fullWidth
                            autoComplete="off"
                            error={touched.email && Boolean(errors.email)}
                            helperText={touched.email && errors.email}
                          />
                        </Controls.Grid>


                        <Controls.Grid container spacing={{xs:4,sm:2}} item >
                          <Controls.Grid item xs={12} sm={6}>
                            <Field
                              name="password"
                              as={Controls.TextField}
                              label="Password"
                              Placeholder="Password"
                              size="small"
                              fullWidth
                              autoComplete="off"
                              type="password"
                              error={touched.password && Boolean(errors.password)}
                              helperText={touched.password && errors.password}
                            />
                          </Controls.Grid>

                          <Controls.Grid item xs={12} sm={6}>
                            <Field
                              name="confirmPassword"
                              as={Controls.TextField}
                              label="Confirm Password"
                              Placeholder="Confirm Password"
                              size="small"
                              fullWidth
                              type="password"
                              autoComplete="off"
                              error={touched.confirmPassword && Boolean(errors.confirmPassword)}
                              helperText={touched.confirmPassword && errors.confirmPassword}
                            />
                          </Controls.Grid>
                        </Controls.Grid>

                         
                        <Controls.Grid item xs={12} mt={2}>
                          <Field
                            name="phone"
                            as={Controls.TextField}
                            label="Phone"
                            Placeholder="+91"
                            size="small"
                            fullWidth
                            autoComplete="off"
                            error={touched.phone && Boolean(errors.phone)}
                            helperText={touched.phone && errors.phone}
                          />
                        </Controls.Grid>


                        <Controls.Grid item xs={12} mt={2}>
                          <Controls.FormControl>
                            <Field as={Controls.RadioGroup} row name="gender" sx={{ color: "black"}}>
                              <Controls.FormControlLabel value="Male" control={<Controls.Radio sx={radioStyles}/>} label="Male" sx={labelStyles}/>
                              <Controls.FormControlLabel value="Female" control={<Controls.Radio  sx={radioStyles}/>} label="Female" sx={labelStyles}/>
                              <Controls.FormControlLabel value="Others" control={<Controls.Radio  sx={radioStyles}/>} label="Others" sx={labelStyles} />
                            </Field>
                          </Controls.FormControl>
                        </Controls.Grid>

                        {touched.gender && errors.gender && (
                          <Controls.FormHelperText error sx={{marginLeft:"20px"}}>{errors.gender}</Controls.FormHelperText>
                        )}


                        <Controls.Grid item mt={5}  xs={12}>
                          <Controls.Button variant='secondary' disabled={isSubmitting} type='submit' >
                            Signup
                          </Controls.Button>
                        </Controls.Grid>
                      </Controls.Grid>
                      <Controls.Grid item mt={2} >
                        <Controls.Typography variant='caption1' sx={{fontSize:{xs:"18px"},color:"black"}}>Already have an account go through,<Controls.Box component="span"sx={{fontSize:{xs:"22px"},color:"black",cursor:"pointer",fontWeight:"bold"}} onClick={handleNavigate}> sigin in</Controls.Box></Controls.Typography>
                      </Controls.Grid>

                    </Form>
                  )}
                </Formik>

              </Controls.Grid>

            </Controls.Grid> 
          </Controls.Grid>
        </Controls.Box>
      </Controls.Grid>

    </>
    
  )
}

export default SignupFormComponent