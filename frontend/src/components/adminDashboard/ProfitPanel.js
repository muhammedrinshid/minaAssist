import axios from 'axios'
import React, { useContext, useEffect, useState } from 'react'
import AuthContext from '../../context/AuthContext'
import { errorOccured, updated } from '../../utlties/Toastes'

const ProfitPanel = (props) => {

  const profitData=props.profitData
  const calculateGrowth=(current,prev)=>{
    const today=new Date()
    

    return (((current-prev)/(prev+1000))*100).toFixed(2)
    

  }




 




  return (
    <div className="profil__panel">
    <div className="profil__pan">
      <i className="fa-solid  fa-sack-dollar"></i>
      <h2 className="nowrap"> <i className="fa-solid fa-indian-rupee-sign"></i>{profitData?.revenue}</h2>
      <p>Total Revenue</p>
      <p className={calculateGrowth(profitData?.revenue,profitData?.prevenue)<0?"profit__percentage":"profit__percentage green"}>{calculateGrowth(profitData?.revenue,profitData?.prevenue)}%
      {
        calculateGrowth(profitData?.revenue,profitData?.prevenue)<0?(<ion-icon name="chevron-down-outline"></ion-icon>):(<ion-icon name="chevron-up-outline"></ion-icon>)
      }
      </p>

    </div>
    <div className="profil__pan">
      <i className="fa-solid fa-hand-holding-hand"></i>
      <h2 className="nowrap"><i className="fa-solid fa-indian-rupee-sign"></i>{profitData?.expance}</h2>
      <p>Total Expance </p>
      <p  className={calculateGrowth(profitData?.expance,profitData?.pexpance)<0?"profit__percentage":"profit__percentage green"}>{calculateGrowth(profitData?.expance,profitData?.pexpance)}%
      {
        calculateGrowth(profitData?.expance,profitData?.pexpance)<0?(<ion-icon name="chevron-down-outline"></ion-icon>):(<ion-icon name="chevron-up-outline"></ion-icon>)
      }
      </p>

    </div>
    <div className="profil__pan">
      <i className="fa-solid fa-coins"></i>
      <h2 className="nowrap"><i className="fa-solid fa-indian-rupee-sign"></i>{profitData?.profit}</h2>
      <p>Profit</p>
      <p className={calculateGrowth(profitData?.profit,profitData?.pprofit)<0?"profit__percentage":"profit__percentage green"}>{calculateGrowth(profitData?.profit,profitData?.pprofit)} %  {
        calculateGrowth(profitData?.profit,profitData?.pprofit)<0?(<ion-icon name="chevron-down-outline"></ion-icon>):(<ion-icon name="chevron-up-outline"></ion-icon>)
      }</p>

    </div>
  </div>
  )
}

export default ProfitPanel