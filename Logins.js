import { Box, Checkbox, IconButton, TextField, Typography, useScrollTrigger } from '@mui/material'
import React, { useEffect, useState } from 'react'
import BsInp from '../Comp/BsInp'
import MailIcon from '@mui/icons-material/Mail';
import LockIcon from '@mui/icons-material/Lock';
import InputAdornment from '@mui/material/InputAdornment';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import Bscheck from '../Comp/BsCheck';
import BsButon from '../Comp/BsButon';
import ButtonGreen from '../Comp/ButtonGreen';
import { useNavigate } from 'react-router-dom';
import Capture from  "../../src/Cap.png"
import { getUserCookire, postApi, postApiLogin, postApizz } from '../Api/BaseMethod';
import BsSnake from '../Comp/BsSnake';
import Cookies from 'js-cookie';
import axios from 'axios';
import firebase from 'firebase/compat/app';
import { StyledFirebaseAuth } from 'react-firebaseui';

// const config = {
//   apiKey: "AIzaSyBHk7tr905hUO3p6PzVodhE-rMY09wpDkc",
//   authDomain: "warha-d72b8.firebaseapp.com",
//   databaseURL: "https://warha-d72b8-default-rtdb.firebaseio.com",
//   projectId: "warha-d72b8",
//   storageBucket: "warha-d72b8.appspot.com",
//   messagingSenderId: "600070035318",
//   appId: "1:600070035318:web:030195aa74767e78cdcc57",
//   measurementId: "G-JXRF8XN5B3"
// };

// firebase.initializeApp(config);


const Login = () => {
  const navig = useNavigate()
  const [message,setMessage]= useState("")
  const [open,setOpen]= useState(false)
  const [loading,setLoading]= useState(false)
  const [model,setModel] = useState({})
  const [files,setFile] = useState()


  // const GoogleSignIn = () => {
  //   const uiConfig = {
  //     signInFlow: 'popup',
  //     signInSuccessUrl: '/dashboard', // Redirect URL after successful sign-in
  //     signInOptions: [
  //       {
  //         provider: firebase.auth.GoogleAuthProvider.PROVIDER_ID,
  //         customParameters: {
  //           prompt: 'select_account',
  //         },
  //       },
  //     ],
  //   };
  
  const cubMit = () =>{
    console.log("s")
  };
  
  const loginBtn = async () => {
    try {
      const response = await axios.post('http://localhost:5000/api/feild/generate-excel', {
        data: [model],  // Your data should be placed in the request body
      }, {
        headers: {
          'Content-Type': 'application/json',
        },
        responseType: 'blob', // Specify the expected response type as blob
      });
      
      if (response.status === 200) {
        const blob = new Blob([response.data], { type: 'application/octet-stream' });
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'data.xlsx';
        document.body.appendChild(a);
        a.click();
        window.URL.revokeObjectURL(url);
      } else {
        console.error('Request failed with status:', response.status);
      }
    } catch (err) {
      console.error(err);
      // Handle the error here
    }
  }
  
  
  

  // const loginBtn = () =>{
  //   if(!model.email){
  //     setOpen(true)
  //     setMessage("Required Email")
  //     return
  //   }
  //   if(!model.password){
  //     setOpen(true)
  //     setMessage("Required Password")
  //     return
  //   }
  //   setLoading(true)
    

  //   // postApi("/api/auth/login",model)
  //   // .then( (succ) =>{
  //   //   console.log(succ.data.message)
  //   //   if(succ.data.message == "Login First"){
  //   //     console.log("login firest")
  //   //     setOpen(() => true)
  //   //     setMessage("Login First")
  //   //   }else{
  //   //     Cookies.set('tokens', succ?.data?.data.user, { expires: 7 });
  //   //     navig("/dashboard/task")
  //   //   }
  //   //   // console.log(succ?.data?.data.user)
  //   //   setLoading(false)
  //   // })
  //   // .catch( (err) =>{
  //   //   setLoading(false)
  //   //   console.log(err)
  //   // })

  //   postApiLogin("/api/auth/login",model)
  //   .then( (suc) =>{
  //   setLoading(false)
  //     navig("dashboard/dash")
  //     console.log(suc?.data)
  //   })
  //   .catch( (err) =>{
  //   setLoading(false)

  //     console.log(err)
  //   })
  // }
  
  return (
    <div className='mt-4'>
      <BsSnake open={open} close={(e) => setOpen(e) }  message={message}/>
      <Box  className='d-flex m-auto  ' sx={{alignItems:"center",height:"78vh", width:{md:"344px",sm:"344px",xs:"100%"}}}>
        <Box>
        <img width={"100%"} src={Capture} alt="" />
        <Box id="bx_fll" className="shadow mt-2 p-3">
            <div className=''>
            <TextField onChange={(e) => setModel({...model,name:e.target.value})}  />
            <TextField
            onChange={(e) => setModel({...model,email:e.target.value})}
            value={model.email || ""}
            className='w-100'          
            placeholder='Email'
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton  edge="end">
                <MailIcon/>
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
        <div className='my-3'>
    <TextField
      onChange={(e) => setModel({...model,password:e.target.value})}
      value={model.password || ""}
            className='w-100'          
            placeholder='Password'
            type='password'
            InputProps={{
            endAdornment: (
                <InputAdornment position="end">
                <IconButton  edge="end">
                <LockIcon/>
                </IconButton>
              </InputAdornment>
            ),
        }}
        />
        <Box id="bs_blck" className='mt-3 d-flex justify-content-between'>
            <div className='d-flex '>
            <Checkbox   color="success" id="abc1" className='xyz1' />
        <label className='pt-2  abc1' htmlFor="abc1">Remember Me</label>
            </div>
            <div  className="flx_btn mt-1">
        <ButtonGreen loading={loading} onClick={loginBtn} name="Login In" />
            </div>
        </Box>
          <div className='text-center my-3'>
              <Typography variant="p">Don't have account </Typography>
              <span style={{cursor:"pointer",fontWeight:600}} onClick={() => navig("/signUp") } className='text-success '>Sign Up</span>
          </div>
        </div>
            </div>
        </Box>
        </Box>
      </Box>
      {/* <button onClick={GoogleSignIn}></button>
      <StyledFirebaseAuth uiConfig={uiConfig} firebaseAuth={auth} /> */}
    </div>
  )
}

export default Login
