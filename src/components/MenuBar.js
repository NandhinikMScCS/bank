import { Box, Button, IconButton, Menu, MenuItem, Typography } from "@mui/material";
import React, { useState } from "react";
import { COLORS } from "../utils/colors";
import { mainMenus } from "../utils/utils";
import { AccountCircle, ArrowBack } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import { auth } from "../firebase/firebaseConfig";
import { useData } from "../context/DataProvider";

const MenuBar = (menuProps) =>{
    const {bankName, currentPage} = menuProps
    const {currentUser} = useData()
    const [anchorEl,setAnchorEl] = useState(null)
    console.log('CURRENTPAGE',currentPage)
    const navigate = useNavigate()
    const handleLogout = () =>{
        auth.signOut().then(()=>{
            navigate('/login')
        })
    }
    return(
        <Box style={styles.menu}>
             <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={() => setAnchorEl(null)}
        MenuListProps={{
          'aria-labelledby': 'basic-button',
        }}
      >
        <Typography p={1}>{currentUser?.email}</Typography>
        <MenuItem  style={styles.logoutBtn} onClick={()=>handleLogout()}>Logout</MenuItem>
      </Menu>
            {currentPage === 'main' ?
            <>
            <Typography style={styles.title}>{bankName}</Typography>
            <Box style= {styles.btnContainer}>
                {mainMenus.map((menu)=>(
                    <Button style={styles.btn} onClick={()=>navigate(menu.path)}>{menu.label}</Button>
                ))}
                {/* <Button style={styles.btn} onClick={()=>handleLogout()}>Logout</Button> */}
                <IconButton onClick={(e)=>setAnchorEl(e.currentTarget)}><AccountCircle style={styles.btn} /></IconButton>
            </Box>
            </>
            :
            <Box style={styles.secondaryBtn}>
                <ArrowBack  style= {styles.backBtn} onClick={()=>{navigate(-1)}}/>
                <Typography style={styles.secondaryTitle}>{currentPage}</Typography>
            </Box>
}
        </Box>
    )
}
const styles = {
    menu:{
        display:'flex',
        // width:'100%',
        backgroundColor:COLORS.primary,
        height: 45,
        alignItems: 'center',
        flexDirection: 'row',
        justifyContent:'space-between',
        padding: '10px 10px'
    },
    btnContainer:{
        display:'flex',
        flexDirection: 'row',
        gap:10
    },
    btn:{
        color:COLORS.white
    },
    title:{
        color: COLORS.white,
        fontSize:24
    },
    secondaryTitle:{
        color:COLORS.white,
        textTransform: 'capitalize'
    },
    secondaryBtn:{
        display: 'flex',
        flexDirection: 'row',
        alignItems:'center'
    },
    backBtn:{
        color:COLORS.white,
        cursor: 'pointer'
    },
    logoutBtn:{
        display: 'flex',
        justifyContent: 'center',
        backgroundColor: COLORS.primary,
        color: COLORS.white,
        width: '90%',
        margin: 'auto'
        
    },
}
export default MenuBar