import React, {createContext, useContext, useEffect, useMemo, useState} from "react";
import MenuBar from "../components/MenuBar";
import {v1 as uuid} from 'uuid';
import rn from 'random-number'
import { auth, db } from "../firebase/firebaseConfig";
import { User, UserInfo, onAuthStateChanged } from "firebase/auth";
import { collection, getDocs, orderBy, query } from "firebase/firestore";


const DataProviderContext = createContext({
    currentPage:'',
    setCurrentPage: () => {},
    currentUser: null,
    setCurrentUser: () => {},
    getCurrentBalance: () => null
})
const DataContextProvider = ({children}) =>{
    const [currentPage,setCurrentPage] = useState('')
    const [currentUser, setCurrentUser] = useState(auth.currentUser)
   
    useEffect(()=>{
        const listener = onAuthStateChanged(auth,async(user)=>{
          setCurrentUser(user)
        })
        return () =>{
          listener()
          setCurrentUser(null)
        }
      },[])
      const getCurrentBalance = async () =>{
        const temp = []
        const collectionRef = collection(db, currentUser?.email || 'fallback');

        const orderedQuery = query(collectionRef, orderBy('time'));
        let balance = 0
    const balancefetched =  await getDocs(orderedQuery)
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
    });
    return balance
})
  .catch((error) => {
    console.error('Error getting documents: ', error);
  });
  return balancefetched

    }
    const ctxval = useMemo(()=>({
        currentPage,
        setCurrentPage,
        currentUser,
        setCurrentUser,
        getCurrentBalance
    }),[   currentPage,
        setCurrentPage,
        currentUser,
        setCurrentUser,
        getCurrentBalance
    ])
    return(
        <DataProviderContext.Provider value={ctxval}>
           
            {children}
            
            </DataProviderContext.Provider>
    )
}
export const useData = () => useContext(DataProviderContext)
export default DataContextProvider