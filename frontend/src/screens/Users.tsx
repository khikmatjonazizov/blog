import React, { useEffect, useState } from 'react'
import { ColumnsType } from 'antd/es/table'
import { Button, Table } from 'antd'
import { useAppSelector } from '../redux/hook'
import Apis from '../apis'
import { GetUsersResponseItem } from '../apis/user'
import { CabinetModalListItem } from './Cabinet/CabinetStyled'

export const Users: React.FC = () => {
    const { avatars } = useAppSelector(state => state.user)
    const columns: ColumnsType<GetUsersResponseItem> = [
        {
            title: 'fullName',
            width: "20%",
            render: (value, record, index) => `${record.name} ${record.surname}`
        },
        {
            title: 'username',
            dataIndex: 'username',
            width: "70%"
        },
        {
            title: 'avatar',
            dataIndex: 'avatar_code',
            render:(value, record, index) => <CabinetModalListItem img={avatars[value]} />,
            width: "10%"
        }
    ]
    const [users, setUsers] = useState<{
        loading: boolean;
        items: GetUsersResponseItem[],
        count: number;
    }>({
        loading: false,
        items: [],
        count: 0,
    })

    const getUsers = async () => {
        setUsers(prevState => ({...prevState, loading: true}))
        const { data } = await Apis.user.getUsers();
        setUsers({ loading: false, items: data.items, count: data.count })
    }

    useEffect(() => {
        getUsers()
    }, [])
    return (
        <>
            <Button style={{margin: '10px'}} onClick={() => getUsers()}>Reload</Button>
            <Table<GetUsersResponseItem> loading={users.loading} dataSource={users.items} columns={columns} />
        </>
    )
}
