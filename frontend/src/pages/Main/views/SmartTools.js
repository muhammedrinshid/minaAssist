import React, { useState } from "react";
import AnnexC from "../../../components/model form/AnnexC";
import AnnexD from "../../../components/model form/AnnexD";
import AnnexForm from "../../../components/model form/AnnexForm";
import Invoice from "../../../components/model form/Invoice";

const SmartTools = () => {
    const [invoiceContent, setInvoiceContent] = useState({
        visibility: false,
        details: {
          gross__amount: "",
          item: "",
          count: "",
          title: "",
          paid: "",
          name: "",
          care_of: "",
        },
      });
      const [annexContent, setAnnexContent] = useState({
        visibility: false,
        defaultValues: {},
        formState: "form",
        applicationType: false,
      });
  return (
    <div class="smart__tool__container">
      <div class="smart__tool" onClick={()=>setInvoiceContent((prev)=>{
        return {...prev,visibility:true}
      })}>
        <div class="card_image">
          {" "}
          <img src="https://img.freepik.com/free-vector/invoice-concept-illustration-invoice-documents-with-calculator-mpney-cards_613284-904.jpg?w=740&t=st=1692884165~exp=1692884765~hmac=b38c1896e0752a78e6182ec7c7006db9e45a62b6d35172b4f74d85a65d28989a" />{" "}
        </div>
        <div class="card_title title-white">
          <p>Generate Invoice</p>
        </div>
      </div>
      <div class="smart__tool" onClick={()=>setAnnexContent((prev)=>{
        return {...prev,visibility:true}
      })}>
        <div class="card_image">
          {" "}
          <img src="https://img.freepik.com/free-vector/illustration-document-icon_53876-28510.jpg?w=740&t=st=1692884392~exp=1692884992~hmac=8c4e31524969488f989e91536f6e7bbf6dcf470b806585a0559aff992983e4a3" />{" "}
        </div>
        <div class="card_title title-white">
          <p>Annex C and D</p>
        </div>
      </div>
      <div class="smart__tool">
        <div class="card_image">
          {" "}
          <img src="https://img.freepik.com/free-vector/isometric-style-health-passport_23-2148876726.jpg?w=740&t=st=1692884553~exp=1692885153~hmac=46f8959ea52dc28b7b75e2eb954bf8611657dd9af4e5de4f4f3b84752ecfcb5e" />{" "}
        </div>
        <div class="card_title title-white">
          <p>Passport Extraction</p>
        </div>
      </div>
      {annexContent.visibility && (
        <div className="pop__container">
          {annexContent.formState == "form" ? (
            <AnnexForm
              setAnnexContent={setAnnexContent}
              annexContent={annexContent}
              appoinmentEnlarger={{}}
            />
          ) : annexContent.formState == "D" ? (
            <AnnexD
              setAnnexContent={setAnnexContent}
              annexContent={annexContent}
            />
          ) : (
            <AnnexC
              setAnnexContent={setAnnexContent}
              annexContent={annexContent}
            />
          )}
        </div>
      )}
      {invoiceContent.visibility && (
        <div className="pop__container">
          <Invoice
            setInvoiceContent={setInvoiceContent}
            invoiceContent={invoiceContent}
          />
        </div>
      )}

    </div>
  );
};

export default SmartTools;
