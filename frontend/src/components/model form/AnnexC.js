import React from "react";
import jsPDF from 'jspdf';
import { useRef } from "react";

const AnnexC = (props) => {
  const annexTemplateRef=useRef(null)
  const setAnnexContent = props.setAnnexContent;
  const annexContent = props.annexContent;
  const defaultValues = annexContent.defaultValues;
  const previus = () => {
    setAnnexContent((prev) => {
      return {
        ...prev,
        formState: "D",
      };
    });
  };
  let presentParent = "";
  let presentParentId = "";
  let notPresentParent = "";
  let blank = ".......................";
  if (defaultValues?.absenty == "FATHER") {
    presentParent = defaultValues.mname;
    presentParentId = defaultValues.mid;
    notPresentParent = defaultValues.fname;
  } else {
    presentParent = defaultValues.fname;
    presentParentId = defaultValues.fid;
    notPresentParent = defaultValues.mname;
  }
  const address =
    defaultValues?.address + " ,"+
    defaultValues?.district + " ,"+
    defaultValues?.pincode +" "+
    defaultValues?.state +","+
    " " +
    "INDIA";
  const handleGeneratePdf=()=>{
    const doc=new jsPDF('p','pt','a4',true)
    doc.setFontSize(12)
    doc.html(annexTemplateRef.current,{
      html2canvas:{
        width:200
      },
      async callback(doc){
        await doc.save(defaultValues?.name+" annexC")
      }
    })

  }
  return (
    <div class="annexure__container">
      <div className="annex__controle">
        <i class="fa-solid fa-arrow-left" onClick={previus}></i>

        <i class="fa-solid fa-print" onClick={()=>window.print()}></i>
        <i class="fa-solid fa-download" onClick={handleGeneratePdf}></i>
      </div>
      <div ref={annexTemplateRef} className="annexure__inner" id="print__area">
        <div class="annx__header">
          <h4 class="dynamic__content" contentEditable>
            Annexure- ‘C’
          </h4>
          <h2>
            SPECIMEN DECLARATION BY APPLICANT’S PARENT OR GUARDIAN FOR ISSUE OF
          </h2>
          <h2>PASSPORT TO MINOR WHEN ONE PARENT HAS NOT GIVEN CONSENT</h2>
          <h2>(On plain paper)</h2>
         
        </div>
        <p>  I/We {" "}
        <span class="dynamic__content" contentEditable>{presentParent}
        </span>{" "}
        (name of the parent / guardian applying for passport )resident of{" "}
        <span class="dynamic__content" contentEditable>
          {" "}
          {defaultValues.address ? address :blank+blank+ "INDIA  "}{" "}
        </span>{" "}
        solemnly declare and affirm as under :-
      </p>
        <p class="particulars">
          (I) That I/we am/are the mother/father/parents/guardians of{" "}
          <span class="dynamic__content" contentEditable>
            {" "}
            {defaultValues.name ? defaultValues.name : blank + blank}{" "}
          </span>{" "}
          (name of the minor child) who is minor and on whose behalf I/we have
          made an application for his/her passport.
        </p>
        <p class="particulars">
          (II) Signature/consent of Shri/Sm{" "}
          <span class="dynamic__content" contentEditable>
            {notPresentParent}
          </span>{" "}
          (name of the father/mother) who is the father/mother/parents of the
          child has not been obtained by me for the following one or more
          reasons:-
        </p>
        <div class="particulars">
        {defaultValues.a &&
            <p class="reason__option">
            (a) The father/mother of the minor applicant is travelling abroad/is on sea/travelling in India and unable to file consent; or/and"</p>}
          {defaultValues.b&& <p class="reason__option">
            (b) The father/mother is separated and no court case is pending before the court regarding divorce/marital dispute/custody of the child; or/and</p>}
            {defaultValues.c&&<p class="reason__option">
           (c) The father/mother has deserted and the whereabouts are not known; or/and"
          </p>}
          {defaultValues.d&&<p class="reason__option">
            (d) There is an ongoing court case for divorce/custody of the minor     child and the court has not given any order prohibiting the issue of passport without the consent of father/mother; or/and"</p>}
            { defaultValues.e&&          <p class="reason__option">
(e) There is a court order for the custody of the minor child with a parent who is applying for the passport and consent of other parent (who has visitation rights) is not available or he/she is refusing  to give consent/the other parent is not availing the visitation  rights and his/her whereabouts are not known; or/and" </p>}
{defaultValues.f&&<p class="reason__option">
(f) The parents are judicially separated and custody of the minor child has not been defined in the court’s decree; or/and"</p>}
{defaultValues.g&&(
    <p class="reason__option">
            (g) The father/mother of {' '}<span class="dynamic__content" contentEditable>{defaultValues.name }</span>(name of minor child) has deserted me after the conception/delivery. That            <span class="dynamic__content" contentEditable>{defaultValues.name}</span> (name of minor child) is exclusively under my care and custody since separation/delivery."</p>)}
        </div>
        <p class="particulars">
          {" "}
          (III) That I/we only am/are taking care of{" "}
          <span class="dynamic__content" contentEditable>
          {defaultValues.name ? defaultValues.name : blank + blank}{" "}
          </span>{" "}
          name of the minor child) and he/she is exclusively in my/our physical
          custody.
        </p>
        <p class="particulars">
          (IV) I/we also affirm that in the case of a court case arising due to
          issue of a passport to the minor child{" "}
          <span class="dynamic__content" contentEditable>
          {defaultValues.name ? defaultValues.name : blank + blank}{" "}
          </span>{" "}
          (name of the minor child), I/we would be solely responsible for
          defending the case and not the Passport Issuing Authority.
        </p>
        .
        <div class="annex__flex">
          <div class="annex__sign"></div>
          <div class="annex__sign d__sign">
            <p class="particulars">
              Signature of the parent(s) <br />
              Guardian(s) applying for the Passport
            </p>
          </div>
        </div>
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
              Name(s){" "}
              <span class="dynamic__content" contentEditable>
                {" "}
                {presentParent ? presentParent : blank + blank}{" "}
              </span>{" "}
            </p>{" "}
            <br />
            Passport No :{" "}
            <span class="dynamic__content" contentEditable>
              {presentParentId.length==8&&presentParentId}
            </span>{" "}
            <br />
            Aadhaar Card No:{" "}
            <span class="dynamic__content" contentEditable>
            {presentParentId.length==12&&presentParentId}
            </span>{" "}
            <br />
            Voter ID Card No:{" "}
            <span class="dynamic__content" contentEditable>
            {presentParentId.length==10&&presentParentId}
            </span>{" "}
          </div>
          <div class="annex__sign">
            <p class="particulars"></p>
          </div>{" "}
        </div>
      </div>
    </div>
  );
};

export default AnnexC;
