import { Email, Key } from "@mui/icons-material";
import { LoadingButton } from "@mui/lab";
import { Box, Button, FormHelperText, TextField, Typography } from "@mui/material";
import { signInWithEmailAndPassword } from "firebase/auth";
import React, {useEffect, useState} from "react";
import { auth } from "../firebase/firebaseConfig";
import { useNavigate } from "react-router-dom";
import { COLORS } from "../utils/colors";
import LoginBackground from '../resources/loginImage.jpg'
const Login = () =>{
    const errorInitial = {
        emailError:'',
        passwordError: '',
    }
    const [email,setEmail] = useState('')
    const [password,setPassword] = useState('')
    const [isLoading,setLoading] = useState(false)
    const navigate = useNavigate()
    const [error,setError] = useState(errorInitial)
    useEffect(()=>{
        setError(errorInitial)
    },[email,password])
    const validate = () =>{
        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if(email.trim() === ''){
            setError(prev =>({
                ...prev,
                emailError:'required'
            }))
            return false
        }
        if(password.trim() === ''){
            setError((prev)=>({
                ...prev,
                passwordError:'required'
            }))
            return false

        }
        if(!regex.test(email)){
            setError((prev)=>({
                ...prev,
                emailError:'invalid email'
            }))
            return false

        }
        return true
    }
    const handleLogin = async() =>{
        if(validate()){
            setError(errorInitial)

        setLoading(true)
           await signInWithEmailAndPassword(auth,email,password).then(()=>{
                navigate('/')
            }).catch((error) => {
                // Handle different error cases

                const errorCode = error.code;
                const errorMessage = error.message;
             
                if(errorCode === "auth/invalid-credential"){
                    setError((prev)=>({
                        ...prev,
                        emailError: 'Invalid credential email or password'

                    }))
                }
                if (errorCode === "auth/wrong-password") {
                    setError((prev)=>({
                        ...prev,
                        passwordError: 'wrong password'
                    }))
                      setLoading(false);
                } else if (errorCode === "auth/user-not-found") {
                    setError((prev)=>({
                        ...prev,
                        emailError: 'No account found with this email'
                    }))
                    setLoading(false);
                } else {
                  console.error(errorCode, errorMessage);
                  setLoading(false);
                }
              });
            setLoading(false)
        }
    }
    return(
        <Box style = {styles.mainContainer}>
            <Box style={{flexBasis:'50%'}}>
                <img src={LoginBackground} height={"100%"}/>
            </Box>
            <Box style= {styles.loginSide}>
            <Box style={styles.loginContainer}>
        <TextField
        InputProps={{
            startAdornment:(
                <Email style={styles.adornment}/>
            )
        }}  
        type="email"
        style={styles.input}
        value={email}
        onChange={(e)=>setEmail(e.target.value)}
        placeholder="Email"

        />
        {error.emailError && <FormHelperText style={{color: 'red'}}>{error.emailError}</FormHelperText>}
                <TextField
                  InputProps={{
                    startAdornment:(
                        <Key style={styles.adornment}/>
                    )
                }}  
                type="password"
                        style={styles.input}

        value={password}
        onChange={(e)=>setPassword(e.target.value)}
        placeholder="Password"


        />
                {error.passwordError && <FormHelperText style={{color: 'red'}}>{error.passwordError}</FormHelperText>}

        <LoadingButton 
         variant="contained"
            loading={isLoading}
            sx={{marginTop:2,marginBottom:2}}
        onClick={()=>handleLogin()}>
            Login
        </LoadingButton>
        <Typography onClick={()=>navigate('/resetPassword')} sx={styles.forgotBtn}>Forgot your password?</Typography>

        <Typography>New here? <Button onClick={()=>navigate('/createAccount')}>Create Account</Button></Typography>
        </Box>
        </Box>
        </Box>
    )
}
const styles = {
    mainContainer:{
        display: 'flex',
        // justifyContent: 'center',
        // alignItems: 'center',
        height: '98vh',
        width: '100%',
        
    },
    loginContainer:{
        height:'50%',
        display: 'flex',
        flexDirection: 'column'
        // justifyContent: 'center',
        // alignItems: 'center'
        
    },
    input:{
       display: 'block',
       marginTop:20
        
    },
    adornment:{
        marginRight:10
         
     },
     forgotBtn:{
        '&:hover':{
            color:COLORS.primary,
            textDecoration: 'underline',
            cursor: 'pointer'   
        }
     },
     loginSide:{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        flexBasis: '50%'
     },
     loginBtn:{
        marginTop:20,
        marginBottom:10
     }
}
export default Login