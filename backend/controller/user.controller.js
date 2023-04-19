import db from '../db.js'
const createUser = async (req, res) => {
    const body = req.body;
    if (
        body.hasOwnProperty('name') &&
        body.hasOwnProperty('surname') &&
        body.hasOwnProperty('username') &&
        body.hasOwnProperty('password')
    ) {
        const { name, surname, username, password } = body;
        const person = await db.query(`SELECT * FROM person WHERE username = $1`, [username])
        if(!person.length) {
            const newPerson =
                await db.query(`INSERT INTO person (name, surname, username, password) values ($1, $2, $3, $4) RETURNING *`, [name, surname, username, password])
            res.json(newPerson[0])
        } else {
            res.sendStatus(400)
        }
    } else {
        res.sendStatus(400)
    }
}

const logIn = async (req, res) => {
    const body = req.body;
    if (
        body.hasOwnProperty('username') &&
        body.hasOwnProperty('password')
    ) {
        const { username, password } = body;
        const person =
            await db.query(`SELECT * FROM person WHERE username = $1 AND password = $2`, [username, password])
        if(person.length) {
            res.json(person[0])
        } else {
            res.sendStatus(400)
        }
    } else {
        res.sendStatus(400);
    }
}
const getUsers = async (req, res) => {
    const users = await db.query(`SELECT * FROM person`)
    res.json({
        items: users,
        count: users.length
    })
}
const getOneUser = async (req, res) => {
    const id = req.params.id
    const person = await db.query(`SELECT * FROM person where id = $1`, [id])
    res.json(person[0])
}
const updateUser = async (req, res) => {
    const body = req.body;
    if (
        body.hasOwnProperty('name') &&
        body.hasOwnProperty('surname') &&
        body.hasOwnProperty('id')
    ) {
        const { name, surname, id } = body;
        const person =
            await db.query(`UPDATE person set name = $1, surname = $2 where id = $3 RETURNING *`, [name, surname, id])
        res.json(person[0])
    } else {
        res.sendStatus(400)
    }
}
const deleteUser = async (req, res) => {
    const id = req.params.id
    const person = await db.query(`DELETE FROM person where id = $1 RETURNING *`, [id])
    res.json(person[0])
}

export default {
    createUser,
    getOneUser,
    getUsers,
    deleteUser,
    updateUser,
    logIn,
}
