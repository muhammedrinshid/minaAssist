import React, { createContext, useState } from 'react'
const DashboardContext=createContext();


export const DashboarProvider = ({childern}) => {
    const [appoinmentEnlarger,setAppoinmentEnlarger]=useState(false)
    const [depatureEnlarger,setDepaturEnlarger]=useState(false) 
   
    
    const contextData={
        setAppoinmentEnlarger:setAppoinmentEnlarger,
        setDepaturEnlarger:setDepaturEnlarger,
        appoinmentEnlarger:appoinmentEnlarger,
        depatureEnlarger:depatureEnlarger,
      }
  return (
    <DashboardContext.Provider value={contextData}>{childern}</DashboardContext.Provider>
  )
}

export default DashboardContext