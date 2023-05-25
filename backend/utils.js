import db from './db.js'
export const sendBadRequest = (res) => res.sendStatus(400)

export const personExistenceCheck = async (key, checker) => {
    let person;
    if(key === 'username') {
        person =
            await db.query(`SELECT * FROM person WHERE username = $1`, [checker])
    } else if(key === 'id') {
        person =
            await db.query(`SELECT * FROM person WHERE id = $1`, [checker])
    }

    return person.length !== 0;
}