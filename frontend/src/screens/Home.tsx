import React, {useEffect} from "react";
import {useAppDispatch, useAppSelector} from "../redux/hook";
import { Table } from "antd";
import {GetPostsResponseItem} from "../apis/post";
import {ColumnsType} from "antd/es/table";
import {getPosts} from "../redux/slice/postsSlice";

const columns:  ColumnsType<GetPostsResponseItem> = [
    {
        title: 'title',
        dataIndex: 'title'
    },
    {
        title: 'content',
        dataIndex: 'content'
    },
]

export const Home: React.FC = () => {
    const { items, loading , count} =
        useAppSelector(state => state.post)
    const dispatch = useAppDispatch();

    useEffect(() => {
        if(!count) {
            dispatch(getPosts({}))
        }
    }, [])
    return (
        <>
            <Table<GetPostsResponseItem> loading={loading} dataSource={items} columns={columns} />
        </>
    )
}
