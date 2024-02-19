import React, { useState, useEffect } from "react";
import styled from "styled-components";
import Example from "./Example";
import Instructions from "./Instructions";

const Container = styled.div`
  width: 90vw;
  margin: auto;
  padding: 5%;
`;

const Title = styled.h1`
  color: #76b852;
`;

const Inner = styled.div`
  z-index: 1;
  padding: 45px;
  background: white;
  position: relative;
  margin: 0 auto 100px;
  box-shadow: 0 0 20px 0 rgba(0, 0, 0, 0.2), 0 5px 5px 0 rgba(0, 0, 0, 0.24);
`;

const App: React.FC = () => {
  const [isEnabled, setIsEnabled] = useState(false);

  useEffect(() => {
    if (typeof window.FaceDetector === "undefined") {
      return;
    }

    setIsEnabled(true);
  }, []);

  return (
    <Container>
      <Inner>
        <Title>Chrome FaceDetector API</Title>
        {!isEnabled ? <Instructions /> : <Example />}
      </Inner>
    </Container>
  );
};

export default App;
