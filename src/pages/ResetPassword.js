import { ArrowBack } from "@mui/icons-material"
import { Box, Button, FormHelperText, IconButton, Modal, TextField, Typography } from "@mui/material"
import { useEffect, useState } from "react"
import { COLORS } from "../utils/colors"
import { useNavigate } from "react-router-dom"
import { sendPasswordResetEmail } from "firebase/auth"
import { auth } from "../firebase/firebaseConfig"

const ResetPassword = () =>{
    const [email,setEmail] = useState('')
    const [isModal,setIsModal] = useState(false)
    const [error,setError] = useState('')
    const navigate = useNavigate()
    useEffect(()=>{
        setError('')
    },[email])
    const validate = () =>{
        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if(email.trim() === ''){
            setError('Plese enter your email')
            return false
        }
        if(!regex.test(email)){
            setError("Please enter valid email")
            return false
        }
        return true
    }
    const handleReset = async() =>{
        if(validate()){
        await sendPasswordResetEmail(auth,email).then(()=>{
            setIsModal(true)
        })
    }
    }
    return(
      <Box style = {styles.mainContainer}>
        <Box style={{width:'40%'}}>
            
            <Typography><IconButton onClick={()=>navigate('/login')}><ArrowBack/></IconButton> Reset your password</Typography>
            <TextField
            fullWidth
                placeholder="Enter yout email"
                value={email}
                onChange={(e)=>setEmail(e.target.value)}
            />
            <FormHelperText>{error}</FormHelperText>
            <Button variant='contained' style={{width:'100%',marginTop:10}} onClick={()=>handleReset()}>Reset</Button>
            <Modal
          open={isModal}
          onClose={() => setIsModal(false)}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={styles.modal}>
            <Typography style={styles.innerContainer}>Email sent</Typography>
            <Box style={styles.contentContainer}>
              <Typography>Password reset link sent to your email</Typography>
              <Box style={styles.btnContainer}>
                <Button onClick={() => setIsModal(false)}>ok</Button>
              </Box>
            </Box>
          </Box>
        </Modal>
        </Box>
        </Box>
    )
}
const styles = {
    modal: {
      position: "absolute",
      top: "50%",
      left: "50%",
      transform: "translate(-50%, -50%)",
      width: 400,
      bgcolor: "background.paper",
      boxShadow: 24,
    },
    innerContainer: {
      backgroundColor: COLORS.primary,
      color: COLORS.white,
      padding: 10,
    },
    contentContainer: {
      padding: "15px 15px 8px 15px",
    },
    btnContainer: {
      display: "flex",
      justifyContent: "flex-end",
    },
    mainContainer:{
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      height: '100vh'
    }
  };
  export default ResetPassword