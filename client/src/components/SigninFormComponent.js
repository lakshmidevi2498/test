import React, { useEffect, useState } from 'react'
import Controls from '../commons/Controls'
import { Formik, Form, Field } from 'formik';
import axios from 'axios'
import * as Yup from 'yup';
import theme from '../utilities/theme';
import { useNavigate } from "react-router-dom"
import { useDispatch, useSelector } from 'react-redux';
import { emailLoginInitiate } from '../redux/action/emailLoginAction';
import { googleLoginInitiate } from '../redux/action/googleLoginAction';
import { facebookLoginInitiate } from '../redux/action/facebookLoginAction';
import {Icon} from "@iconify/react";

const SigninFormComponent = () => {
  const [token, setToken] = useState(null);
  const navigate = useNavigate()
  const dispatch = useDispatch()

const loginUserData = useSelector((state) => state.loadusersdata.data3)
console.log("loginUSerData",loginUserData)

  const initialValues = {
    email: '', password: "",
  };

  const validationSchema = Yup.object().shape({
    email: Yup.string().email('Invalid email format').required('Email is required'),
    password: Yup.string().required("password is required"),
  });

  const onSubmit = async (values, actions) => {
    console.log("Form Values:", values);
    actions.resetForm(); 
    dispatch(emailLoginInitiate(values,navigate))

  }

  useEffect(() => {
    const res = loginUserData.data || [];
    console.log("res", res);

   
    if (res.token) {
        setToken(res.token);
        localStorage.setItem("Token", res.token);
    }
    
    console.log("handleSignin response", res);
    console.log("token", localStorage.getItem("Token"));
    
  
    if (res.userExist) {
        const user = res.userExist._id;
        const name = res.userExist.name;

        localStorage.setItem("signinUserId", user);
        localStorage.setItem("signinUserName", name);

        console.log("res.userExist._id", user);
        console.log("res.userExist.name", name);
    } else {
        console.log("User data is not yet available");
    }
}, [loginUserData]);


  const handleNavigate = () => {
    navigate('/register')
  }
  const handleGoogle = () => {
    try {
      dispatch(googleLoginInitiate()); 
    } catch (error) {
      console.error('Error opening Google auth window:', error);
    }
};
  

  const handlefacebook = () => {
    
    try {
      dispatch(facebookLoginInitiate()) 
      
    } catch (error) {
      console.error('Error opening Google auth window:', error);
    }
  }
  

  return (
    <>
      <Controls.Grid
        container
        sx={{
          height: {xs:"650px",xl:"100vh"},
          position: "relative",
          overflow: "hidden",
        }}
      >

        <Controls.Box
          component="img"
          src="./assests/images/form.jpg"
          sx={{
            width: "100vw",
            height: {xs:"650px",xl:"100vh"},
            position: "absolute",
            top: 0,
            left: 0,
            objectFit: "cover",
            zIndex: 1,
          }}
        />


        <Controls.Grid
          container
          justifyContent="center"
          alignItems="center"
          sx={{
            height: "100%",
            position: "relative",
            zIndex: 3, 
          }}
        >
          <Controls.Grid
            item
            xs={11}
            sm={8}
            md={6}
            xl={4}
            sx={{   backgroundColor:'rgba(255, 255, 255, 0.3)',padding:{xs:2,sm:4,xl:6},borderRadius:"20px"  
            }}
          >
            <Formik
              initialValues={initialValues}
              validationSchema={validationSchema}
              onSubmit={onSubmit}
            >
              {({ errors, touched, isSubmitting }) => (
                <Form>
                  <Controls.Grid container spacing={2}>
                    <Controls.Grid item xs={12} textAlign="center" mb={4} >
                      <Controls.Typography
                        variant="text1"
                        sx={{
                          fontWeight: "bold",
                          fontSize: { xs: "15px", md: "20px", xl: "25px" }
                        }}
                      >
                        Welcome back!
                      </Controls.Typography>
                    </Controls.Grid>

                    <Controls.Grid item xs={12}>
                      <Field
                        name="email"
                        as={Controls.TextField}
                        label="Email"
                        placeholder="Enter Email"
                        size="small"
                        fullWidth
                        autoComplete="off"
                        error={touched.email && Boolean(errors.email)}
                        helperText={touched.email && errors.email}
                      />
                    </Controls.Grid>

                    <Controls.Grid item xs={12}>
                      <Field
                        name="password"
                        as={Controls.TextField}
                        label="Password"
                        placeholder="Password"
                        size="small"
                        fullWidth
                        autoComplete="off"
                        type="password"
                        error={touched.password && Boolean(errors.password)}
                        helperText={touched.password && errors.password}
                        
                      />
                    </Controls.Grid>

                    <Controls.Grid item xs={12} mt={2}>
                      <Controls.Button
                        variant="secondary"
                        disabled={isSubmitting}
                        type="submit"
                        sx={{
                          // backgroundColor: theme.palette.text.secondary,
                          textTransform: "initial",
                          justifyContent:"flex-end",
                          display:"flex",
                          textAlign:"right",
                          marginLeft:"auto"

                        }}
                        // onClick={handleSignin}
                      >
                        Signin
                      </Controls.Button>
                    </Controls.Grid>

                    <Controls.Grid item mt={2} xs={12} sx={ {}}>
                      <Controls.Typography variant="caption1" sx={{ fontSize: { xs: "18px" } }}>
                        Don't have an account?{" "}
                        <Controls.Box
                          component="span"
                          sx={{
                            
                            cursor: "pointer",
                            fontSize: { xs: "20px" }
                          }}
                          onClick={handleNavigate}
                        >
                          Signup
                        </Controls.Box>
                      </Controls.Typography>
                    </Controls.Grid>
                     
                    <Controls.Grid item   sx={{display:"flex",cursor:"pointer", }} xs={12} gap={1} onClick={handleGoogle}>
                    <Controls.Grid item  >
                      
                      <Controls.Typography variant="caption1" sx={{ fontSize: { xs: "18px" } }}>
                        Signin with Google
                        <Controls.Box
                          component="span"
                          sx={{
                            color: theme.palette.one.bg,
                            cursor: "pointer",
                            fontSize: { xs: "16px" }
                          }}
                          
                        >
                           </Controls.Box>
                           </Controls.Typography>
                           </Controls.Grid>
                           <Controls.Grid item sx={{fontSize:"22px" }}>
                           <Icon icon="flat-color-icons:google" />
                          {/* <Controls.GoogleIcon sx={{color:"red"}}/> */}
                          </Controls.Grid>
                       
                    </Controls.Grid>
                    <Controls.Grid item  sx={{display:"flex",cursor:"pointer"}} gap={1} xs={12} onClick={handlefacebook}>
                      <Controls.Grid item onClick={handlefacebook}>
                      <Controls.Typography variant="caption1" sx={{ fontSize: { xs: "18px" } ,}}>
                        Signin with Facebook
                        <Controls.Box
                          component="span"
                          sx={{
                            
                            cursor: "pointer",
                            fontSize: { xs: "16px" }
                          }}
                          
                        >
                          </Controls.Box>
                          </Controls.Typography>
                          </Controls.Grid>
                           <Controls.Grid item sx={{fontSize:"22px" }}>
                         {/* <Controls.FacebookIcon  sx={{color: "blue",}}/>*/}
                         <Icon icon="logos:facebook" /> 
                         </Controls.Grid>
                    </Controls.Grid>
                  </Controls.Grid>
                </Form>
              )}
            </Formik>
          </Controls.Grid>
        </Controls.Grid>
      </Controls.Grid>




    </>
  )
}

export default SigninFormComponent

