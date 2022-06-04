'use-strict'

/* --------- ERROR MESSAGES --------- */
const ERROR_401 = {code: 401, message: 'Not authorized'};

function isLoggedIn(request, response, next) {

    if (request.isAuthenticated()) {
        next();
    } else {
        return response.status(ERROR_401.code).json(ERROR_401.message);
    }
}

module.exports = { isLoggedIn }