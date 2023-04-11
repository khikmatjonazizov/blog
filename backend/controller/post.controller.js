import db from '../db.js'

const createPost = async (req, res) => {
    const body = req.body;
    if (
        body.hasOwnProperty('title') &&
        body.hasOwnProperty('content') &&
        body.hasOwnProperty('user_id')
    ) {
        const { title, content, user_id } = body;
        const newPost =
            await db.query(`INSERT INTO post (title, content, user_id) values ($1, $2, $3) RETURNING *`, [title, content, user_id])
        res.json(newPost[0]);
    } else {
        res.sendStatus(400)
    }
}

const getPostsByUser = async (req, res) => {
    const id = req.query.id;
    if (id) {
        const posts = await db.query(`SELECT * FROM post WHERE user_id = $1`, [id])
        res.json(posts);
    } else {
        res.sendStatus(400)
    }
}

export default {
    createPost,
    getPostsByUser,
}
