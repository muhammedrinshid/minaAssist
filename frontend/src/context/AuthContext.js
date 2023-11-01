import React, {
  Children,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";
import axios from "axios";
import jwtDecode from "jwt-decode";
import { Navigate, useNavigate } from "react-router-dom";
import { errorOccured } from "../utlties/Toastes";
const AuthContext = createContext();
export const AuthProvider = ({ children }) => {
  const [agencies,setAgencies]=useState()

  const [authTocken, setAuthTocken] = useState(() =>
    localStorage.getItem("authTokens")
      ? JSON.parse(localStorage.getItem("authTokens"))
      : null
  );

  const [user, setUser] = useState(() =>
    localStorage.getItem("authTokens") ? jwtDecode(authTocken.access) : null
  );
  function tConvert (time) {
    // Check correct time format and split into components
    time = time.toString ().match (/^([01]\d|2[0-3])(:)([0-5]\d)(:[0-5]\d)?$/) || [time];
  
    if (time.length > 1) { // If time format correct
      time = time.slice (1);  // Remove full string match value
      time[5] = +time[0] < 12 ? 'AM' : 'PM'; // Set AM/PM
      time[0] = +time[0] % 12 || 12; // Adjust hours
    }
    return time.join (''); // return adjusted time or original string
  }
  
  
const domainname=window.location.hostname
const Domain=""

  const [loading, setLoading] = useState(true);
  useEffect(() => {
    if (loading) {
      if (authTocken) {
        updateTocken();
      }
    }
    let intervalid = setInterval(() => {
      if (authTocken) {
        updateTocken();
      }
    }, 1000 * 60 * 14);
    return () => {
      clearInterval(intervalid);
    };
  }, [authTocken, loading]);
  let getAgencies=()=>{
    axios.get(`${Domain}/api/get-agencies/`, {
      headers:{
        'Content-Type':'application/json',
        'Authorization':'Bearer '+String(authTocken?.access)
      }
      
    }).then((res)=>{
      setAgencies(res.data)
    }).catch(error=>errorOccured)
    
  }

  let logoutUser = () => {
    setUser(null);
    setAuthTocken(null);
    localStorage.removeItem("authTokens");
  };

  let updateTocken = async () => {

    axios
      .post(`${Domain}/api/token/refresh/`, {
        refresh: authTocken.refresh,
      })
      .then((res) => {
        if (res.status == 200) {
          setAuthTocken(()=>res.data);
          setUser(jwtDecode(res.data?.access));
          localStorage.setItem("authTokens", JSON.stringify(res.data));
        }
      })
      .catch((error) => {
        if (error.response) {
          logoutUser();
        }
      });
    if (loading) {
      setLoading(false);
    }
  };

  let contextData = {
    setUser: setUser,
    user: user,
    updateTocken:updateTocken,
    logoutUser: logoutUser,
    setAuthTocken: setAuthTocken,
    authTocken: authTocken,
    headers:{
      'Content-Type':'application/json',
      'Authorization':'Bearer '+String(authTocken?.access)
    },
    fileUploadHeaders:{
      headers:{
        "Content-Type":"multipart/form-data",
        'Authorization':'Bearer '+String(authTocken?.access)
      }
    
    },
    getHeaders:{
      headers:{
        'Authorization':'Bearer '+String(authTocken?.access)


      }
    
    },
    getAgencies:getAgencies,
    agencies:agencies,
    tConvert:tConvert,
    domainName:domainname,
    domain:Domain,
    

  };
  return (
    <AuthContext.Provider  value={contextData}>{children}</AuthContext.Provider>
  );
};

export default AuthContext;
