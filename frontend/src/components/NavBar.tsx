import React from "react";
import { Menu } from "antd";
import type { MenuProps } from 'antd';
import styled from "styled-components";
import { NavLink } from "react-router-dom";

export const NavBar: React.FC = () => {
    const items: MenuProps['items'] = [
        {
            label: <NavLink to="/home">Posts</NavLink>,
            key: 'posts',
        },
        {
            label: <NavLink to="/cabinet">Cabinet</NavLink>,
            key: 'cabinet'
        },
        {
            label: <NavLink to="/newPost">New post</NavLink>,
            key: 'newPost'
        },
        {
            label: <NavLink to="/users">Users</NavLink>,
            key: 'users'
        },
    ]
    return (
        <Menu mode="horizontal" items={items} defaultSelectedKeys={['posts']} />
    )
}
