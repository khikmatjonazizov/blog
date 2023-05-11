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
        newPost.likes = 0;
        res.json(newPost[0]);
    } else {
        res.sendStatus(400)
    }
}

const getPosts = async (req, res) => {
    const a = 'select p.id, p.title, p.content, p.user_id, COUNT(l.post_id) as count_likes from post as p LEFT JOIN post_like as l ON p.id = l.post_id GROUP BY p.id;'
    sendBadRequest(res, 'Xikmat')
    const user_id = req.query.user_id;
    let posts;
    if (user_id) {
        posts = await db.query(`SELECT * FROM post WHERE user_id = $1`, [user_id])
    } else {
        posts = await db.query('SELECT p.id, p.title, p.content, p.user_id, COUNT(l.post_id) AS count_likes from post AS p LEFT JOIN post_like AS l ON p.id = l.post_id GROUP BY p.id;')
    }
    res.json({
        items: posts,
        count: posts.length,
    });

    // const likes = await db.query('SELECT * FROM post_like')
    // const likesNum = {}
    // likes.map(like => {
    //     if(likesNum.hasOwnProperty(like.user_id)) {
    //         likesNum[like.user_id] += 1;
    //     } else {
    //         likesNum[like.user_id] = 1;
    //     }
    // })
    // let posts = []
    // if (user_id) {
    //     posts = await db.query(`SELECT * FROM post WHERE user_id = $1`, [user_id])
    // } else {
    //     posts = await db.query('SELECT * FROM post')
    // }
    // posts = posts.map(post => ({...post, likes: likesNum[post.user_id] || 0}))
    // res.json({
    //     items: posts,
    //     count: posts.length,
    // });
}

const getOnePost = async (req, res) => {
    const id = req.params.id
    if(id) {
        const post = await db.query(`SELECT * FROM post WHERE id = $1`, [id])
        const likes = await db.query(`SELECT * FROM post_like WHERE post_id = $1`, [id])
        if(post.length) {
            const user = await db.query(`SELECT * FROM person WHERE id = $1`, [post[0].user_id])
            post[0].user_data = {
                id: user[0].id,
                name: user[0].name,
                surname: user[0].surname,
                username: user[0].username,
            }
            post[0].likes = likes.length;
            delete post[0].user_id
            res.json(post[0]);
        } else {
            res.sendStatus(400)
        }
    } else {
        res.sendStatus(400)
    }
}

const likeAPost = async (req, res) => {
    const body = req.body;
    if(body.hasOwnProperty('post_id') && body.hasOwnProperty('user_id')) {
        await db.query(`INSERT INTO post_like (user_id, post_id ) values ($1, $2)`, [body.user_id, body.post_id])
        res.sendStatus(201)
    } else {
        res.sendStatus(400)
    }
}

export default {
    createPost,
    getOnePost,
    likeAPost,
    getPosts,
}
