const { check, validationResult } = require('express-validator');
const { knex } = require('../config/database')

const TypeIsNotExist = async (name) => {
    rows = await knex.from('type').select('*').where('name_type', '=', name)
    return rows.length == 0
}
const TypeIsNotExistUpdate = async (name, id) => {
    rows = await knex.from('type').select('*').where('name_type', '=', name).where('id_type', '!=', id)
    return rows.length == 0
}
const TypeValidate = [
        check('nameOfNewType').custom(
            (value) => {
                return TypeIsNotExist(value).then((value) => {
                    if (value == false) return Promise.reject("Type is exist")
                })
            }
        ),
    ]
const updateTypeValidate = [
    check('name_update_type').custom(
        (value, {req}) => {
            return TypeIsNotExistUpdate(value, req.body.id_update_type).then((value) => {
                if (value == false) return Promise.reject("Type is exist")
            })
        }
    ),
]
module.exports = {
    TypeValidate,
    updateTypeValidate,
};