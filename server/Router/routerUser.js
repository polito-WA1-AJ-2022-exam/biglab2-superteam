/* ---------- IMPORT MODULES ---------- */
const express   = require("express");
const passport  = require("passport")

/* ---------- INITIALIZATIONS ---------- */
const router = express.Router();


/* ---------- API DEFINITIONS ---------- */

/**
 *  API:
 *             POST /user/sessions
 *  ---------------------------------------------
 *  
 *  ---------------------------------------------
*/
router.post(
    '/sessions',
    passport.authenticate('local'),
    async (request, response) => {
        response.status(201).json(request.user);
    }
);

router.get(
    '/sessions/current',
    async (request, response) => {
        return (request.isAuthenticated()) ? response.json(request.user) : response.status(401).json({error: 'Not Authenticated'});
    }
);

router.delete(
    '/sessions/current',
    async (request, response) => {
        request.logOut(() => {
            response.end();
        });
    }
);

module.exports = router;