import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import PrivateRoute from "./utlties/PrivateRoute";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import Main from "./pages/Main";
import AuthContext, { AuthProvider } from "./context/AuthContext";
import { useContext } from "react";



import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import CreateAppoinment from "./pages/Main/forms/CreateAppoinment";
import AddTicket from "./pages/Main/forms/AddTicket";
import AddVisaStambing from "./pages/Main/forms/AddVisaStambing";
import AddAgency from "./pages/Main/forms/AddAgency";
import AddTransaction from "./pages/Main/forms/AddTransaction";
import AddAttastation from "./pages/Main/forms/AddAttastation";
import SellTicket from "./pages/Main/forms/Sell-Ticket";
import TicketRequest from "./pages/Main/forms/TicketRequest";
import Dashboard from "./pages/Main/views/Dashboard";
import Appoinments from "./pages/Main/views/Appoinments";
import Tickets from "./pages/Main/views/Tickets";
import Visas from "./pages/Main/views/Visas";
import TicketRequests from "./pages/Main/views/TicketRequests";
import TicketMarket from "./pages/Main/views/TicketMarket";
import Transactions from "./pages/Main/views/Transactions";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import Attastaions from "./pages/Main/views/Attastations";
import UpdateAttastation from "./pages/Main/updates/Attastation/UpdateAttastation";
import UpdateAppoinment from "./pages/Main/updates/appoinments/UpdateAppoinment";
import UpdateVisa from "./pages/Main/updates/visa/UpdateVisa";
import UpdateTicket from "./pages/Main/updates/ticket/UpdateTicket";
import UpdateTransacton from "./pages/Main/updates/transaction/UpdateTransacton";
import UpdateTicketRequest from "./pages/Main/updates/ticket-requesets/UpdateTicketRequest";
import NotFound from "./pages/NotFound";
import UpdateSellTicket from "./pages/Main/updates/sell-ticket/UpdateSellTicket";
import UpdateAgency from "./pages/Main/updates/agency/UpdateAgency";
import SmartTools from "./pages/Main/views/SmartTools";
const queryClient=new QueryClient()

function App() {
  return (

    <Router>
      <AuthProvider>
      <QueryClientProvider client={queryClient}>
        <ToastContainer
          position="top-right"
          autoClose={3000}
          hideProgressBar={false}
          newestOnTop
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="light"
        />
        <div className="App">
          <Routes>
            <Route element={<PrivateRoute />}>
              <Route path="/" element={<Main />}>
               <Route path="" element={<Dashboard/>}/>
               <Route path="/create-appoinment" element={<CreateAppoinment/>}/>
               <Route path="/create-ticket" element={<AddTicket/>}/>
               <Route path="/create-visastambing" element={<AddVisaStambing/>}/>
               <Route path="/create-agency" element={<AddAgency/>}/>
               <Route path="/create-transaction" element={<AddTransaction/>}/>
               <Route path="/sell-ticket" element={<SellTicket/>}/>
               <Route path="/create-attastation" element={<AddAttastation/>}/>
               <Route path="/create-ticket-request" element={<TicketRequest/>}/>
               <Route path="/appoinments" element={<Appoinments/>}/>
               <Route path="/tickets" element={<Tickets/>}/>
               <Route path="/visas" element={<Visas/>}/>
               <Route path="/ticket-requests" element={<TicketRequests/>}/>
               <Route path="/ticket-market" element={<TicketMarket/>}/>
               <Route path="/transactions" element={<Transactions/>}/>
               <Route path="/attastations" element={<Attastaions/>}/>
               <Route path="/update-attastation/:id" element={<UpdateAttastation/>}/>
               <Route path="/update-appoinment/:id" element={<UpdateAppoinment/>}/>
               <Route path="/update-visa/:id" element={<UpdateVisa/>}/>
               <Route path="/update-ticket/:id" element={<UpdateTicket/>}/>
               <Route path="/update-transaction/:id" element={<UpdateTransacton/>}/>
               <Route path="/update-ticket-on-sale/:id" element={<UpdateSellTicket/>}/>
               <Route path="/update-agency" element={<UpdateAgency/>}/>
               <Route path="/smart-tools" element={<SmartTools/>}/>

               <Route path="/update-ticket-request/:id" element={<UpdateTicketRequest/>}/>
              
              </Route>
            </Route>
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="*" element={<NotFound/>}/>
          </Routes>

        </div>
        </QueryClientProvider>
      </AuthProvider>
      
    </Router>

  );
}

export default App;
