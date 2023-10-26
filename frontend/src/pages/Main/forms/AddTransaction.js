import { yupResolver } from "@hookform/resolvers/yup";
import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import AuthContext from "../../../context/AuthContext";
import { transactionSchema } from "../../../utlties/Schemas";
import { created, errorOccured } from "../../../utlties/Toastes";

const AddTransaction = () => {
  const { getAgencies, agencies,logoutUser,headers } = useContext(AuthContext);
  const navigate=useNavigate()

  useEffect(() => {
    getAgencies();
  }, []);
  const clearForm = () => {
    document.getElementById("transactionForm").reset();
  };


  const [cord, setCord] = useState(true);
  const { register, handleSubmit,formState:{errors},reset} = useForm({
    resolver:yupResolver(transactionSchema)
  });
  const onSubmit = (data) => {
    axios.post("/api/transaction/",data,{headers}).then((res)=>{
      if (res.status==201) {
        created()
        clearForm()
        reset()
        
        
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
    <form id="transactionForm" class="registration__container" onSubmit={handleSubmit(onSubmit)}>
      <div class="registration__header">
        <h1>Transaction Registration</h1>
        <p>Add New Transaction</p>
      </div>
      <div class="registration__body">
        <div class="registration__row">
          <div class="reg__second">
            {cord ? (
              <div class="input__field">
                <p>
                  <i class="fa-solid fa-star-of-life"></i> &nbsp;
                  <i class="fa-sharp fa-solid  fa-indian-rupee-sign"></i> Amount
                </p>
                <input type="text" placeholder="Amount" {...register("net_amount")}/>
                <p className="error">{errors.net_amount?.message}</p>

              </div>
            ) : (
              <div class="input__field">
                <p>
                  <i class="fa-solid fa-star-of-life"></i> &nbsp;
                  <i class="fa-sharp fa-solid  fa-indian-rupee-sign"></i>Net
                  Amount
                </p>
                <input type="text" placeholder="Amount"  {...register("net_amount")}/>
                <p className="error">{errors.net_amount?.message}</p>

              </div>
            )}
            <div class="input__field">
              <p>
                <i class="fa-solid fa-star-of-life"></i>Title
              </p>
              <input type="text" {...register("title")}/>
              <p className="error">{errors.title?.message}</p>

            </div>
          </div>

          <div class="reg_first">
            <div class="input__field">
              <p>
                <i class="fa-solid fa-star-of-life"></i>
                Agency
              </p>
              <select id="" {...register("agency")}>
              <option disabled>Select a agency</option>

                {agencies?.map((agency) => (
                  <option value={agency.id}>
                    {agency.name + " " + agency.branch}
                  </option>
                ))}
              </select>
              <p className="error">{errors.agency?.message}</p>

            </div>
          </div>
        </div>
        <div class="registration__row">
          <div class="reg__second">
            <div class="input__field">
              <p>Deposited Through</p>

              <select name="payment_status" id="" {...register("transaction_method")}>
                <option value="Bank deposit">Bank Deposit</option>
                <option value="Face to face"> Face to face</option>
                <option value="Upi">UPI</option>
                <option value="Net Banking">Net Banking</option>
                <option value="Check">Check</option>
                <option value="Tranfer">Transfer</option>
              </select>
              <p className="error">{errors.transaction_method?.message}</p>

              
            </div>
            <div class="input__field">
              <p>
                <i class="fa-solid fa-star-of-life"></i> ID or Bill no
              </p>
              <input type="text" placeholder="Ckd33" {...register("bill_no")} />
              <p className="error">{errors.bill_no?.message}</p>

            </div>
          </div>
          <div class="reg__second reg__third">
          <div class="input__field">
              <p>
                <i class="fa-solid fa-star-of-life"></i> Date
              </p>
              <input
                  type="date"
                  defaultValue={new Date().toISOString().substring(0, 10)}
                  {...register("transaction_date", {
                    valueAsDate: true,
                  })}
                />
              <p className="error">{errors.transaction_date?.message}</p>

            </div>

            {!cord && (
              <div class="input__field">
                <p>
                  <i class="fa-solid fa-star-of-life"></i> &nbsp;
                  <i class="fa-sharp fa-solid  fa-indian-rupee-sign"></i>Gross
                  Amount
                </p>
                <input type="text" placeholder="Gross Amount" {...register("gross_amount")} defaultValue={0} />
                <p className="error">{errors.gross_amount?.message}</p>

              </div>
            )}
            <div class="input__field radio">
              <p>
                <i class="fa-solid fa-star-of-life"></i> Type
              </p>
              <input
                type="radio"
                id="html"
                name="fav_language"
                value={true}
                onClick={() => setCord(true)}
                {...register("debit_or_credit")}

                
              />
              <label for="html">Credit</label>&nbsp; &nbsp;
              <input
                type="radio"
                id="css"
                name="fav_language"
                value={false}
                onClick={() => setCord(false)}
                {...register("debit_or_credit")}
              />
              <label for="css">Debit</label>
              <p className="error">{errors.debit_or_credit?.message}</p>
            </div>
            
          

          </div>
        </div>

        <div class="registration__row">
          <div class="reg__first notes">
            <div class="input__field">
              <p>
                <i class="fa-solid fa-star-of-life"></i> Notes
              </p>
              <textarea {...register("notes")}></textarea>
            </div>
          </div>
       
        </div>
      </div>
      <div class="registration__footer">
        <div class="registration__confirm">
          <button class="goback" type="button" onClick={()=>navigate(-1)}>Go back</button>
          <button class="create" type="submit">Create </button>
        </div>
      </div>
    </form>
  );
};

export default AddTransaction;
