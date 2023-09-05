import React, { useContext, useEffect, useRef } from "react";
import { useState } from "react";
import logo from "../../assets/logo.png";
import AuthContext from "../../context/AuthContext";

import jsPDF from 'jspdf';

const months=[
  "January",
  "February",
  "March",
  "Apritl",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
]

const Invoice = (props) => {
  const {user}=useContext(AuthContext)
  const annexTemplateRef=useRef(null)

  const date=new Date()
  const invoiceDate=months[date.getMonth()]+", "+date.getDate()+" "+date?.getFullYear()
  const setInvoiceContent = props.setInvoiceContent;
  const invoiceContent = props.invoiceContent;
  const [numberofRows,setNumberofRows]=useState([])
  const [quatily,setQuantity]=useState(invoiceContent.details?.count)
  const [gorss,setGross]=useState(invoiceContent.details?.gross__amount)
  const [total,setTotal]=useState(0)
  const [paid,setPaid]=useState(invoiceContent.details?.paid)

  const cancelInvoice = () => {
    setInvoiceContent((prev) => {
      return {
        ...prev,
        visibility: false,
      };
    });
  };
const addNewRow=()=>{
  setNumberofRows((prev)=>{

    return [...prev,{
      count:0,
      gross__amount:0,
    }]
  })

}
const deleteRow=(id)=>{
  setNumberofRows((prev)=>prev.filter((element,index)=>{
    return index!=id
  }))
}
const updateCount=(id,value)=>{

  setNumberofRows((prev)=>
    prev.map((element,index)=>{
      if (id==index) {
        return {
          ...element,count:value
        }


        
      }
      return element


    })
  )

}

const updateGross=(id,value)=>{

  setNumberofRows((prev)=>
    prev.map((element,index)=>{
      if (id==index) {
        return {
          ...element,gross__amount:value
        }


        
      }
      return element

    })
  )


}
useEffect(()=>{
  let spans=document.getElementsByClassName('sub__total')
  let tt=0
  for (let i = 0; i < spans.length; i++) {
    let temp=parseInt(spans[i].innerHTML)
      tt+=temp
  
    
  }

  setTotal(tt)

},[quatily,numberofRows,gorss])
const handleGeneratePdf=()=>{
  const doc=new jsPDF('p','px',[1200,800],true)
  doc.html(annexTemplateRef.current,{
  
    async callback(doc){
      await doc.save("annexurec")
    }
  })

}
  return (
    <div className="invoice__top__container">
    <div className="annex__controle">
    <i class="fa-solid fa-arrow-left" onClick={cancelInvoice}></i>

    <i class="fa-solid fa-print"  onClick={()=>window.print()} ></i>
    <i class="fa-solid fa-download" onClick={handleGeneratePdf}></i>

   
  
  </div>
    <div className="overflow__container">
      <div class="invoice__container " ref={annexTemplateRef} id="print__area">

      
        <header style={{textTransform:"capitalize"}}>
          <h1>Invoice</h1>
          <address contentEditable>
          <p>From</p>
            <h2 >{user?.agency}</h2>
            <h3 >{user?.branch}</h3>
            
            <p>
             {user?.address}
            </p>
            <p>{user?.district} {" "}dt{", "+user?.state+" (state) "}</p>
            <p>{user?.pincode}</p>
          </address>
          <span>
            <img alt="upload your png logo on edit profile section" width={"150px"} src={user?.image?`${user.image}`:logo}  />
          </span>
        </header>
        <article>
          <address style={{textTransform:"capitalize"}} contentEditable>
          <p className="invoice__to">to</p>
            <h4>
              {invoiceContent.details?.name}
            </h4>
            <p className="invoice__to">{"c/o "}{invoiceContent.details?.care_of}</p>
          </address>
          <table class="meta">
            <tr>
              <th>
                <span contentEditable>Invoice #</span>
              </th>
              <td>
                <span contentEditable>{invoiceContent.details?.id?.substring(0,6)}</span>
              </td>
            </tr>
            <tr>
              <th>
                <span contentEditable>Date</span>
              </th>
              <td>
                <span contentEditable>{invoiceDate}</span>
              </td>
            </tr>
            <tr>
              <th>
                <span contentEditable>Amount Due</span>
              </th>
              <td>
                <span id="prefix" contentEditable>
                
                  &#8377;
                </span>
                <span>{total-paid}</span>
              </td>
            </tr>
          </table>
          <table class="inventory">
            <thead>
              <tr>
                <th>
                  <span contentEditable>Item</span>
                </th>
                <th>
                  <span contentEditable>Description</span>
                </th>
                <th>
                  <span contentEditable>Rate</span>
                </th>
                <th>
                  <span contentEditable>Quantity</span>
                </th>
                <th>
                  <span contentEditable>Price</span>
                </th>
              </tr>
            </thead>
            <tbody>
             
              <tr>
                <td>
                  <span contentEditable>{invoiceContent.details?.item}</span>
                </td>
                <td>
                  <span contentEditable>{invoiceContent.details?.title}</span>
                </td>
                <td>
                  <span data-prefix>&#8377;</span>
                  <input className="rate" onChange={(e)=>setGross(Number(e.target.value))} type="number" defaultValue={gorss}></input>
                </td>
                <td>

                  <input type="number" defaultValue={quatily}  onChange={(e)=>setQuantity(Number(e.target.value))}></input>
                </td>
                <td>
                  <span data-prefix>&#8377;</span>
                  <span className="sub__total">{gorss*quatily}</span>
                </td>
              </tr>
              {numberofRows.map((row,index)=>{

                return (
                  <tr>
                  <td>
                    <a class="cut"  onClick={()=>deleteRow(index)}>-</a>
                    <span contentEditable>Enter Item Deatails</span>
                  </td>
                  <td>
                    <span contentEditable>Item Descriptioin</span>
                  </td>
                  <td>
                    <span data-prefix>&#8377;</span>
                    <input className="rate" type="number" defaultValue={row?.gross__amount} onChange={(e)=>updateGross(index,e.target.value)} />
                  </td>
                  <td>
                  <input  type="number" defaultValue={row?.count} onChange={(e)=>{
                    updateCount(index,e.target.value)
                  }} />
                  </td>
                  <td>
                    <span data-prefix>&#8377;</span>
                    <span className="sub__total">{row?.gross__amount*row?.count}</span>
                  </td>
                </tr>
  
                )
  
  
              })}
            </tbody>
          </table>
          <a class="add" onClick={addNewRow}>+</a>
          <table class="balance">
            <tr>
              <th>
                <span contentEditable>Total</span>
              </th>
              <td>
                <span data-prefix>&#8377;</span>
                <span>{total}</span>
              </td>
            </tr>
            <tr>
              <th>
                <span contentEditable>Amount Paid</span>
              </th>
              <td>
                <input defaultValue={paid} onChange={(e)=>setPaid(parseInt(e.target.value))}></input>
              </td>
            </tr>
            <tr>
              <th>
                <span contentEditable>Balance Due</span>
              </th>
              <td>
                <span data-prefix>&#8377;</span>
                <span>{total-paid}</span>
              </td>
            </tr>
          </table>
        </article>
        <aside>
          <h1>
          </h1>
          <div style={{textAlign:"center"}}>
            <p>Powerd by Mina-assist </p>
            <br />
            <img className="footer__logo"  style={{textAlign:"center"}} src={logo} width="60px" alt="" />
            <br />
            <p >www.mina-assist.com</p>
          </div>
        </aside>
      </div>
      </div>
    </div>
  );
};

export default Invoice;
