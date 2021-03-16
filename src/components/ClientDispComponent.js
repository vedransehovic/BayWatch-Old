//this is part of ClientDisplayPage.js
import React from "react";
import styled from "styled-components";
import Logo from "../images/Abel_logo.png";

const ClientDispHeader = (props) => {
  return (
    <Container>
      <Header>
        <img src={Logo} alt="Logo" class="logo" />
      </Header>
      <Line></Line>
      <Main>
        <ul>
          {props.dispArray.map((client) => (
            <li>{client}</li>
          ))}
        </ul>
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
