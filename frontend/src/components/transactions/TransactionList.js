import axios from "axios";
import React, { useState, useEffect, useContext } from "react";
import AuthContext from "../../context/AuthContext";
import { errorOccured } from "../../utlties/Toastes";
import payment from "../../assets/payment.png";
import { useNavigate } from "react-router-dom";

const TransactionList = (props) => {
  const navigate = useNavigate();
  const { getHeaders, logoutUser,domain } = useContext(AuthContext);
  const {
    seeUsers,
    agencyId,
    q,
    from,
    to,
    pageNumber,
    agencyHeader,
    setTransactionEnlarger,
    setNext,
    next,
    setPageNumber,
    searchTrigger,
    setTransactions,
    transactions,
  } = props.contexts;

  const [finalAmount, setFinalAmount] = useState({});
  const [advance, setAdvance] = useState(0);
  const [you_will_pay, setYou_will_pay] = useState(0);

  useEffect(() => {
    agencyId &&
      axios
        .get(
          `${domain}/api/get-transactions/${agencyId}?from=${from}&to=${to}&page=${pageNumber}&q=${q}`,
          getHeaders
        )
        .then((res) => {
          setTransactions((prev) => [...prev, ...res.data.results]);
          setNext(res.data.next);
        }).catch((err)=>{
            if (err?.response.status==401) {
              logoutUser()
              
            }
            errorOccured()
          });

    if (agencyId) {
      axios
        .get(`${domain}/api/final-amount/${agencyId}/`, getHeaders)
        .then((res) => {
          setFinalAmount(res.data);

          if (res.data.credit_final >= res.data.debit_final) {
            setAdvance(res.data.credit_final - res.data.debit_final);
            setYou_will_pay(0);
          } else {
            setYou_will_pay(res.data.debit_final - res.data.credit_final);
            setAdvance(0);
          }
        })
        .catch((err) => {
          errorOccured();
        });
    }
  }, [agencyId, searchTrigger, pageNumber]);
  const nextPage = () => {
    setPageNumber((prev) => prev + 1);
  };
  const getTransactionData = (pk) => {
    axios
      .get(`${domain}/api/transaction/${pk}/`, getHeaders)
      .then((res) => {
        setTransactionEnlarger(() => res.data);
        let block = document.getElementById("enlarger__outer__layer4");
        block.style.display = "block";
      })
      .catch((err) => {
        if (err?.response.status == 401) {
          logoutUser();
        }
        errorOccured();
      });
  };
  return (
    <div class="deals__body">
      <div class="deal__row">
        <div class="deals__th">
          <p class="nowrap">
            {" "}
            <i
              class="fa-sharp fa-solid fa-users"
              onClick={() => seeUsers(1)}
            ></i>{" "}
            {agencyHeader}
          </p>
        </div>

        <div class="deals__th">
          <p class="nowrap ">Date</p>
        </div>

        <div class="deals__th">
          <p class="nowrap">
            <i class="fa-sharp fa-solid fa-indian-rupee-sign"></i> Debited
          </p>
        </div>

        <div class="deals__th">
          <p class="nowrap">
            <i class="fa-sharp fa-solid fa-indian-rupee-sign"></i> Credited
          </p>
        </div>

        <div class="deals__th">
          <p class="nowrap">Bill no</p>
        </div>
      </div>
      {transactions.length < 1 ? (
        <div class="no_data_error">
          <img src={payment} />
          <h2>Empty Transactions..!! </h2>
        </div>
      ) : (
        transactions?.map((transaction) => {
          return (
            <div
              class="deal__row"
              onClick={() => getTransactionData(transaction.id)}
            >
              <div class="deals__td">
                <p class="deals__td ">{transaction.title}</p>
              </div>

              <div class="deals__td">
                <p class=""> {transaction?.transaction_date}</p>{" "}
              </div>

              <div class="deals__td">
                {!transaction.debit_or_credit && (
                  <p class=" debit">
                    <i class="fa-sharp fa-solid fa-indian-rupee-sign"></i>{" "}
                    {transaction?.net_amount}
                  </p>
                )}
              </div>

              <div class="deals__td">
                {transaction?.debit_or_credit && (
                  <p class=" credit">
                    <i class="fa-sharp fa-solid fa-indian-rupee-sign"></i>{" "}
                    {transaction.net_amount}{" "}
                  </p>
                )}
              </div>

              <div class="deals__td">
                <p class="td__balance"> {transaction?.bill_no}</p>
              </div>
            </div>
          );
        })
      )}
      {next && (
        <div onClick={nextPage} className="more">
          more
        </div>
      )}

      <div class="deal__balance">
        <div class="deal__advance">
          <h3 class="nowrap">
            Advance:{" "}
            <span>
              {" "}
              &nbsp;<i class="fa-sharp fa-solid fa-indian-rupee-sign"></i>{" "}
              {advance}
            </span>
          </h3>
        </div>
        <div class="deal__give">
          <h3 class="nowrap">
            You will give:&nbsp;{" "}
            <span>
              <i class="fa-sharp fa-solid fa-indian-rupee-sign"></i>{" "}
              {you_will_pay}
            </span>
          </h3>
        </div>
        <div class="add__iconn" onClick={() => navigate("/create-transaction")}>
          {" "}
          <span class="add__icon">
            <ion-icon name="add-circle"></ion-icon>
          </span>
        </div>
      </div>
    </div>
  );
};

export default TransactionList;
