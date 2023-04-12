import React from 'react';
import { Route, Routes } from "react-router-dom";
import { Login } from "./screens/Login";
import styled from "styled-components";

const AppContainer = styled.div`
  max-width: 1100px;
  padding: 0 10px;
  margin: 0 auto;
`

function App() {
    return (
        <AppContainer>
            <Routes>
                <Route path="/" element={<Login />} />
            </Routes>
        </AppContainer>
    );
}

export default App;
