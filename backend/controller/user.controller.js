import db from '../db.js'
import { sendBadRequest, personExistenceCheck } from '../utils.js'

const createUser = async (req, res) => {
    const body = req.body
    if (
        body.hasOwnProperty('name') &&
        body.hasOwnProperty('surname') &&
        body.hasOwnProperty('username') &&
        body.hasOwnProperty('password')
    ) {
        const { name, surname, username, password } = body
        const isPersonExist = await personExistenceCheck('username', username)
        if (!isPersonExist) {
            const newPerson =
                await db.query(`INSERT INTO person (name, surname, username, password) values ($1, $2, $3, $4) RETURNING id, name, surname, username, avatar_code`, [name, surname, username, password])
            res.json(newPerson[0])
            return
        }
    }

    sendBadRequest(res)
}

const logIn = async (req, res) => {
    const body = req.body
    if (
        body.hasOwnProperty('username') &&
        body.hasOwnProperty('password')
    ) {
        const { username, password } = body
        const person =
            await db.query(`SELECT id, name, surname, username, avatar_code FROM person WHERE username = $1 AND password = $2`, [username, password])
        if (person.length) {
            res.json(person[0])
            return
        }
    }

    sendBadRequest(res)
}
const getUsers = async (req, res) => {
    const users = await db.query(`SELECT id, name, surname, username, avatar_code FROM person`)
    res.json({
        items: users,
        count: users.length,
    })
}
const getOneUser = async (req, res) => {
    const id = req.params.id
    const isPersonExist = await personExistenceCheck('id', id)
    if (isPersonExist) {
        const person = await db.query(`SELECT id, name, surname, username, avatar_code FROM person where id = $1`, [id])
        res.json(person[0])
        return
    }

    sendBadRequest(res)
}
const updateUser = async (req, res) => {
    const body = req.body
    if (
        body.hasOwnProperty('name') &&
        body.hasOwnProperty('surname') &&
        body.hasOwnProperty('id') &&
        body.hasOwnProperty('avatar_code')
    ) {
        const { name, surname, id, avatar_code } = body
        const isPersonExist = await personExistenceCheck('id', id)
        if (isPersonExist) {
            const person =
                await db.query(`UPDATE person SET name = $1, surname = $2, avatar_code = $3 WHERE id = $4 RETURNING id, name, surname, username, avatar_code`, [name, surname, avatar_code, id])
            res.json(person[0])
            return
        }
    }

    sendBadRequest(res)
}
const deleteUser = async (req, res) => {
    const id = req.params.id
    const isPersonExist = await personExistenceCheck('id', id)
    if (isPersonExist) {
        await db.query(`DELETE FROM person where id = $1`, [id])
        return
    }

    sendBadRequest(res);
}

export default {
    createUser,
    getOneUser,
    getUsers,
    deleteUser,
    updateUser,
    logIn,
}
