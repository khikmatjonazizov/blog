import React from "react";
import { Route, Routes } from "react-router-dom";
import { NavBar } from "../components";
import { Home } from "../screens/Home";
import { Cabinet } from "../screens/Cabinet";

export const HomeRoutes: React.FC = () => {
    return (
        <>
            <NavBar />
            <Routes>
                <Route path="/home" element={<Home />}/>
                <Route path="/cabinet" element={<Cabinet />}/>
            </Routes>
        </>
    )
}
