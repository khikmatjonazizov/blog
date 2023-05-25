import React, { useState } from 'react'
import { Modal, Radio } from 'antd'
import { useAppDispatch, useAppSelector } from '../../redux/hook'
import { CabinetModalListItem, CabinetModalListOfAvatars } from './CabinetStyled'
import { updateUserOnState } from '../../redux/slice/userSlice'

type CabinetModalProps = {
    isOpen: boolean;
    setIsOpen: React.Dispatch<React.SetStateAction<boolean>>
}
export const CabinetModal: React.FC<CabinetModalProps> = (props) => {
    const { isOpen, setIsOpen } = props
    const { data, avatars } = useAppSelector(state => state.user)
    const [userAvatarCode, setUserAvatarCode] = useState<number | null>(data.avatar_code)
    const dispatch = useAppDispatch()

    const onCancel = () => {
        setIsOpen(false)
        dispatch(updateUserOnState({...data, avatar_code: null}))
        setUserAvatarCode(null)
    }

    const onOK = () => {
        dispatch(updateUserOnState({...data, avatar_code: userAvatarCode}))
        setIsOpen(false)
    }

    return (
        <Modal visible={isOpen} onCancel={onCancel} onOk={onOK}>
            <Radio.Group onChange={({ target }) => setUserAvatarCode(target.value)} value={userAvatarCode}>
                <CabinetModalListOfAvatars>
                    {
                        avatars.map((avatar, idx) =>
                            <Radio key={avatar} value={idx} className='avatar-radio'>
                                <CabinetModalListItem img={avatar} />
                            </Radio>,
                        )
                    }
                </CabinetModalListOfAvatars>
            </Radio.Group>
        </Modal>
    )
}