import React from 'react'
import Controls from '../commons/Controls'
import { useEffect } from 'react';
import { Formik, Form, Field } from 'formik';
import axios from 'axios'
import * as Yup from 'yup';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { adminLoginInitiate } from '../redux/action/adminLoginAction';
import {useSelector , useDispatch} from 'react-redux'
import { emailLoginInitiate } from '../redux/action/emailLoginAction';

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'lightblue',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
    borderRadius:"20px"
  };

const AdminLoginComponent = () => {
    const [open, setOpen] = React.useState(false);
    const [token, setToken] = useState(null);
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const adminData = useSelector((state)=>state.adminloginreducer.data)
  console.log("adminData",adminData)

  const loginUserData = useSelector((state) => state.loadusersdata.data3)
console.log("loginUSerData",loginUserData)

useEffect(() => {
  const res = loginUserData.data || [];
  console.log("res", res);

  // Set token if it exists
  if (res.token) {
      setToken(res.token);
      // localStorage.setItem("Token", res.token);
  }
  
  console.log("handleSignin response", res?.userExist);
  const user = res?.userExist
  console.log("isAdmin",user?.role)
  if (user?.role === "admin") {
        window.location.href = "http://localhost:5050/adminpanel";
      }  
      else {
      console.log("User data is not yet available");
    }
}, [loginUserData]);

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
        handleClose()
        handleSignin(values)
    
      }
    useEffect(()=>{
        handleOpen()
    })

    const handleSignin = (user) => {
        // console.log("user",user)
        // axios.post('http://localhost:5050/user/signin', user,
    
        //   { headers: { 'Content-Type': 'application/json' } })
        if(user){
        dispatch(emailLoginInitiate(user))
        }
         
          else {
            console.log("error",)
          }

          // .then((res) => {
          //   setToken(res.data.token)
          //   console.log("handleSignin response",res.data)
          //   // localStorage.setItem("Token", res.data.token)
          //   const userExist = res.data.userExist
          //   console.log("userExist",userExist)

          //   // sessionStorage.setItem("user",userExist)
            
          //   console.log("isAdmin",userExist.role)
          //   // console.log("tokenn",localStorage.getItem("Token")) 
          //   if (userExist.role === "admin") {
          //     window.location.href = "http://localhost:5050/adminpanel";
          //   } else {
          //     navigate("/user", { state: { user: res.data.user } });
          //   }
            
            
    
          // })
    
      }
    
   
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  return (
    <>
    <Controls.Grid container justifyContent="center">
        <Controls.Grid item>
        {/* <Controls.Button onClick={handleOpen}>Open modal</Controls.Button> */}
      <Controls.Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description" 
      >
        <Controls.Box sx={style}>
        <Formik
              initialValues={initialValues}
              validationSchema={validationSchema}
              onSubmit={onSubmit}
            >
              {({ errors, touched, isSubmitting }) => (
                <Form>
                  <Controls.Grid container spacing={2}>
                    <Controls.Grid item xs={12} textAlign="center" mb={4}>
                      <Controls.Typography
                        variant="h2"
                        sx={{
                          fontWeight: "bold",
                          fontSize: { xs: "15px", md: "20px", xl: "25px" },
                        }}
                      >
                        Signin Form
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
                        type="password"
                        fullWidth
                        autoComplete="off"
                        error={touched.password && Boolean(errors.password)}
                        helperText={touched.password && errors.password}
                      />
                    </Controls.Grid>

                    <Controls.Grid item xs={12} mt={2}>
                      <Controls.Button
                        variant="contained"
                        disabled={isSubmitting}
                        type="submit"
                        sx={{ 
                          textTransform: "initial",
                        }}
                        // onClick={handleSignin}
                      >
                        Signin
                      </Controls.Button>
                    </Controls.Grid>

                     
                  </Controls.Grid>
                </Form>
              )}
            </Formik>
        </Controls.Box>
      </Controls.Modal>
        </Controls.Grid>
     </Controls.Grid>   
         </>
  )
}

export default AdminLoginComponent