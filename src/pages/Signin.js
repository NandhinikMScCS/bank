import { Email, Key } from "@mui/icons-material";
import { LoadingButton } from "@mui/lab";
import { Box, Button, FormHelperText, Snackbar, TextField, Typography } from "@mui/material";
import React, {useState} from "react";
import { COLLECTIONS, createAccountInputs, validations } from "../utils/utils";
import { UserCredential, createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth, db } from "../firebase/firebaseConfig";
import {
    addDoc,
    collection,
  } from "firebase/firestore";
import rn from 'random-number'
import { useNavigate } from "react-router-dom";
import loginBg from '../resources/loginImage.jpg'
import { COLORS } from "../utils/colors";


const CreateAccount = () =>{
    const initialState = {
        name:'',
        email: '',
        password: '',
        confirmPassword: '',
    }
    const [accDetails, setAccDetails] = useState(initialState)
    const [isLoading,setLoading] = useState(false)
    const [error,setError] = useState([])
    const [isSnackbar,setIsSnackbar] = useState(false)
    const navigate = useNavigate()
    const handleOnChange = (e) =>{
        setAccDetails((prev)=>({
            ...prev,
            [e.target.name] : e.target.value
        }))
    }
    const validate = () =>{
        let errors= []
        const keys = Object.keys(accDetails)
        keys.map((key)=>{
          const value = accDetails[key]
          const validation = validations.find(obj=>obj.key === key)
          console.log("VALUINERROR",value,"KEY",key)
          if(!value || value.trim() === ''){
            errors.push({
              key: key,
              error: "required",
            });
          }
          else if(validation?.regExp && !validation.regExp.test(value)){
            errors.push({
                key: key,
                error: `Please enter an valid ${validation.label}`,
              });
          }
          else if(validation?.length && value.length < validation.length){
            errors.push({
                key: key,
                error: `${validation.label} length should be atleast ${validation.length} characters`,
              });
          }
        })
        return errors
    
      }
    const createAccount = async () =>{
        const errors = validate()
        console.log("DATAAAAA1",errors)
        if(accDetails.password !== accDetails.confirmPassword){
            errors.push({
                    key:'password',
                    error:'Passwords do not match'
                }
            )
        }
        if(errors && errors.length !== 0){
            setError(errors)
            return
          }
        setLoading(true)
        const usersRef = collection(db,COLLECTIONS.users)
        const accNumber = rn.generator({
            min:1000000000,
            max: 3000000000,
            integer:true
        })
        createUserWithEmailAndPassword(auth,accDetails.email,accDetails.password).then(async(data)=>{
            updateProfile(data.user,{
                displayName: accDetails.name
            }).then(()=>{
                const userData = {
                    name:accDetails.name,
                    email: accDetails.email,
                    id:data.user.uid,
                    accNumber:accNumber()
                }
                addDoc(usersRef,userData).then(()=>{
                    setAccDetails(initialState)
                    setLoading(false)
                    setIsSnackbar(true)
                })
                
            })
    
        })
    }   
    return(
        <>
         <Snackbar
          open={isSnackbar}
          autoHideDuration={4000}
          onClose={() => {setIsSnackbar(false)
            navigate('/login')
        }}
          message="Account created successfully please login to continu, redirecting to login ..."
        />
    <Box style = {styles.backgroundImage}>
                  <img src = {loginBg} height={"100%"} />
                </Box>
        <Box/>
        <Box style = {styles.mainContainer}>
            <Box style={styles.loginContainer}>
                {createAccountInputs.map((input)=>{
                                  const err = error?.find((obj)=>obj.key === input.key)

                return(
                    <>
        <TextField
        fullWidth
        name={input.key} 
        type={input.type}
        style={styles.input}
        value={accDetails[input.key]}
        onChange={handleOnChange}
        placeholder={input.label}

        />
        {err && <FormHelperText style={{color: 'red'}}>{err.error}</FormHelperText>}
        </>
        )})}
        <LoadingButton onClick={()=>createAccount()}
        loading={isLoading}
         variant="contained"
         style={{marginTop:10}}
        >
            Create
        </LoadingButton>
        <Typography>Already have an account? <Button onClick={()=>navigate('/login')}>Login</Button></Typography>
        </Box>
        </Box>
        </>
    )
}
const styles = {
    mainContainer:{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',

        
    },
    loginContainer:{
         display: 'flex',
        flexDirection: 'column',
        backgroundColor:COLORS.white,
        zIndex:10,
        opacity:0.9,
        padding:10,
        width:'50%'       
    },
    input:{
       display: 'block',
       marginTop:20,
       backgroundColor:COLORS.white
        
    },
    adornment:{
        marginRight:10
         
     },
     backgroundImage:{
        // height: "calc(100vh - 70px)",
        height:'98vh',
        width:'100%',
        position: 'absolute',
        // backgroundImage: `url(${loginBg})`,
        opacity: 0.4,
        backgroundSize: 'cover',
        backgroundPosition: 'center'
    
      },
}
export default CreateAccount