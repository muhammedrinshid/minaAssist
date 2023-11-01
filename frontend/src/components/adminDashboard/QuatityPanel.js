import React, { useContext, useEffect, useState } from 'react'
import axios from 'axios'
import AuthContext from '../../context/AuthContext'
import { errorOccured, updated } from '../../utlties/Toastes'

const QuatityPanel = (props) => {
  const quantityData=props.quantityData

  const {domain,getHeaders}=useContext(AuthContext)
  

  


  const calculateGrowth=(current,prev)=>{
    const today=new Date()
    if (today.getMonth()==props.ConfirmDate.getMonth()){
      current=(current/today.getDate())*30
    }

    return (((current-prev)/(prev+1))*100).toFixed(2)
    

  }

  return (
    <div className="quantity__panel">
              <div className="quantity__container">
                <div className="quantity__top">
                  <div className="quantity__icon">
                    <i className="fa-brands fa-cc-visa first__icon"></i>

                  </div>
                  <div className="quantity__content">
                    <div className="quatity__count">
                      <h3>{quantityData?.visa?.count}</h3>
                      <p className={calculateGrowth(quantityData?.visa?.count,quantityData?.visa?.pcount)>0&&"green"}>{calculateGrowth(quantityData?.visa?.count,quantityData?.visa?.pcount)} % 
                       
                       {
                        calculateGrowth(quantityData?.visa?.count,quantityData?.visa?.pcount)>0?(<ion-icon name="chevron-up-outline"></ion-icon>):(<ion-icon name="chevron-down-outline"></ion-icon>)
                      }
                       </p>
                    </div>
                    <div className="quantity__profit">
                      <h4> 
                        <i className="fa-solid fa-indian-rupee-sign"></i> {quantityData?.visa?.total__profit}</h4>
                    </div>
                  </div>

                </div>
                <div className="quantity__bottom">
                  <h5>Visa Applications</h5>

                </div>
              </div>
              <div className="quantity__container">
                <div className="quantity__top">
                  <div className="quantity__icon">
                    <i className="fa-solid fa-calendar-days second__icon"></i>
                  </div>
                  <div className="quantity__content">
                    <div className="quatity__count">
                      <h3>{quantityData?.appoinments?.count}</h3>
                      <p className={calculateGrowth(quantityData?.appoinments?.count,quantityData?.appoinments?.pcount)>0&&"green"}>{calculateGrowth(quantityData?.appoinments?.count,quantityData?.appoinments?.pcount)} %     {
                        calculateGrowth(quantityData?.appoinments?.count,quantityData?.appoinments?.pcount)>0?(<ion-icon name="chevron-up-outline"></ion-icon>):(<ion-icon name="chevron-down-outline"></ion-icon>)
                      }</p>
                    </div>
                    <div className="quantity__profit">
                      <h4><i className="fa-solid fa-indian-rupee-sign"></i> {quantityData?.appoinments?.total__profit}</h4>
                    </div>
                  </div>

                </div>
                <div className="quantity__bottom">
                  <h5>Appoinments</h5>

                </div>
              </div>
              <div className="quantity__container">
                <div className="quantity__top">
                  <div className="quantity__icon">
                    <i className="fa-solid fa-plane-lock third__icon"></i>
                  </div>
                  <div className="quantity__content">
                    <div className="quatity__count">
                      <h3>{quantityData?.ticket?.count}</h3>
                      <p className={calculateGrowth(quantityData?.ticket?.count,quantityData?.ticket?.pcount)>0&&"green"}>{calculateGrowth(quantityData?.ticket?.count,quantityData?.ticket?.pcount)} %     {
                        calculateGrowth(quantityData?.ticket?.count,quantityData?.ticket?.pcount)>0?(<ion-icon name="chevron-up-outline"></ion-icon>):(<ion-icon name="chevron-down-outline"></ion-icon>)
                      }</p>
                    </div>                                    <div className="quantity__profit">
                      <h4><i className="fa-solid fa-indian-rupee-sign"></i> {quantityData?.ticket?.total__profit}</h4>
                    </div>
                  </div>

                </div>
                <div className="quantity__bottom">
                  <h5>Tickets</h5>

                </div>
              </div>
              <div className="quantity__container">
                <div className="quantity__top">
                  <div className="quantity__icon">
                    <i className="fa-solid fa-stamp fourth__icon"></i>
                  </div>
                  <div className="quantity__content">
                    <div className="quatity__count">
                      <h3>{quantityData?.attastation?.count}</h3>
                      <p className={calculateGrowth(quantityData?.attastation?.count,quantityData?.attastation?.pcount)>0&&"green"}>{calculateGrowth(quantityData?.attastation?.count,quantityData?.attastation?.pcount)} %     {
                        calculateGrowth(quantityData?.attastation?.count,quantityData?.attastation?.pcount)>0?(<ion-icon name="chevron-up-outline"></ion-icon>):(<ion-icon name="chevron-down-outline"></ion-icon>)
                      }</p>
                    </div>
                    <div className="quantity__profit">
                      <h4><i className="fa-solid fa-indian-rupee-sign"></i> {quantityData?.attastation?.total__profit}</h4>
                    </div>
                  </div>

                </div>
                <div className="quantity__bottom">
                  <h5>Attastations</h5>

                </div>
              </div>
            </div>
  )
}

export default QuatityPanel