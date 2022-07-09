import React, { useState, useEffect, useCallback } from "react";
import domain from "../../Domain/Domain";
import axios from "axios";

export default function Status() {
  const [statusData, setStatusData] = useState("");
  const [statusCode, setStatusCode] = useState("");

  const getStatus = useCallback(async () => {
    await axios
      .get(domain + "status")
      .then((response) => {
        setStatusData(response.data);
        setStatusCode(response.status);
      })
      .catch((err) => {
        console.log(err);
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
