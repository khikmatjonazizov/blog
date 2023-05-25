import React, { useMemo, useState } from 'react'
import { NewPostStyled } from './NewPostStyled'
import { Button, Input } from 'antd'
import { useAppDispatch, useAppSelector } from '../../redux/hook'
import { createPost } from '../../redux/slice/postsSlice'
import { useNavigate } from 'react-router-dom'

export const NewPost: React.FC = (props) => {
    const [post, setPost] = useState({
        title: '',
        content: '',
    })
    const { data: { id } } = useAppSelector(state => state.user)
    const dispatch = useAppDispatch()
    const nav = useNavigate()

    const isDisabled = useMemo(() => {
        return !(post.title.trim() && post.content.trim())
    }, [post])

    const onSave = () => {
        nav('/home')
        dispatch(createPost({
            body: {
                user_id: id || 1,
                title: post.title,
                content: post.content
            },
        }))
    }

    const onChange = (e: any, key: 'title' | 'content') => {
        const value = e.target.value
        if (key === 'content') {
            setPost(prevState => ({ ...prevState, content: value }))
        } else {
            setPost(prevState => ({ ...prevState, title: value }))
        }
    }
    return (
        <NewPostStyled>
            <Input
                placeholder='title'
                value={post.title}
                onChange={(e) => onChange(e, 'title')}
            />
            <Input.TextArea
                placeholder='content'
                value={post.content}
                onChange={(e) => onChange(e, 'content')}
            />
            <Button type='primary' disabled={isDisabled} onClick={onSave}>Post</Button>
        </NewPostStyled>
    )
}