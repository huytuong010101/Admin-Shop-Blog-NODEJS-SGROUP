const { knex } = require('../config/database')
const UserIsNotExist = async (username) => {
    rows = await knex.from('users').select('username').where('username', '=', username)
    return rows.length == 0
}
const EmailIsNotExist = async (email) => {
    rows = await knex.from('users').select('email').where('email', '=', email)
    return rows.length == 0
}

const EmailIsNotExistUpdate = async (email, username) => {
    rows = await knex.from('users').select('email').where('email', '=', email).where('username', '!=', username)
    return rows.length == 0
}


module.exports = {
    UserIsNotExist,
    EmailIsNotExist,
    EmailIsNotExistUpdate,
};