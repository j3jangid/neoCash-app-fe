// import { useEffect } from "react";
import { useGlobalContext } from "./config/globalContext";
import Layout from "./pages/Layout";
import Login from "./pages/Login";
// import axios from "axios";
// import { useLocation } from "react-router-dom";


function App() {
  const { login } = useGlobalContext()

  // useEffect(() => {
  //   axios.get("https://api.ipify.org?format=json")
  //     .then(response => {
  //       console.log(response.data.ip);
  //     })
  //     .catch(error => {
  //       console.error("Error fetching IP:", error);
  //     });
  // }, [])


  return (
    <div>
      {
        login ?
          <Layout />
          :
          <Login />
      }
    </div>
  );
}

export default App;
