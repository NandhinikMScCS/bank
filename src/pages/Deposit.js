import React, { useEffect, useState } from "react";
import { useMenu } from "../context/MenuBarContext";
import { FormHelperText, Snackbar, TextField, Button, Modal, Typography, Box } from "@mui/material";
import { LoadingButton } from "@mui/lab";
import { addDoc, collection } from "firebase/firestore";
import { db } from "../firebase/firebaseConfig";
import { useData } from "../context/DataProvider";
import backgroundImage from '../resources/deposit.jpg'
import { COLORS } from "../utils/colors";

const Deposit = () => {
  const { setCurrentPage } = useMenu();
  const { currentUser } = useData();
  const [isLoading, setLoading] = useState(false);
  const [amount, setAmount] = useState(null);
  const [isSnackbar, setIsSnackbar] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [modal, setModal] = useState(false);

  useEffect(() => {
    setCurrentPage("deposit");
  }, []);

  useEffect(() => {
    setErrorMsg("");
  }, [amount]);

  const validate = () => {
    if (isNaN(Number(amount)) || Number(amount) <= 0) {
      setErrorMsg("Please enter a valid amount");
      return false;
    }
    if (amount?.trim() === "") {
      setErrorMsg("Please enter an amount to continue");
      return false;
    }
    return true;
  };

  const handleAddMoney = () => {
    if (validate()) {
      setLoading(true);
      const userRef = collection(db, currentUser?.email || "fallback");
      const transactionData = {
        type: "deposit",
        amount: amount,
        time: Date.now(),
      };
      // You would typically do something with 'userRef' and 'transactionData' here
      // For example, you might add the transaction to the Firestore collection
      // addDoc(userRef, transactionData);
      // Then you might show a success message and reset the form
      setModal(true);
      setLoading(false);
    }
  };

  return (
    <>
      <Box style={styles.backgroundImage}>
        <img src={backgroundImage} height={"100%"} alt="Background" />
      </Box>
      <Modal
        open={modal}
        onClose={() => { setModal(false); setAmount('') }}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={styles.modal}>
          <Typography style={styles.innerContainer}>Alert!</Typography>
          <Box style={styles.contentContainer}>
            <Typography>Deposit of Rs.{amount} successful</Typography>
            <Box style={styles.btnContainer}>
              <Button onClick={() => { setModal(false); setAmount('') }}>OK</Button>
            </Box>
          </Box>
        </Box>
      </Modal>
      <Box style={styles.mainContainer}>
        <Snackbar
          open={isSnackbar}
          autoHideDuration={4000}
          onClose={() => setIsSnackbar(false)}
          message="Deposit successful"
        />
        <Box style={styles.addContainer}>
          <Box style={styles.innerAdd}>
            <TextField
              fullWidth
              placeholder="Deposit Money"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
            />
            <LoadingButton loading={isLoading} onClick={() => handleAddMoney()} variant="contained">
              Deposit
            </LoadingButton>
          </Box>
          <FormHelperText style={{ color: 'red' }}>{errorMsg}</FormHelperText>
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

export default Deposit;
