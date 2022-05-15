import logo from "./logo.svg";
import "./App.css";
import MainPage from "./javascript/components/MainPage";
import Login from "./javascript/components/LoginPage";
import Logout from "./javascript/components/LogoutButton";
import { useEffect } from "react";
import { gapi } from "gapi-script";
import { Link } from "react-router-dom";

function App() {
  useEffect(() => {
    function start() {
      gapi.client.init({
        clientId: process.env.REACT_GOOGLE_CLIENT_ID,
        scope: "",
      });
    }

    gapi.load("client:auth2", start);
  });

  return (
    <div className="App">
      <MainPage></MainPage>
    </div>
  );
}

export default App;
