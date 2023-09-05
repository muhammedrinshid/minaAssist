import React from "react";
import jsPDF from 'jspdf';
import { useRef } from "react";

const AnnexD = (props) => {
  const annexTemplateRef=useRef(null)

  const setAnnexContent = props.setAnnexContent;
  const annexContent = props.annexContent;
  const blank = "...................................";


  const onNext = () => {
    setAnnexContent((prev) => {
      return {
        ...prev,
        formState: "c",
      };
    });
  };
  const previus = () => {
    setAnnexContent((prev) => {
      return {
        ...prev,
        formState: "form",
      };
    });
  };
  const handleGeneratePdf=()=>{
    const doc=new jsPDF('p','pt','a4',true)
    doc.setFontSize(12)
    doc.html(annexTemplateRef.current,{
      html2canvas:{
        width:200
      },
      async callback(doc){
        await doc.save(annexContent?.defaultValues?.name+" AnnexD")
      }
    })

  }
  return (
    <div class="annexure__container">
      <div className="annex__controle">
        <i class="fa-solid fa-arrow-left" onClick={previus}></i>

        <i class="fa-solid fa-print" onClick={()=>window.print()} ></i>
        <i class="fa-solid fa-download" onClick={handleGeneratePdf}></i>

        {annexContent.applicationType && (
          <button onClick={onNext}>
            Annexure C{"  "} <i class="fa-solid fa-arrow-right"></i>
          </button>
        )}
      </div>
      <div ref={annexTemplateRef} className="annexure__inner " id="print__area">
        <div class="annx__header">
          <h4 class="dynamic__content">ANNEXURE -‘D’</h4>
          <h2>SPECIMEN DECLARATION BY APPLICANT’S PARENT(S) OR GUARDIAN FOR</h2>
          <h2>PASSPORT TO MINOR</h2>
          <h2>(On plain paper)</h2>
          
        </div>
        <p>
            { annexContent.applicationType? "I, ":"we, "}{" "}
            <span class="dynamic__content" contentEditable>
              {annexContent.applicationType && (annexContent.defaultValues.absenty == "FATHER")
                ? annexContent.defaultValues.mname + " "
                : annexContent.applicationType &&
                  (annexContent.defaultValues.absenty == "MOTHER")
                ? annexContent.defaultValues.fname+" "
                : annexContent.defaultValues.fname +
                  " and " +
                  annexContent.defaultValues.mname +
                  "  "}
            </span>
            resident of{" "}
            <span class="dynamic__content" contentEditable>
              {" "}
              {annexContent.defaultValues?.address? annexContent.defaultValues.address+","+annexContent.defaultValues.district+","+annexContent.defaultValues.pincode+","+annexContent.defaultValues.state+" INDIA ":blank+blank+blank+"INDIA "}
            </span>
            hereby affirm that the particulars given below are of{" "}
            <span class="dynamic__content" contentEditable>{annexContent.defaultValues?.name?annexContent.defaultValues.name:blank+blank+blank}</span> (name of
            the child), son/daughter of Shri{" "}
            <span class="dynamic__content" contentEditable>
              {annexContent.defaultValues.fname?annexContent.defaultValues.fname:blank+blank+blank}
            </span>{" "}
            and Smt{" "}
            <span class="dynamic__content" contentEditable>
            {annexContent.defaultValues.mname?annexContent.defaultValues.mname:blank+blank+blank}
            </span>{" "}
            of whom I/we am/are the parents /guardian.
          </p>
        <h2 class="annexh2"> Particulars of minor child</h2>
        <p class="particulars">
          {" "}
          Name :<span class="dynamic__content" contentEditable>{annexContent.defaultValues.name}</span>
          <br />
          Date of birth :<span class="dynamic__content" contentEditable>{annexContent.defaultValues.dob}</span>
          <br />
          Place of birth : <span class="dynamic__content" contentEditable>{annexContent.defaultValues.pob}</span>
        </p>
        <p class="particulars">
          2. The minor child me/ntioned above is a citizen of India. <br />
          3. I/We undertake the entire responsibility for his/her expenses.{" "}
          <br />
          4. I/we solemnly declare that he /she has not lost, surrendered or
          been deprived of his/her citizenship of India and that the information
          given in respect of him/her in this application is true.
          <br />
          5. It is also certified that I/we am/are holding /not holding valid
          India passport(s).
        </p>

        <div class="annex__flex">
          <div class="annex__sign">
            <p class="particulars">Place: </p>{" "}
          </div>
          <div class="annex__sign">
            <p class="particulars">Date: </p>{" "}
          </div>{" "}
        </div>
        <div class="annex__flex">
          <div class="annex__sign">
            <p class="particulars">
              Signature of father <br />
              Passport No :{" "}
              <span class="dynamic__content" contentEditable>{annexContent.defaultValues.fid.length==8?annexContent.defaultValues.fid:blank}</span> <br />
              Aadhaar Card No:{" "}
              <span class="dynamic__content" contentEditable>{annexContent.defaultValues.fid.length==12?annexContent.defaultValues.fid:blank}</span> <br />
              Voter ID Card No:{" "}
              <span class="dynamic__content" contentEditable>{annexContent.defaultValues.fid.length==10?annexContent.defaultValues.fid:blank}</span>{" "}
            </p>{" "}
          </div>
          <div class="annex__sign">
            <p class="particulars">
              Signature of Mother <br />
              Passport No :{" "}
              <span class="dynamic__content" contentEditable>{annexContent.defaultValues.mid.length==8?annexContent.defaultValues.mid:blank}</span> <br />
              Aadhaar Card No:{" "}
              <span class="dynamic__content" contentEditable> {annexContent.defaultValues.mid.length==12?annexContent.defaultValues.mid:blank} </span>; <br />
              Voter ID Card No:{" "}
              <span class="dynamic__content" contentEditable> {annexContent.defaultValues.mid.length==10?annexContent.defaultValues.mid:blank} </span>{" "}
            </p>{" "}
          </div>{" "}
        </div>
        <div class="annex__flex">
          <div class="annex__sign">
            <p class="particulars">
              Signature of legal guaridan(s) <br />
              Passport No :{" "}
              <span class="dynamic__content" contentEditable>..................</span> <br />
              Aadhaar Card No:{" "}
              <span class="dynamic__content" contentEditable>..................</span> <br />
              Voter ID Card No:{" "}
              <span class="dynamic__content" contentEditable>..................</span>{" "}
            </p>{" "}
          </div>
          <div class="annex__sign"></div>
        </div>
      </div>
    </div>
  );
};

export default AnnexD;
