import React from 'react'

const BroughtResult = (props) => {
    const data=props.data
    const getBroughtTicket=props.getBroughtTicket
   
  return (
    <div class="flight__result">
            <div class="flight__user">    
              <img src={data?.owner?.image?data.owner.image:null} />
              <h5>{data?.owner?.agency_name}</h5>
              <h6>{data?.owner?.branch}</h6>
              <p>Posted on {data?.created_on}</p>
            </div>
            <div class="flight__sector">
              <div class="airport">
                <p>{data?.depature_port?.airport_place} </p>
                <h1>{data?.depature_port?.airport_code}</h1>
                <h5>{data?.depature_time?.substring(0,5)}</h5>
              </div>
              <div class="arrow__container">
                <p class="arrow">&#8646;</p>
                <p class="stop">{data?.stops} stop</p>
              </div>
              <div class="airport">
                <p>Jeddah </p>
                <h1>{data?.arrival_port?.airport_code}</h1>
                <h5>{data?.arrival_time?.substring(0,5)}</h5>
              </div>
            </div>
            <div class="flight__services">
              <p>
                <i class="fa-solid fa-suitcase"></i> &nbsp;{data?.cabin_baggage+"  "}kg hand baggage
              </p>
              <p>
                <i class="fa-solid fa-suitcase-rolling"></i>&nbsp; {data?.checkin_baggage+"  "} kg
                checkIn baggage
              </p>
              <p>
                <i class="fa-solid fa-utensils"></i>&nbsp; 7 kg hand baggage
              </p>
            </div>
            <div class="flight__airline">
              <h3>{data?.airline?.airline_name}</h3>
              <p>{data?.flight_number}</p>
              <p>
                <i class="fa-solid fa-couch"></i> &nbsp;X {" "+data?.seats }
              </p>
            </div>
            <div class="flight__price">
            <p>{data?.date}</p>
              <h3>
                <i class="fa-solid fa-indian-rupee-sign"></i>&nbsp;{data?.amount}
              </h3>
            </div>
            <div class="flight__book" onClick={()=>getBroughtTicket(data?.id)}>book</div>
          </div>
  )
}

export default BroughtResult