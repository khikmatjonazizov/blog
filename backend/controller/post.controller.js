import db from '../db.js'
import { personExistenceCheck, sendBadRequest } from '../utils.js'

export const postExistenceCheck = async (key, checker) => {
    let post
    if (key === 'id') {
        post =
            await db.query(`SELECT * FROM post WHERE id = $1`, [checker])
    } else if (key === 'user_id') {
        post =
            await db.query(`SELECT * FROM post WHERE user_id = $1`, [checker])
    }

    return post.length !== 0
}

const createPost = async (req, res) => {
    const body = req.body
    if (body.hasOwnProperty('title') && body.hasOwnProperty('content') && body.hasOwnProperty('user_id')) {
        const { title, content, user_id } = body
        const newPost = await db.query(`INSERT INTO post (title, content, user_id) values ($1, $2, $3) RETURNING *`, [title, content, user_id])
        newPost[0].count_likes = 0
        res.json(newPost[0])
        return
    }

    sendBadRequest(res)
}

const updatePost = async (req, res) => {
    const body = req.body
    if (body.hasOwnProperty('title') && body.hasOwnProperty('content') && body.hasOwnProperty('id')) {
        const { id, title, content } = body
        const isPostExist = await postExistenceCheck('id', id)
        if (isPostExist) {
            const post = await db.query(`UPDATE post set title = $1, post = $2 where id = $3 RETURNING *`, [title, content, id])
            res.json(post[0])
            return
        }
    }

    sendBadRequest(res)
}
const deletePost = async (req, res) => {
    const id = req.params.id
    const isPostExist = await postExistenceCheck('id', id)
    if (isPostExist) {
        await db.query(`DELETE FROM post WHERE id = $1 RETURNING *`, [id])
        return
    }

    sendBadRequest(res)
}
const getPosts = async (req, res) => {
    const user_id = req.query.user_id
    let posts
    const isPersonExist = await personExistenceCheck('id', user_id)
    if (user_id) {
        if (isPersonExist) {
            posts =
                await db.query(`SELECT p.id, p.title, p.content, p.user_id, COUNT(l.post_id) AS count_likes from post AS p LEFT JOIN post_like AS l ON p.id = l.post_id WHERE p.user_id = $1 GROUP BY p.id;`, [user_id])
        } else {
            sendBadRequest(res)
            return
        }
    } else {
        posts =
            await db.query('SELECT p.id, p.title, p.content, p.user_id, COUNT(l.post_id) AS count_likes from post AS p LEFT JOIN post_like AS l ON p.id = l.post_id GROUP BY p.id;')
    }

    res.json({
        items: posts.map(post => ({ ...post, count_likes: +post.count_likes })), count: posts.length,
    })
}

const getOnePost = async (req, res) => {
    const id = req.params.id
    if (id) {
        const post = await db.query(`SELECT p.id, p.title, p.content, p.user_id, COUNT(l.post_id) AS count_likes from post AS p LEFT JOIN post_like AS l ON p.id = l.post_id WHERE p.id = $1 GROUP BY p.id;`, [id])
        if (post.length) {
            const user = await db.query(`SELECT * FROM person WHERE id = $1`, [post[0].user_id])
            post[0].user_data = {
                id: user[0].id, name: user[0].name, surname: user[0].surname, username: user[0].username,
            }
            post[0].count_likes = +post[0].count_likes
            delete post[0].user_id
            res.json(post[0])
            return
        }
    }

    sendBadRequest(res)
}

const likeAPost = async (req, res) => {
    const body = req.body
    if (body.hasOwnProperty('post_id') && body.hasOwnProperty('user_id')) {
        const like =
            await db.query(`SELECT * FROM post_like WHERE user_id = $1 AND post_id = $2`, [body.user_id, body.post_id])
        if (!like.length) {
            await db.query(`INSERT INTO post_like (user_id, post_id ) values ($1, $2) RETURNING *`, [body.user_id, body.post_id])
            res.sendStatus(201)
            return
        }
    }

    sendBadRequest(res)
}

const removeLike = async (req, res) => {
    const body = req.body
    if (body.hasOwnProperty('post_id') && body.hasOwnProperty('user_id')) {
        const like =
            await db.query(`SELECT * FROM post_like WHERE user_id = $1 AND post_id = $2`, [body.user_id, body.post_id])
        if (like.length) {
            await db.query(`DELETE FROM post_like WHERE user_id = $1 AND post_id = $2 RETURNING *`, [body.user_id, body.post_id])
            res.sendStatus(201)
            return
        }
    }

    sendBadRequest(res)
}

export default {
    createPost,
    getOnePost,
    likeAPost,
    getPosts,
    removeLike,
    updatePost,
    deletePost,
}
