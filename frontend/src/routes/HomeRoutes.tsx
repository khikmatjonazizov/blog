import React, { useEffect } from 'react'
import { Route, Routes, useNavigate } from 'react-router-dom'
import { NavBar } from "../components";
import { Home } from "../screens/Home";
import { Cabinet } from "../screens/Cabinet";
import { useAppSelector } from '../redux/hook'
import { NewPost } from '../screens/NewPost'
import { Users } from '../screens/Users'

export const HomeRoutes: React.FC = () => {
    const { isAllowedUser } = useAppSelector(state => state.user)
    const nav = useNavigate()
    useEffect(() => {
        if(!isAllowedUser) {
            nav('/')
        }
    }, [nav, isAllowedUser])
    return (
        <>
            <NavBar />
            <Routes>
                <Route path="/home" element={<Home />}/>
                <Route path="/cabinet" element={<Cabinet />}/>
                <Route path="/newPost" element={<NewPost />}/>
                <Route path="/users" element={<Users />}/>
            </Routes>
        </>
    )
}
