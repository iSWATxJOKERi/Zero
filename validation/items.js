const Validator = require('validator');
const validText = require('./valid-text');

module.exports = function validateItem(data) {
    let errors = {};

    data.name = validText(data.name) ? data.name : '';
    data.price = typeof Number(data.price) === 'number' ? data.price : '';

    if (!Validator.isLength(data.name, { min: 1, max: 16 })) {
        errors.name = 'Name of item must be between 1 and 16 characters';
    }

    if (Validator.isEmpty(data.name)) {
        errors.name = 'Name field is required';
    }

    if (data.price <= 0) {
        errors.price = 'Price field is required';
    }

    return {
        errors,
        isValid: Object.keys(errors).length === 0
    }
}