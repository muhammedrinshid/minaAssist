import React, { useEffect, useState } from 'react'
import { Doughnut } from "react-chartjs-2";
import {Chart as ChartJS} from 'chart.js/auto'


const DoughnutChart = (props) => {

  const quantityData=props.quantityData


  
    
 
        const data = {
            labels: [
              'Tickets',
              'Visa',
              'Attastations',
              'Appoinments'
            ],
            datasets: [{
              label: 'My First Dataset',
              data: [quantityData?.ticket?.total__profit,quantityData?.visa?.total__profit,quantityData?.attastation?.total__profit,quantityData?.appoionments?.total__profit,],
              backgroundColor: [
                'rgb(255, 99, 132)',
                'rgb(54, 162, 235)',
                'rgb(255, 205, 86)',
                'rgb(235, 105, 56)'
              ],
              hoverOffset: 4
            }]
          };

  return (
    <div className="pie__chart">
    <div className='doughnut'>
     <Doughnut data={data} options={{maintainAspectRatio:false}}/>
    </div>
  </div>
  )

}

export default DoughnutChart