import React from 'react'
import { Link, useNavigate } from 'react-router-dom';

const AttastationEnlarged = (props) => {
    const data=props.data
    const setDeleteContent=props.setDeleteContent
    const setInvoiceContent=props.setInvoiceContent
    const deleteAttastation=()=>{

      setDeleteContent((prev)=>{
        return {...prev,id:data?.id,visibility:true}
      })
    }

    const cancelEnlarger = () => {
        document.getElementById("enlarger__outer__layer4").style.display = "none";
      };
      const invoiceFormController=()=>{

        const details={
            gross__amount:data?.gross_amount,
            count:1,
            item:"Certificate Attastation",
            title:data?.certificate+" certificate attastaton "+data?.country.name,
            paid:data?.paid,
            name:data?.applicant_name,
            care_of:data?.care_of,
            id:data?.id
      
          }
        setInvoiceContent(prev=>{ 
            return {
                ...prev,
                details:details,
                visibility:true
            }
        })
      }
  return (
    <div class="enlarger__outer__layer1 " id="enlarger__outer__layer4">
                    <div class="enlarger__container">
                        <div class="enlarger__controler"><i class="fa-solid fa-rectangle-xmark" onClick={cancelEnlarger} ></i></div>
                        <div class="enlarger__heading">
                            <p>{data?.visa_mode}/Track id -1404</p>
                            <h1>{data?.applicant_name}</h1>
                            <h5>C/O  {data?.care_of}</h5>
                        </div>
                        <div class="enlarger__topbody">
    
                            <div class="topbody__half">
                                <div class="topbody__info">
                                    <p class="nowrap"><i class="fa-solid fa-calendar-check"></i>&nbsp;  Remitted Date</p> <p class="info__answer"> {data?.remitted_date}   </p>
                                </div>
                                <div class="topbody__info">
                                    <p class="nowrap"><i class="fa-regular fa-calendar-check"></i> &nbsp; Date of Birth</p> <p class="info__answer"> {data?.dob}    </p>
                                </div>
                                
                                
                                
                                <div class="topbody__info">
                                <p class="nowrap"><i class="fa-solid fa-cubes-stacked"></i>  &nbsp; Certificate type</p> <p class="info__answer"> {data?.certificate} </p>
                            </div>
                            <div class="topbody__info">
                                <p class="nowrap"><i class="fa-solid fa-earth-asia"></i>&nbsp;  Country </p> <p class="info__answer"> {data?.country.name}  </p>
                            </div>
                            <div class="topbody__info">
                                    <p class="nowrap"><i class="fa-solid fa-phone"></i>  &nbsp; {data?.phone}</p> <p class="info__answer"> <button> <i class="fa-solid fa-phone-volume"></i> &nbsp;call</button> </p>
                                </div>
                                
                                
                                
                            </div>
                            <div class="topbody__half">
                               
                                <div class="topbody__info">
                                    <p class="nowrap"><i class="fa-solid fa-building-user"></i> &nbsp; Agency</p> <p class="info__answer"> {data?.agency.name} </p>
                                </div>
                                <div class="topbody__info">
                                <p class="nowrap">
                                  <i class="fa-solid fa-money-bill"></i> &nbsp;Net Amount
                                </p>{" "}
                                <p class="info__answer red2  ">
                                  <i class="fa-sharp fa-solid fa-indian-rupee-sign red2"></i>{" "}
                                  {data?.net_amount}{" "}
                                </p>
                              </div>
                                <div class="topbody__info">
                                    <p class="nowrap"><i class="fa-solid fa-money-bill"></i> &nbsp;  Gross Amount</p> <p class="info__answer red  "><i class="fa-sharp fa-solid fa-indian-rupee-sign red"></i> {data?.gross_amount}  </p>
                                </div>
                                <div class="topbody__info">
                                    <p class="nowrap"><i class="fa-sharp fa-solid fa-credit-card"></i> &nbsp;  Paid</p> <p class="info__answer green"> <i class="fa-sharp fa-solid fa-indian-rupee-sign green"></i> {data?.paid}    </p>
                                </div>
                                <div class="topbody__info">
                                <p class="nowrap">
                                  <i class="fa-solid fa-scale-unbalanced-flip"></i> &nbsp; Balance
                                </p>{" "}
                                <p class="info__answer yellow">
                                  <i class="fa-sharp fa-solid fa-indian-rupee-sign yellow"></i>{" "}
                                  {data?.gross_amount - data?.paid}{" "}
                                </p>
                              </div>
                            </div>
                        </div>
                        <div class="enlarger__bottombody">
                            <h3>ATTACHMENTS</h3>
                            <p> <i class="fa-solid fa-paperclip"></i>&nbsp; Document link</p>
                            <p onClick={()=>invoiceFormController()}>  <i class="fa-sharp fa-solid fa-plus"></i> &nbsp; Create Invoice</p>
                            <div class="operators">
    
                                <Link to={`/update-attastation/${data?.id}`}> <i class="fa-regular fa-pen-to-square"></i> &nbsp; Edit</Link>
                                <a onClick={deleteAttastation}> <i class="fa-solid fa-trash"></i> &nbsp; Delete</a>
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

export default AttastationEnlarged