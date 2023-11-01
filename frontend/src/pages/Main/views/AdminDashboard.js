import React, { useContext, useEffect, useState } from "react";
import QuatityPanel from "../../../components/adminDashboard/QuatityPanel";
import Barchart from "../../../components/adminDashboard/Barchart";
import AgencyPanel from "../../../components/adminDashboard/AgencyPanel";
import DoughnutChart from "../../../components/adminDashboard/DoughnutChart";
import ProfitPanel from "../../../components/adminDashboard/ProfitPanel";
import AuthContext from "../../../context/AuthContext";
import { errorOccured, updated } from "../../../utlties/Toastes";
import axios from "axios";

const AdminDashboard = () => {
  const { domain, getHeaders } = useContext(AuthContext);
  const [ConfirmDate, setConfirmDate] = useState(new Date());
  const [full__or__one, setFull__or__one] = useState(false);
  const [quantityData, setQuantityData] = useState({});
  const [profitData, setProfitData] = useState({});
  const [agencyPayments,setAgencyPayment]=useState([])

  useEffect(() => {
    axios
      .get(`${domain}/api/get-agency-payment`, getHeaders)
      .then((res) => {
        setAgencyPayment(res.data)
      })
      .catch((err) => {
        errorOccured();
      });
  }, []);

  useEffect(() => {
    axios
      .get(
        `${domain}/api/get-quantity-panel?month=${
          ConfirmDate.getMonth() + 1
        }&year=${ConfirmDate.getFullYear()}&full=${full__or__one}`,
        getHeaders
      )
      .then((res) => {
        setQuantityData(res.data);
      })
      .catch((err) => {
        errorOccured();
      });

    axios
      .get(
        `${domain}/api/get-profit-panel?month=${
          ConfirmDate.getMonth() + 1
        }&year=${ConfirmDate.getFullYear()}&full=${full__or__one}`,
        getHeaders
      )
      .then((res) => {
        setProfitData(res.data);
      })
      .catch((err) => {
        errorOccured();
      });
  }, [ConfirmDate, full__or__one]);
  return (
    <div className="admin__dashboard">
      <QuatityPanel
        ConfirmDate={ConfirmDate}
        full__or__one={full__or__one}
        quantityData={quantityData}
      />
      <Barchart
        full__or__one={full__or__one}
        ConfirmDate={ConfirmDate}
        setFull__or__one={setFull__or__one}
        setConfirmDate={setConfirmDate}
      />
      <AgencyPanel 
        agencyPayments={agencyPayments}
        
      />
      <DoughnutChart
        ConfirmDate={ConfirmDate}
        full__or__one={full__or__one}
        quantityData={quantityData}
      />
      <ProfitPanel profitData={profitData} />

      <div
        className="agency__pop__upper"
        onClick={() => {
          let agncyList = document.getElementById("agencyList");
          agncyList.style.display = "block";
        }}
      >
        <i class="fa-solid fa-building-columns"></i>
      </div>
    </div>
  );
};

export default AdminDashboard;
