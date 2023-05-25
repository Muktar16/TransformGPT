import { useEffect, useState } from "react";
import { getToken } from "../../utils/CommonServices";
import { useNavigate } from "react-router";
// import axios from "axios";
import { Button, message } from "antd";
import Login from "../SignIn/SignIn";


const Home = () => {
    const [isVerifiedToken,setIsVerifiedToken] = useState(true);
    const navigate = useNavigate();

  useEffect(()=>{
    const isLoggedIn = async()=>{
      try {
        const token = getToken();
        if(!token){
          setIsVerifiedToken(false);
        }else {
          //await axios.get(`${process.env.REACT_APP_API_URL}/auth/verify-token`, { headers: { Authorization: `Bearer ${token}` } });
          setIsVerifiedToken(true);
        }
      } catch (error) {
         message.error("Login session Expired. Please login again.");
         localStorage.removeItem('token');
          sessionStorage.removeItem('token');
         setIsVerifiedToken(false);
      }
    }
    isLoggedIn();
  },[]);

    if(isVerifiedToken){
        return(<><Button onClick={()=>{localStorage.removeItem('token');sessionStorage.removeItem('token');window.location.reload()}}>Log out</Button></>)
    }
    else{
        navigate('/signin');
    }
}

export default Home;