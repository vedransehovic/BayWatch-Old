//This is a client display page. This will run on a Rental's plasma in the Rental lobby and will just rotate names or present productions.
import React from "react";
//import components
import ClientDispHeader from "../components/ClientDispHeader";
import ClientDispMain from "../components/ClientDispMain";
import ClientDispFooter from "../components/ClientDispFooter";

const ClientDisplayPage = () => {
  return (
    <div>
      <ClientDispHeader />
      <ClientDispMain />
      <ClientDispFooter />
    </div>
  );
};

export default ClientDisplayPage;
