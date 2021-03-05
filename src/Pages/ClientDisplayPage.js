//This is a client display page. This will run on a Rental's plasma in the Rental lobby and will just rotate names or present productions.
import React from "react";
import styled from "styled-components";
//import components
import ClientDispComponent from "../components/ClientDispComponent";

const ClientDisplayPage = () => {
  const clientsPresent = ["Netflix", "Golden Globe Awards", "SNL"];

  return (
    <div>
      <ClientDispComponent dispArray={clientsPresent} />
    </div>
  );
};

export default ClientDisplayPage;
