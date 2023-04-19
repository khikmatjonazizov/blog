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
        }
    ]
    return (
        <Menu mode="horizontal" items={items} defaultSelectedKeys={['posts']} />
    )
}
