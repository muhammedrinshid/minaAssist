import React from 'react'
import { Link } from 'react-router-dom'

const TransactionEnlarged = (props) => {
    const data=props.data
    const titles=data?.title?.split(" ")

    let service=''
    if (props.data.title) {
        service=titles[titles.length-1]
        
    }
    const cancelEnlarger = () => {
        document.getElementById("enlarger__outer__layer4").style.display = "none";
      };
      const setDeleteContent=props.setDeleteContent
      const deleteTransaction=()=>{
    
        setDeleteContent((prev)=>{
          return {...prev,id:data?.id,visibility:true}
        })
      }
      
  return (
    <div class="enlarger__outer__layer1 " id="enlarger__outer__layer4">
    <div class="enlarger__container">
        <div class="enlarger__controler"><i class="fa-solid fa-rectangle-xmark" onClick={cancelEnlarger} ></i></div>
        <div class="enlarger__heading">
            <p className={data.debit_or_credit?"green":"red"}>{data.debit_or_credit?"Credit":"Debit"}</p>
            <h1>{data?.title}</h1>
            <h5>{data.debit_or_credit?"To":"From"}  {data?.agency?.name+" " +data?.agency?.branch}</h5>
        </div>
        <div class="enlarger__topbody">

            <div class="topbody__half">
                <div class="topbody__info">
                    <p class="nowrap"><i class="fa-solid fa-calendar-check"></i>&nbsp;  Transaction Date</p> <p class="info__answer"> {data?.transaction_date}   </p>
                </div>
                <div class="topbody__info">
                    <p class="nowrap"><i class="fa-regular fa-calendar-check"></i> &nbsp; Service</p> <p class="info__answer"> {service}    </p>
                </div>
                
                
                
                <div class="topbody__info">
                <p class="nowrap"><i class="fa-solid fa-cubes-stacked"></i>  &nbsp; Method</p> <p class="info__answer"> {data?.transaction_method} </p>
            </div>
            <div class="topbody__info">
                <p class="nowrap"><i class="fa-solid fa-earth-asia"></i>&nbsp;  Bill no/id </p> <p class="info__answer"> {data?.bill_no}  </p>
            </div>
          
                
                
                
            </div>
            <div class="topbody__half">
               
                <div class="topbody__info">
                    <p class="nowrap"><i class="fa-solid fa-building-user"></i> &nbsp; Agency</p> <p class="info__answer"> {data?.agency?.name} </p>
                </div>
                <div class="topbody__info">
                <p class="nowrap">
                  <i class="fa-solid fa-money-bill"></i> &nbsp;{data?.debit_or_credit?"Credit":"Net Amount"}
                </p>{" "}
                <p class="info__answer red2  ">
                  <i class="fa-sharp fa-solid fa-indian-rupee-sign red2"></i>{" "}
                  {data?.net_amount}{" "}
                </p>
              </div>
                <div class="topbody__info">
                    <p class="nowrap"><i class="fa-solid fa-money-bill"></i> &nbsp;  Gross Amount</p> <p class="info__answer red  "><i class="fa-sharp fa-solid fa-indian-rupee-sign red"></i> {data?.gross_amount?data.gross_amount:0}  </p>
                </div>
                <div class="topbody__info">
                    <p class="nowrap"><i class="fa-sharp fa-solid fa-credit-card"></i> &nbsp;  Profit</p> <p class="info__answer green"> <i class="fa-sharp fa-solid fa-indian-rupee-sign green"></i> {data?.gross_amount?data?.gross_amount-data?.net_amount:0}    </p>
                </div>
                
            </div>
        </div>
        <div class="enlarger__bottombody">
            <h3>ATTACHMENTS</h3>
            <p> <i class="fa-solid fa-paperclip"></i>&nbsp; Document link</p>
            <p>  <i class="fa-sharp fa-solid fa-plus"></i> &nbsp; Add attachments</p>
            <div class="operators">

                <Link to={`/update-transaction/${data?.id}`}> <i class="fa-regular fa-pen-to-square"></i> &nbsp; Edit</Link>
                <a onClick={deleteTransaction}> <i class="fa-solid fa-trash"></i> &nbsp; Delete</a>
            </div>
        </div>
        <div class="enlarger__notes">
            <h3>NOTES</h3>
            <p> iLorempsum dolor sit amet consectetur, adipisicing elit. Unde eaque aut quis fuga molestias a ut numquam corrupti consectetur quaerat hic, asperiores dolorum officia officiis, perspiciatis quo est iste ex.</p>
        </div>

    </div>
</div>
  )
}

export default TransactionEnlarged