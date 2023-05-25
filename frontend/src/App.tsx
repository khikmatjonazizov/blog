import React from 'react';
import { Route, Routes } from "react-router-dom";
import { Login } from "./screens/Login";
import styled, { createGlobalStyle } from "styled-components";
import { Provider } from "react-redux";
import { store } from "./redux";
import { HomeRoutes } from "./routes/HomeRoutes";

const GlobalStyles = createGlobalStyle`
  html {
    height: 100%;
  }

  body {
    height: 100%;
    margin: 0;
    padding: 0;
  }

  #root {
    height: 100%;
  }
`;

const AppContainer = styled.div`
  max-width: 1100px;
  padding: 0 10px;
  margin: 0 auto;
  height: 100%;
`

const App = () => {
    return (
        <AppContainer>
            <Provider store={store}>
                <GlobalStyles/>
                <Routes>
                    <Route path="/" element={<Login/>}/>
                    <Route path="*" element={<HomeRoutes />}/>
                </Routes>
            </Provider>
        </AppContainer>
    );
}

export default App;
