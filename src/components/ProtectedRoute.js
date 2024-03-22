import { Outlet, useNavigate } from "react-router-dom"
import MenuContextProvider from "../context/MenuBarContext"
import { useEffect } from "react"
import { onAuthStateChanged } from "firebase/auth"
import { auth } from "../firebase/firebaseConfig"
import React from "react"

const ProtectedRoute = () =>{
    const navigate = useNavigate()
    useEffect(()=>{
       const listener =  onAuthStateChanged(auth,async(user)=>{
            if(!user){
                navigate('/login')
            }
            return () =>{
                listener()
            }


        })
    },[])
    return(
        <>
              <MenuContextProvider>

        <Outlet/>
        </MenuContextProvider>
        </>
    )
}
export default ProtectedRoute