import React, { useContext, useEffect, useState } from 'react'
import { Bar } from "react-chartjs-2";
import {Chart as ChartJS} from 'chart.js/auto'
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import axios from 'axios';
import AuthContext from '../../context/AuthContext';
import { errorOccured, updated } from '../../utlties/Toastes';

const Barchart = (props) => {
  const {domain,getHeaders}=useContext(AuthContext)
    const [barData,setBarData]=useState([])
    useEffect(()=>{
      axios.get(`${domain}/api/get-barchart?month=${props.ConfirmDate.getMonth()+1}&year=${props.ConfirmDate.getFullYear()}`,getHeaders).then((res)=>{
        setBarData(res.data)
        console.log(res.data)
      }).catch((err)=>{
        errorOccured()
      })
    },[props.ConfirmDate])
    const data = {
        labels: barData?.map((data)=>data?.month),
        datasets: [{
          label: 'Monthly Profit',
          data: barData?.map((data)=>{
            if(data.profit==null){
              return 1
            }else{
              return data?.profit
            }
            }),
          borderRadius: "20",
      
          backgroundColor: [
            'rgba(255, 99, 132, 0.2)',
            'rgba(255, 159, 64, 0.2)',
            'rgba(255, 205, 86, 0.2)',
            'rgba(75, 192, 192, 0.2)',
            'rgba(54, 162, 235, 0.2)',
            'rgba(153, 102, 255, 0.2)',
            'rgba(201, 203, 207, 0.2)'
          ],
          borderColor: [
            'rgb(255, 99, 132)',
            'rgb(255, 159, 64)',
            'rgb(255, 205, 86)',
            'rgb(75, 192, 192)',
            'rgb(54, 162, 235)',
            'rgb(153, 102, 255)',
            'rgb(201, 203, 207)'
          ],
          borderWidth: 1
        }]
      };
      const [currentDate,setCurrentDate]=useState(new Date)
const ConfirmDate=()=>{
  props.setConfirmDate(currentDate)
}
  return (
    <div className="one__year__chart">
              <div className='profit__range'>
              <button onClick={()=>{
                props.setFull__or__one((prev)=>{
                  return !prev
                })
              }} className='year__selector'>{props.full__or__one?"Month":"Year"}</button>
                <DatePicker dateFormat="MMMM yyyy"
                  showMonthYearPicker
                  selected={currentDate}
                  onChange={(date)=>{
                    setCurrentDate(new Date(date))
                  }}
                  wrapperClassName="datePicker"
                  showIcon
                  maxDate={new Date}

                   />
<i class="fa-solid fa-arrow-right" onClick={ConfirmDate()}></i>
              </div>
              <Bar data={data} options={{maintainAspectRatio:false}} />

            </div>
  )
}

export default Barchart