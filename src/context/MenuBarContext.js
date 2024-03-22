import React, {createContext, useContext, useMemo, useState} from "react";
import MenuBar from "../components/MenuBar";
import config from '../config.json'

const MenuBarContext = createContext({
    currentPage:'main',
    setCurrentPage: () => {},
    bankName: ''
})

const MenuContextProvider = ({children}) =>{
    const [currentPage,setCurrentPage] = useState('main')
    const bankName = useMemo(()=>config.bankName,[config.bankName])
    const ctxval = useMemo(()=>({
        currentPage,
        setCurrentPage,
        bankName
    }),[   currentPage,
        setCurrentPage,
        bankName])
    console.log(currentPage,"CURRENTPAGEINCONTEXT")
    return(
        <MenuBarContext.Provider value={ctxval}>
            <>
            <MenuBar bankName={bankName} currentPage={currentPage}/>
            {children}
            
            </></MenuBarContext.Provider>
    )
}
export const useMenu = () => useContext(MenuBarContext)
export default MenuContextProvider