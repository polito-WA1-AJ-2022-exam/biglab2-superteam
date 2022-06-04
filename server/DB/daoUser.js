'use strict' ;

class UserDAO {

    /**
     * CONSTRUCTOR: UserDAO
     * ---------------------------------
     * @param {Object} generalPurposeDAO 
     */
     constructor (generalPurposeDAO) {
        this.dao = generalPurposeDAO;
    }

    /*
        + -------------------- +
        |        METHODS       |
        + -------------------- +
    */

    /**
     * Retrieve the user which corresponds to the username provided
     * ------------------------------------------------------------
     * @param {String} username email of the user to be retrieved
     * @param {String} password password of the user to be retrieved
     */
    getUser = async (username, password) => {
        const querySQL = "SELECT * FROM USERS WHERE USERS.email == ?";
        return this.dao.get(
            querySQL,
            [
                username
            ]
        ).then((result) => {
            return result
        }).catch((error) => {
            throw new TypeError(error.message);
        });
    }

}

module.exports = UserDAO;