import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import {
  FormProvider,
  useForm,
} from "react-hook-form";
import CountrySelect from "../../../components/CountrySelect";
import AuthContext from "../../../context/AuthContext";
import { created, errorOccured } from "../../../utlties/Toastes";
import { yupResolver } from "@hookform/resolvers/yup";
import "react-datepicker/dist/react-datepicker.css";
import { visaSchema } from "../../../utlties/Schemas";

const AddVisaStambing = () => {
  const { agencies, getAgencies,headers,logoutUser } = useContext(AuthContext);

  useEffect(() => {
    getAgencies();
  }, []);
  const clearForm = () => {
    document.getElementById("visaForm").reset();
  };

  const methods = useForm({
    resolver: yupResolver(visaSchema),
  });
  const { errors } = methods.formState;

  const onSubmit = (data) => {
    data['debit_or_credit']=false
    data['title']=data['applicant_name']+" "+data['visa_type']+" visa"
    data['transaction_date']=data['remitted_date']

    axios.post("/api/visa/",data,{headers}).then((res)=>{
      if (res.status==201) {
        created()
        clearForm()
        methods.reset()
        
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
      <form
        id="visaForm"
        className="registration__container"
        onSubmit={methods.handleSubmit(onSubmit)}
      >
        <div className="registration__header">
          <h1>Visa Stambing</h1>
          <p>Add New Stambing Visa</p>
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
                <p>
                  <i className="fa-solid fa-star-of-life"></i> Pass Issue Date
                </p>

                <input type="date" {...methods.register("pass_issue", {
                  valueAsDate: true,
                })} />
                <p className="error">{errors.pass_issue?.message}</p>
              </div>
              <div className="input__field">
                <p>
                  <i className="fa-solid fa-star-of-life"></i> Date of Expiry
                </p>
                <input type="date" {...methods.register("pass_expiry", {
                  valueAsDate: true,
                })} />
                <p className="error">{errors.pass_expiry?.message}</p>
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
                <p>Agency</p>

                <select id="" {...methods.register("agency")}>
                  <option disabled>select agency....</option>

                  {agencies?.map((agency) => (
                    <option value={agency.id}>
                      {agency.name + " " + agency.branch}
                    </option>
                  ))}
                </select>
                <p className="error">{errors.agency?.message}</p>
              </div>
            </div>
            <div className="reg__second">
              <div className="input__field">
                <p>
                  <i className="fa-solid fa-star-of-life"></i> Date of Birth
                </p>
                <input
                  type="date"
                  placeholder="9876543210"
                  {...methods.register("dob", {
                    valueAsDate: true,
                  })}
                />
                <p className="error">{errors.dob?.message}</p>

                <p className="error">{errors.dob?.message}</p>
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
            <div className="reg__second reg__third">
              <div className="input__field">
                <p>Country</p>
                <CountrySelect />
                <p className="error">{errors.country?.message}</p>
              </div>
              <div className="input__field">
                <p>Passport No</p>
                <input
                  type="text"
                  placeholder="W020303"
                  {...methods.register("pass_number")}
                />
                <p className="error">{errors.pass_number?.message}</p>
              </div>

              <div className="input__field" id="amount">
                <p>Contact</p>

                <input
                  type="text"
                  name=""
                  placeholder="9876543210"
                  id=""
                  {...methods.register("phone")}
                />
                <p className="error">{errors.phone?.message}</p>
              </div>
            </div>
            <div className="reg__second reg__third">
              <div className="input__field">
                <p>Gross Amount</p>
                <input
                  type="text"
                  placeholder="13004"
                  {...methods.register("gross_amount")}
                />
                <p className="error">{errors.gross_amount?.message}</p>
              </div>
              <div className="input__field" id="amount">
                <p>Net Amount</p>

                <input
                  type="text"
                  name=""
                  placeholder="Amount"
                  id=""
                  {...methods.register("net_amount")}
                />
                <p className="error">{errors.net_amount?.message}</p>
              </div>
              <div className="input__field" id="amount">
                <p>Paid</p>

                <input
                  type="text"
                  name=""
                  placeholder="Amount"
                  id=""
                  {...methods.register("paid")}
                />
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
            <div className="reg__second">
              <div className="input__field">
                <p>Visa Type</p>

                <select
                  id=""
                  {...methods.register("visa_type")}
                >
                  <option value="Employment">Employment</option>
                  <option value="Family visit"> Family visit</option>
                  <option value="Visit">Visit</option>
                  <option value="Turist">Turist</option>
                  <option value="Buisness">Buisness</option>
                  <option value="Medical">Medical</option>
                  <option value="Umrah">Umrah</option>
                  <option value="Hajj">Hajj</option>
                  <option value="Student">Student</option>
                  <option value="Transit">Transit</option>
                </select>
              </div>
              <div className="input__field radio">
                <p>Visa Mode</p>
                <input
                  type="radio"
                  id="html"
                  name="fav_language"
                  value="stambing"
                  {...methods.register("visa_mode")}
                />
                <label for="html">Stambing Visa</label>
                <br />
                <input
                  type="radio"
                  id="css"
                  name="fav_language"
                  value="evisa"
                  {...methods.register("visa_mode")}
                />
                <label for="css">E-visa</label>
                <br />
              </div>
            </div>
          </div>
        </div>
        <div className="registration__footer">
          <div className="registration__confirm">
            <button className="goback">Go back</button>
            <button className="create" type="submit">
              Create
            </button>
          </div>
        </div>
      </form>
    </FormProvider>
  );
};

export default AddVisaStambing;
