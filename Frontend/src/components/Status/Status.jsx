import React, { useState, useEffect, useCallback } from "react";
import domain from "../../Domain/Domain";
import axios from "axios";
import os from "os-browserify";

export default function Status() {
  const [statusData, setStatusData] = useState("");
  const [statusCode, setStatusCode] = useState("");
  const [url, setUrl] = useState("http://"+process.env.REACT_APP_API_URL);

  const getStatus = useCallback(async () => {

    await axios
      .get(url+ "/status")
      .then((response) => {
        console.log(response)
        setStatusData(response.data);
        setStatusCode(response.status);
      })
      .catch((err) => {
        console.log(err);
        setStatusData("Fail");
        setStatusCode(response.status);
      });
  }, []);

  useEffect(() => {
    getStatus();
  }, [getStatus]);

  return (
    <div className="container">
      <h2 style={{"textAlign":"center"}}>Status code: {statusCode}</h2>
      <h3 style={{"textAlign":"center"}}>Status: {statusData.status}</h3>
    </div>
  );
}
