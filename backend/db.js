import pgPromise from 'pg-promise'

const dbConfig = {
    user: 'postgres',
    password: 'zero',
    host: 'localhost',
    port: 5432,
    database: 'node_postgres'
};

const pgp = pgPromise({});
const db = pgp(dbConfig)
export default db;
