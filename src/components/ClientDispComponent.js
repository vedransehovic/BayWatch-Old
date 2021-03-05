//this is part of ClientDisplayPage.js
import React from "react";
import styled from "styled-components";

const ClientDispHeader = () => {
  return (
    <Container>
      <Header>
        <h1>Abel Logo Will Go Here</h1>
      </Header>
      <Line></Line>
      <Main>
        <h1>Main Content Goes Here</h1>
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
  height: 60vh;
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
