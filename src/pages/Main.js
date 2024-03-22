import { useEffect } from "react"
import { useMenu } from "../context/MenuBarContext"
import { Box, Button, Typography } from "@mui/material"
import bankImage from '../resources/bankImage.jpg'
import { useNavigate } from "react-router-dom"

const Main = () =>{
    const {setCurrentPage, bankName} = useMenu()
    const navigate = useNavigate()
    useEffect(()=>{
        setCurrentPage('main')
    },[])
    return(
       <Box>
        <Box style = {styles.contentContainer}>
        <Typography>Welcome to <span style={{fontWeight: 'bolder'}}>{bankName}</span>, Where your financial journey begins, Experience seamless banking solutions tailored to your needs.</Typography>
        <Box style={styles.imageContainer}>
        <img src={bankImage} width ={"50%"} height = {'50%'}/>
        <Box style = {styles.content}>
        <Typography style={styles.savingText}>Start saving now</Typography>
        <Button onClick={()=>navigate('/deposit')}>Deposit money</Button>
        </Box>
        </Box>
        </Box>
       </Box>
    )
}
const styles = {
    mainContainer:{
        height: 'calc(100vh - 70px)'
    },
    contentContainer:{
        padding: 10
    },
    savingText:{
        textDecoration: 'underline'
    },
    imageContainer:{
        display: 'flex',
        alignItems: 'center',
        
    },
    content:{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
    }
    
}
export default Main