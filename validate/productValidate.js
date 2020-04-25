const { check, validationResult } = require('express-validator');
const { knex } = require('../config/database')

const TypeIsNotExist = async (name) => {
    rows = await knex.from('type').select('*').where('name_type', '=', name)
    return rows.length == 0
}
const CategoryIsNotExist = async (name) => {
    rows = await knex.from('category').select('*').where('name_category', '=', name)
    return rows.length == 0
}
const TypeIsNotExistUpdate = async (name, id) => {
    rows = await knex.from('type').select('*').where('name_type', '=', name).where('id_type', '!=', id)
    return rows.length == 0
}
const CategoryIsNotExistUpdate = async (name, id) => {
    rows = await knex.from('category').select('*').where('name_category', '=', name).where('id_category', '!=', id)
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
const CategoryValidate = [
    check('nameOfNewCategory').custom(
        (value) => {
            return CategoryIsNotExist(value).then((value) => {
                if (value == false) return Promise.reject("Category is exist")
            })
        }
    ),
]
const updateTypeValidate = [
    check('name_update_type').custom(
        (value, { req }) => {
            return TypeIsNotExistUpdate(value, req.body.id_update_type).then((value) => {
                if (value == false) return Promise.reject("Type is exist")
            })
        }
    ),
]
const updateCategoryValidate = [
    check('name_update_category').custom(
        (value, { req }) => {
            return CategoryIsNotExistUpdate(value, req.body.id_update_category).then((value) => {
                if (value == false) return Promise.reject("Category is exist")
            })
        }
    ),
]
module.exports = {
    TypeValidate,
    updateTypeValidate,
    CategoryValidate,
    updateCategoryValidate,
};