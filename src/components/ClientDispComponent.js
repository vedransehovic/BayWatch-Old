import React, { useState } from "react";
const ClientDisp = (props) => {
  const [client, setClient] = useState(props.clientList);
  return (
    <div>
      <h1>{client}</h1>
    </div>
  );
};

export default ClientDisp;
