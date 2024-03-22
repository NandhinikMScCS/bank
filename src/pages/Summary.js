import React, { useEffect, useState } from "react"
import { useMenu } from "../context/MenuBarContext"
import { Box, Table, TableBody, TableCell, TableHead, TableRow, Typography } from "@mui/material"
import { collection, getDocs, orderBy, query, where } from "firebase/firestore"
import { useData } from "../context/DataProvider"
import { db } from "../firebase/firebaseConfig"
import { COLLECTIONS } from "../utils/utils"
import { COLORS } from "../utils/colors"


const tableHeader = [{
    label: "Amount",
    key: 'amount'
},
{
    label: "Transaction Type",
    key: 'type'
},
{
    label: "Time",
    key: 'time'
},
{
    label: "Balance",
    key: 'balance'
},

]

const Summary = () =>{
    const {setCurrentPage} = useMenu()
    const {currentUser} = useData()
    const [userAccDetails, setUserAccDetails] = useState()
    const [transactions,setTransactions] = useState()
    useEffect(()=>{
        setCurrentPage('summary')
        fetchTransactionDetails()
        fetchUser()
    },[currentUser])
    const fetchUser = () =>{
        if(currentUser?.uid){
        const collectionRef = collection(db, COLLECTIONS.users);

        const queryRef = query(collectionRef, where('id', '==', currentUser?.uid));
        getDocs(queryRef)
  .then((querySnapshot) => {
    querySnapshot.forEach((doc) => {
      // Access each document's data
      console.log(doc.id, ' => ', doc.data());
      setUserAccDetails(doc.data())
    });
  })
  .catch((error) => {
    console.error('Error getting documents: ', error);
  });
}

    }
    const fetchTransactionDetails = () =>{
        const temp = []
        const collectionRef = collection(db, currentUser?.email || 'fallback');

        const orderedQuery = query(collectionRef, orderBy('time'));
        let balance = 0
        getDocs(orderedQuery)
  .then((querySnapshot) => {
    // Loop through the query snapshot to access the documents in ascending order of time
    querySnapshot.forEach((doc) => {
      // Access each document's data
      
      const data = doc.data()
      if(data.type === 'deposit'){
        balance = balance + Number(data.amount)
      }
      else if(data.type === 'withdraw'){
        balance = balance - Number(data.amount)

      }
      data['balance'] = balance

      temp.push(data)
      console.log(doc.id, ' => ', doc.data());
    });
    setTransactions(temp.reverse())
  })
  .catch((error) => {
    console.error('Error getting documents: ', error);
  });

    }
    const getTime = (time) => {
        const date = new Date(time)
        return date.toLocaleDateString() + "-" + date.toLocaleTimeString()
    }
    return(
        <Box>
            <Box>
                <Typography>Name: {userAccDetails?.name}</Typography>
                <Typography>Account Number: {userAccDetails?.accNumber}</Typography>
            </Box>
            <Box>
                <Typography>All transactions</Typography>
                <Table>
                    <TableHead style={styles.tableHead}>
                    <TableRow>
                        {tableHeader.map((header)=>(
                            <TableCell style={styles.tableCell}>
                                {header.label}
                            </TableCell>
                        ))}
                    </TableRow>
                    </TableHead>
                    <TableBody>

                        {transactions?.map((transaction)=>{
                           
                        return(
                            <TableRow>
                                {tableHeader.map((header)=>(
                                    
                            <TableCell style={{color:transaction.type === 'deposit' ? 'green':'red'}}>
                                {header.key !== 'time'?  transaction[header.key]: getTime(transaction.time) }
                            </TableCell>
                        ))}
                            </TableRow>
                        )})}
                    </TableBody>
                </Table>
            </Box>
        </Box>
    )
}
const styles = {
    tableHead:{
        backgroundColor: COLORS.primary,
    },
    tableCell:{
        color:COLORS.white
    }
}
export default Summary