const { check } = require('express-validator');
const { knex } = require('../config/database');

const TypeIsNotExist = async (name) => {
    const rows = await knex.from('type').select('*').where('name_type', '=', name);
    return rows.length === 0;
};
const CategoryIsNotExist = async (name) => {
    const rows = await knex.from('category').select('*').where('name_category', '=', name);
    return rows.length === 0;
};
const TypeIsNotExistUpdate = async (name, id) => {
    const rows = await knex.from('type').select('*').where('name_type', '=', name).where('id_type', '!=', id);
    return rows.length === 0;
};
const CategoryIsNotExistUpdate = async (name, id) => {
    const rows = await knex.from('category').select('*').where('name_category', '=', name).where('id_category', '!=', id);
    return rows.length === 0;
};
const TypeValidate = [
    check('nameOfNewType').custom(
        (value) => TypeIsNotExist(value).then((value) => {
            if (value === false) return Promise.reject('Type is exist');
        }),
    ),
];
const CategoryValidate = [
    check('nameOfNewCategory').custom(
        (value) => CategoryIsNotExist(value).then((value) => {
            if (value === false) return Promise.reject('Category is exist');
        }),
    ),
];
const updateTypeValidate = [
    check('name_update_type').custom(
        (value, { req }) => TypeIsNotExistUpdate(value, req.body.id_update_type).then((value) => {
            if (value === false) return Promise.reject('Type is exist');
        }),
    ),
];
const updateCategoryValidate = [
    check('name_update_category').custom(
        // eslint-disable-next-line no-shadow
        (value, { req }) => CategoryIsNotExistUpdate(value, req.body.id_update_category).then((value) => {
            // eslint-disable-next-line prefer-promise-reject-errors
            if (value === false) return Promise.reject('Category is exist');
        }),
    ),
];
module.exports = {
    TypeValidate,
    updateTypeValidate,
    CategoryValidate,
    updateCategoryValidate,
};
