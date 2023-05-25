import React, { useEffect } from 'react'
import { useAppDispatch, useAppSelector } from '../redux/hook'
import { Button, Table } from 'antd'
import { GetPostsResponseItem } from '../apis/post'
import { ColumnsType } from 'antd/es/table'
import { getPosts } from '../redux/slice/postsSlice'

const columns: ColumnsType<GetPostsResponseItem> = [
    {
        title: 'title',
        dataIndex: 'title',
        width: "20%"
    },
    {
        title: 'content',
        dataIndex: 'content',
        width: "70%"
    },
    {
        title: 'likes',
        dataIndex: 'count_likes',
        render:(value, record, index) => <Button>{value}</Button>,
        width: "10%"
    }
]

export const Home: React.FC = () => {
    const { items, loading, count } =
        useAppSelector(state => state.post)
    const dispatch = useAppDispatch()

    useEffect(() => {
        if (!count) {
            dispatch(getPosts({}))
        }
    }, [])
    return (
        <>
            <Button style={{margin: '10px'}} onClick={() => dispatch(getPosts({}))}>Reload</Button>
            <Table<GetPostsResponseItem> loading={loading} dataSource={items} columns={columns} />
        </>
    )
}
