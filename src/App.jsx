import React, { useState } from "react";
import styled from "styled-components";

import ChatBot from "./components/ChatBot";
import NavBar from "./components/NavBar/NavBar";
import { GlobalStyle } from "./components/GlobalStyle/GlobalStyle";
import Hero from "./components/Hero/Hero";

const AppContainer = styled.div`
  height: 100vh;
  display: flex;
  flex-direction: column;
  background-color: #222222;
  justify-content: center;
  align-items: center;
`;

function App() {
  return (
    <AppContainer>
      <GlobalStyle />

      <Hero />
    </AppContainer>
  );
}

export default App;
