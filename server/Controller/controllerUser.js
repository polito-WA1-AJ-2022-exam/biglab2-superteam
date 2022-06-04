'use strict' ;

/* ---------- IMPORT MODULES ---------- */
const daoUser   = require('../DB/daoUser');
const crypto    = require('crypto');




class UserController {

    /**
     * CONSTRUCTOR OF THE CONTROLLER
     * -----------------------------
     * @param {DAO Object} input_dao 
     */
    constructor (input_dao) {
        this.dao = new daoUser(input_dao);
    }

    /**
     * Retrieve the specific user information given 
     * the username and the password
     * ---------------------------------------------
     *         API: GET /api/users
     * =============================================
    */
    getUser = async (username, password) => {

        try {
            const result = await this.dao.getUser(username, password);

            /* no user associated to given email */
            if (result === undefined) {
                return false;
            } else {
                return new Promise((resolve, reject) => {
                    /* user is associated to the email */
                    const user = {
                        id: result.id,
                        username: result.email,
                        name: result.name
                    }

                    /* check if password provided is matching */
                    crypto.scrypt(
                        password,       /* plain-text password */
                        result.salt,    /* salt of the stored password */
                        32,             /* keylen */
                        (error, hashedPassword) => {
                            if (error) {
                                throw new Error(error.message);
                            }

                            if (!crypto.timingSafeEqual(Buffer.from(result.hash, 'hex'), hashedPassword)) {
                                resolve(false);
                            } else {
                                resolve(user);
                            }
                        }
                    );
                });
            }
        } catch (error) {
            throw error;
        }
    }
}

module.exports = UserController;