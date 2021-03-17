//This is a client display page. This will run on a Rental's plasma in the Rental lobby and will just rotate names or present productions.
import React, { useState, useEffect } from "react";
import styled from "styled-components";
import Logo from "../images/Abel_logo.png";

const ClientDispHeader = () => {
  const [client, setClient] = useState("client");

  return (
    <Container>
      <Header>
        <img src={Logo} alt="Logo" class="logo" />
      </Header>
      <Line></Line>
      <Main>
        <div>
          <h1>{client}</h1>
        </div>
      </Main>
      <Line></Line>
      <Footer>
        <h1>Footer Goes Here</h1>
      </Footer>
    </Container>
  );
};

//styling

const Container = styled.div`
  border: 3px solid white;
  display: flex;
  height: 100vh;
  flex-direction: column;
`;

const Header = styled.div`
  display: flex;
  height: 100%;
  align-items: center;
  padding-left: 5rem;
  // border: 2px solid yellow;
`;
const Main = styled.div`
  display: flex;
  height: 50vh;
  text-align: center;
  h1 {
    font-size: 9rem;
    font-family: "Faster One", cursive;
    color: yellow;
  }
  //  border: 2px solid red;
`;
const Footer = styled.div`
  display: flex;
  height: 100%;
  padding-left: 5rem;
  //  border: 2px solid cyan;
`;

const Line = styled.div`
  height: 1.5%;
  background: #900;
  width: 100%;
`;

export default ClientDispHeader;
