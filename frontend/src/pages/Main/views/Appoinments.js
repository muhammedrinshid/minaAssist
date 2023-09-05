import axios from "axios";
import React, { useEffect, useState, useContext } from "react";
import Appoinment from "../../../components/appoinments/Appoinment";
import { AppoinmentEnlarged } from "../../../components/appoinments/AppoinmentEnlarged";
import Loading from "../../../components/Loading";
import AuthContext from "../../../context/AuthContext";
import panda2 from "../../../assets/padaaz2.png";
import DeleteModelForm from "../../../components/model form/DeleteModelForm";
import AnnexForm from "../../../components/model form/AnnexForm";
import { Deleted, errorOccured } from "../../../utlties/Toastes";
import AnnexD from "../../../components/model form/AnnexD";
import AnnexC from "../../../components/model form/AnnexC";
import Invoice from "../../../components/model form/Invoice";
import { useNavigate } from "react-router-dom";

const Appoinments = () => {
  const navigate = useNavigate();
  const { getHeaders,logoutUser } = useContext(AuthContext);
  const [appoinmentCount, setAppoinmentCount] = useState(0);
  const date1 = new Date();
  const date2 = new Date();
  date1.setDate(date1.getDate() - 30);
  date2.setDate(date2.getDate() + 30);
  const [loading, setLoading] = useState(false);
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

  const [from, setFrom] = useState(date1.toISOString().substring(0, 10));
  const [to, setTo] = useState(date2.toISOString().substring(0, 10));
  const [pageNumber, setPageNumber] = useState(1);
  const [appoinmentEnlarger, setAppoinmentEnlarger] = useState(null);
  const [deleteContent, setDeleteContent] = useState({
    message:
      "Do you really want to delete these records? This process cannot be undone",
    visibility: false,
    id: "",
  });
  const [annexContent, setAnnexContent] = useState({
    visibility: false,
    defaultValues: {},
    formState: "form",
    applicationType: false,
  });

  const [appoinments, setApoinments] = useState([]);
  const [next, setNext] = useState(null);
  const [delRefresh, setDelRefresh] = useState(false);
  const [byAppoinment, setByAppoinment] = useState(false);
  const [q, setQ] = useState("");
  const [qholder, setQholder] = useState("");

  useEffect(() => {

    setLoading(true);
    axios
      .get(
        `/api/get-appoinments?page=${pageNumber}&from=${from}&to=${to}&q=${q}&order=${byAppoinment}`,
        getHeaders
      )
      .then((res) => {
        console.log(res);
        setApoinments((prev) => [...prev, ...res.data.results]);
        setAppoinmentCount(res.data.count);
        setNext(res.data.next);
        setLoading(false);
      }).catch((err)=>{
        if (err?.response.status==401) {
          logoutUser()
          
        }
        errorOccured()
      });
  }, [delRefresh]);

  const handleChange = (e) => {
    setQholder(e.target.value);
  };
  const handleSubmit = (e) => {
    if (e.key == "Enter") {
      setApoinments([]);
      setPageNumber(1);
      setQ(qholder);
      setDelRefresh((prev) => !prev);
    }
  };
  const onSubmitDate = (e, n) => {
    if (n) {
      setApoinments([]);

      setFrom(e);
      setPageNumber(1);
      setDelRefresh((prev) => !prev);
    } else {
      setApoinments([]);
      setTo(e);
      setPageNumber(1);
      setDelRefresh((prev) => !prev);
    }
  };
  const onSubmitOrder = () => {
    setByAppoinment((prev) => !prev);
    setPageNumber(1);
    setApoinments([]);
    setDelRefresh((prev) => !prev);
  };
  if (loading) {
    return <Loading />;
  }
  const confirmDelete = () => {
    axios
      .delete(
        `/api/appoinment/${deleteContent.id}/`,
        getHeaders
      )
      .then((res) => {
        Deleted();
        setApoinments([]);

        setDelRefresh((prev) => !prev);
        setDeleteContent((prev) => {
          return { ...prev, id: "", visibility: false };
        });
      })
      .catch((err)=>{
        if (err?.response.status==401) {
          logoutUser()
          
        }
        errorOccured()
      });
  };

  return (
    <div>
      <div class="view__control__header">
        <div class="add__new__button">
          <button onClick={() => navigate("/create-appoinment")}>
            {" "}
            <i class="fa-sharp fa-solid fa-plus"></i>&nbsp; New
          </button>
        </div>
        <div class="controls">
          <div class="by__depature">
            <p class="nowrap">By Appoinment &nbsp;</p>

            <input onChange={onSubmitOrder} type="checkbox" id="switch" />
            <label for="switch">Toggle</label>
          </div>

          <div class="date__picker">
            <p>From </p>

            <input
              type="date"
              name=""
              id="from"
              defaultValue={from}
              onChange={(e) => onSubmitDate(e.target.value, true)}
            ></input>
          </div>
          <div class="date__picker">
            <p>To</p>

            <input
              type="date"
              name=""
              onChange={(e) => onSubmitDate(e.target.value, false)}
              defaultValue={to}
              id="To"
            ></input>
          </div>
        </div>
        <div class="control__search">
          <input
            type="text"
            placeholder="Search..."
            onChange={handleChange}
            onKeyPress={handleSubmit}
          ></input>
        </div>
      </div>
      <div class="informations">
        <div class="depatures tickets">
          <div class="app__dep__header">
            <i class="fa-solid fa-plane-departure"></i> &nbsp; &nbsp;
            <h3>APPOINMENTS</h3> <span class="total">{appoinmentCount}</span>
          </div>

          {appoinments.length == 0 ? (
            <div class="no_data_error">
              <img src={panda2} />
              <h2>Empty Appoinments....!! </h2>
            </div>
          ) : (
            <div className="information__flex__container">
              <div class="information__flex">
                {appoinments?.map((appoinment) => {
                  return (
                    <Appoinment
                      setInvoiceContent={setInvoiceContent}
                      data={appoinment}
                      setAppoinmentEnlarger={setAppoinmentEnlarger}
                      setDeleteContent={setDeleteContent}
                    />
                  );
                })}
              </div>
            </div>
          )}

          {next && (
            <div class="more" onClick={() => setPageNumber((prev) => prev + 1)}>
              Load More
            </div>
          )}
        </div>
        <AppoinmentEnlarged
          setInvoiceContent={setInvoiceContent}
          data={appoinmentEnlarger}
          setAnnexContent={setAnnexContent}
          setDeleteContent={setDeleteContent}
        />
      </div>
      {deleteContent.visibility && (
        <div className="pop__container">
          <DeleteModelForm
            setDeleteContent={setDeleteContent}
            deleteContent={deleteContent}
            confirmDelete={confirmDelete}
          />
        </div>
      )}
      {annexContent.visibility && (
        <div className="pop__container">
          {annexContent.formState == "form" ? (
            <AnnexForm
              setAnnexContent={setAnnexContent}
              annexContent={annexContent}
              appoinmentEnlarger={appoinmentEnlarger}
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

export default Appoinments;
