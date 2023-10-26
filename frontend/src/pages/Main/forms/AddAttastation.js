import React, { useContext, useEffect } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import AuthContext from "../../../context/AuthContext";
import { attastationSchema } from "../../../utlties/Schemas";
import CountrySelect from "../../../components/CountrySelect";
import { created, errorOccured } from "../../../utlties/Toastes";
import axios from "axios";


const AddAttastation = () => {

  const {getAgencies,agencies,logoutUser,headers}=useContext(AuthContext)

  useEffect(()=>{
    
    
    getAgencies()

 },[])
  const methods = useForm({
    resolver:yupResolver(attastationSchema)
  });
  const { errors } = methods.formState;

  const clearForm = () => {
    document.getElementById("attastationForm").reset();
  };
  const onSubmit = (data) => {
    data['debit_or_credit']=false
    data['title']=data['applicant_name']+" Attastation"
    data['transaction_date']=data['remitted_date']

    axios.post("/api/attastation/",data,{headers}).then((res)=>{
      if (res.status==201) {
        created()
        clearForm()
        
      }
      

    }).catch((err)=>{
      if(err.response.status===401){
        logoutUser()
        
      }else{
        errorOccured()
      }
      
    })

  };
  return (
  <FormProvider {...methods}>
    <form className="registration__container" id="attastationForm" onSubmit={methods.handleSubmit(onSubmit)}>
      <div className="registration__header">
        <h1>Certificate Attastation</h1>
        <p>Create new Attastation</p>
      </div>
      <div className="registration__body">
        <div className="registration__row">
          <div className="reg_first">
            <div className="input__field">
              <p>
                <i className="fa-solid fa-star-of-life"></i> Name
              </p>
              <input
                type="text"
                placeholder="Applicant name"
                {...methods.register("applicant_name")}
              />
              <p className="error">{errors.applicant_name?.message}</p>


            </div>
          </div>
          <div className="reg__second">
          <div className="input__field">
          <p>Passport Number</p>
          <input
            type="text"
            placeholder="W987654"
            {...methods.register("pass_number")}
          />
          <p className="error">{errors.pass_number?.message}</p>

        </div>
            <div className="input__field">
              <p>
                <i className="fa-solid fa-star-of-life"></i> Remitted Date
              </p>
              <input
                type="date"
            
                defaultValue={new Date().toISOString().substring(0, 10)}

                {...methods.register("remitted_date", {
                  valueAsDate: true,
                })}
              />
              <p className="error">{errors.remitted_date?.message}</p>

            </div>
          </div>
        </div>
        <div className="registration__row">
          <div className="reg__second">
            <div className="input__field">
              <p>
                <i className="fa-solid fa-star-of-life"></i> Care of
              </p>
              <input
                type="text"
                placeholder="Applicant Care of"
                {...methods.register("care_of")}
              />
              <p className="error">{errors.care_of?.message}</p>

            </div>
            <div className="input__field">
              <p>
                <i className="fa-solid fa-star-of-life"></i> Contact number
              </p>
              <input
                type="text"
                placeholder="98765432110"
                {...methods.register("phone")}
              />
              <p className="error">{errors.phone?.message}</p>

            </div>
          </div>
          <div className="reg__second reg__third">
            <div className="input__field">
              <p>
                <i className="fa-solid fa-star-of-life"></i> Date of Birth
              </p>
              <input
                type="date"
                className="currentdate"
                id="from"
               
                {...methods.register("dob", {
                  valueAsDate: true,
                })}
              />
              <p className="error">{errors.dob?.message}</p>

            </div>
            <div className="input__field">
              <p>Agency</p>
              <select name="payment_status" id="" {...methods.register("agency")}>
              {
                agencies?.map((agency)=>(
                  <option value={agency.id}>{agency.name+" "+agency.branch}</option>

                ))
              }
                
               
              </select>
              <p className="error">{errors.agency?.message}</p>


            
            </div><div className="input__field">
            <p>Certificate Type</p>

            <select
              id=""
              {...methods.register("certificate")}
            >
              <option value="Marriage">Marriage</option>
              <option value="Under graduate"> UG</option>
              <option value="Post Graduate">PG</option>
              <option value="diploma">Diploma</option>
              <option value="school leaving">School leaving</option>
              <option value="tranfer">Tranfer</option>
              <option value="birth">Birth</option>
              <option value="other">other</option>
            </select>
          </div>
          </div>
        </div>
        <div className="registration__row">
          <div className="reg__second">
            <div className="input__field">
              <p>Country</p>
              <CountrySelect/>
              <p className="error">{errors.country?.message}</p>



              
            </div>
            <div className="input__field">
              <p>Gross Amount</p>
              <input
                type="text"
                placeholder="5500"
                {...methods.register("gross_amount")}
              />
              <p className="error">{errors.gross_amount?.message}</p>

            </div>
           
          </div>
          <div className="reg__second ">
            
            <div className="input__field">
              <p>
                {" "}
                <i className="fa-sharp fa-solid  fa-indian-rupee-sign"></i>Net
                Amount
              </p>
              <input
                type="text"
                placeholder="500"
                {...methods.register("net_amount")}
              />
              <p className="error">{errors.net_amount?.message}</p>

              
            </div>
            <div className="input__field">
              <p>
                {" "}
                <i className="fa-sharp fa-solid  fa-indian-rupee-sign"></i> Paid
              </p>
              <input type="text" placeholder="5500" {...methods.register("paid")} />
              <p className="error">{errors.paid?.message}</p>

            </div>
          </div>
        </div>
        <div className="registration__row">
          <div className="reg__first notes">
            <div className="input__field">
              <p>Notes</p>
              <textarea {...methods.register("notes")}></textarea>
            </div>
          </div>
        </div>
      </div>
      <div className="registration__footer">
        <div className="registration__confirm">
          <button className="goback">Go back</button>
          <button className="create" type="submit">
            Create{" "}
          </button>
        </div>
      </div>
    </form>
    </FormProvider>
  
  );
};

export default AddAttastation;
