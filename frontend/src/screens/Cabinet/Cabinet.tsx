import React, { useMemo, useState } from 'react'
import { useAppDispatch, useAppSelector } from '../../redux/hook'
import { CabinetStyled, CabinetStyledAvatar, CabinetStyledBox } from './CabinetStyled'
import { Button, Input } from 'antd'
import { CabinetModal } from './CabinetModal'
import { updateUser } from '../../redux/slice/userSlice'

export const Cabinet: React.FC = () => {
    const user = useAppSelector(state => state.user)
    const {
        avatars,
        data: {
            avatar_code,
        },
    } = user
    const dispatch = useAppDispatch()

    const onChange = (
        e: React.ChangeEvent<HTMLInputElement>,
        key: 'username' | 'name' | 'surname',
    ) => {
        const value = e.target.value
        switch (key) {
            case 'name':
                setUserData(prev => ({ ...prev, name: value }))
                break
            case 'surname':
                setUserData(prev => ({ ...prev, surname: value }))
                break
            case 'username':
                setUserData(prev => ({ ...prev, username: value }))
                break
        }
    }
    const [userData, setUserData] = useState(user.data)

    const isDisabled = useMemo(() => {
        return !(userData.name?.trim() && userData.surname?.trim() && userData.username?.trim())
    }, [userData])

    const [isOpen, setIsOpen] = useState(false)

    const onSave = () => {
        dispatch(updateUser({
            body: {
                id: userData.id || 1,
                name: userData.name || '',
                surname: userData.surname || '',
                avatar_code: user.data.avatar_code,
            },
        }))
    }

    return (
        <CabinetStyled>
            <CabinetStyledAvatar avatars={avatars} avatar_code={avatar_code} onClick={() => setIsOpen(true)} />
            <CabinetStyledBox>
                <Input
                    value={userData.name}
                    onChange={(e) => onChange(e, 'name')}
                    placeholder='name'
                />
                <Input
                    value={userData.surname}
                    onChange={(e) => onChange(e, 'surname')}
                    placeholder='surname'
                />
            </CabinetStyledBox>
            <Button disabled={isDisabled} type='primary' onClick={onSave}>Save</Button>
            <CabinetModal isOpen={isOpen} setIsOpen={setIsOpen} />
        </CabinetStyled>
    )
}
