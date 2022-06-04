'use-strict'

/* --------- ERROR MESSAGES --------- */
const ERROR_422 = {code: 422, message: 'UNPROCESSABLE ENTITY'};

/* --------- EXPRESS VALIDATOR --------- */
const { validationResult } = require('express-validator');

function validationHandler(request, response, next) {

    const errors = validationResult(request);
    if (!errors.isEmpty()) {
        return response.status(ERROR_422.code).json(ERROR_422.message);
    }

    next();
}

module.exports = { validationHandler };