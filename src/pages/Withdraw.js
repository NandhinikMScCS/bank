import { useEffect, useState } from "react";
import { useMenu } from "../context/MenuBarContext";
import React from "react";
import Box from "@mui/material/Box";
import {
  Button,
  FormHelperText,
  Modal,
  Snackbar,
  TextField,
  Typography,
} from "@mui/material";
import { LoadingButton } from "@mui/lab";
import { useData } from "../context/DataProvider";
import { addDoc, collection } from "firebase/firestore";
import { db } from "../firebase/firebaseConfig";
import { COLORS } from "../utils/colors";
import withdrawBg from '../resources/withdraw.jpg'
const Withdraw = () => {
  const { setCurrentPage } = useMenu();
  const { currentUser, getCurrentBalance } = useData();
  const [isLoading, setLoading] = useState(false);
  const [amount, setAmount] = useState(null);
  const [currentBalance, setCurrentBalance] = useState(0);
  const [errorMsg, setErrorMsg] = useState("");
  const [isSnackbar, setIsSnackbar] = useState(false);
  const [alertText, setAlertText] = useState('')
  const fetchBalance = async () => {
    const fetchedBalance = await getCurrentBalance();
    console.log("CURRENTBALANCE", fetchedBalance);
    setCurrentBalance(fetchedBalance);
  };
  useEffect(() => {
    setCurrentPage("withdraw");
    fetchBalance();
  }, []);
  useEffect(()=>{
    setErrorMsg('')
  },[amount])
  const validate = () => {
    console.log("numbertype: ", typeof Number(amount), "", Number(amount));
    if (isNaN(Number(amount)) || Number(amount) <= 0) {
      setErrorMsg("Please enter a valid amount");
      return false;
    }
    if (amount?.trim() === "") {
      setErrorMsg("Please enter a amount to continue");
      return false;
    }
    console.log('CURRENTBALANCE',currentBalance,"currentbala",Number(amount))
    if ((amount && currentBalance && Number(amount) > currentBalance) || currentBalance === null || currentBalance === 0) {
      setAlertText('Failed to withdraw, you have insufficient balance');
      return false;
    }
    return true;
  };

  const handleWithdraw = () => {
    if (validate()) {
      setLoading(true);
      const userRef = collection(db, currentUser?.email || "fallback");
      const transactionData = {
        type: "withdraw",
        amount: amount,
        time: Date.now(),
      };
      addDoc(userRef, transactionData).then(() => {
        setAlertText(`Withdraw of Rs.${amount} is successful`)
        fetchBalance();
        setLoading(false);
        setIsSnackbar(true)
      });
    }
  };

  return (
    <>
       <Box style = {styles.backgroundImage}>
                  <img src = {withdrawBg} height={"100%"} />
                </Box>
    <Box style={styles.mainContainer}>
      <Typography style={styles.currentBalance}>Current Balance: {currentBalance}</Typography>

        <Snackbar
          open={isSnackbar}
          autoHideDuration={4000}
          onClose={() => setIsSnackbar(false)}
          message="Withdraw successful"
        />
        <Modal
          open={Boolean(alertText)}
          onClose={() =>{ setAlertText('');setAmount('');}}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={styles.modal}>
            <Typography style={styles.innerContainer}>Alert!</Typography>
            <Box style={styles.contentContainer}>
              <Typography>{alertText}</Typography>
              <Box style={styles.btnContainer}>
                <Button onClick={() =>{ setAlertText('');setAmount('')}}>ok</Button>
              </Box>
            </Box>
          </Box>
        </Modal>
        <Box style={styles.addContainer}>
            <Box style={styles.innerAdd}>
          <TextField
            fullWidth
            placeholder="Withdraw amount"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
          />

          <LoadingButton loading={isLoading} onClick={() => handleWithdraw()} variant="contained">
            WITHDRAW
          </LoadingButton>
          </Box>
          <FormHelperText  style={{color: 'red'}}>{errorMsg}</FormHelperText>

        </Box>
    </Box>
    </>
  );
};
const styles = {
  backgroundImage:{
    height: "calc(100vh - 70px)",
    width:'100%',
    position: 'absolute',
    // backgroundImage: `url(${backgroundImage})`,
    opacity: 0.4,
    backgroundSize: 'cover',
    backgroundPosition: 'center'

  },
  mainContainer: {
    height: "calc(100vh - 70px)",
  },
innerAdd: {
    display: 'flex',
    flexDirection: 'row',
    gap: 10,
},
  addContainer: {
    margin:'auto',
    display: "flex",
    flexDirection: 'column',
    height: "45px",
    width: "70%",
  
    marginTop:50,


  },
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
  currentBalance:{
    textAlign: 'end',
    fontWeight: 500,
  },
  withdrawBtn:{
    backgroundColor: COLORS.primary,
    color: COLORS.white,
    padding:'0px 20px'
  }
};
export default Withdraw;
