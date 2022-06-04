/**
 *                              CLASS: DAO
 * ============================================================================
 * Data Access Object (DAO) is used as the lowest level of logic implementation
 * to access directly the DB. It implements all the utility functions required
 * by the controller to access the DB and manage data. To do so, it exploits 
 * three functions:
 *      - run(): it executes a query without returning any result
 *      - get(): it executes a query, returning the first element of the result
 *      - all(): it executes a query, returning all the elements of the result
 */

'use strict'

/* ---------- IMPORT MODULES ---------- */
const sqlite = require('sqlite3');

/* ---------- DAO CLASS ---------- */
class DAO {

    /**
     *  ATTRIBUTES
     */
    static database;

    /**
     *  CONSTRUCTOR
     */
    constructor () {
        this.database = new sqlite.Database('films.db', (error) => {
            if (error) {
                console.log(error);
                throw new Error(error.message);
            }
        });
    }

    run = (querySQL, params = []) => {
        return new Promise((resolve, reject) => {
            this.database.run(querySQL, params, (error) => {
                if (error) {
                    console.log("[!] ERROR: error running SQL: " + querySQL);
                    reject(error);
                } else {
                    resolve({id: this.lastID});
                }
            });
        });
    }

    get = (querySQL, params = []) => {
        return new Promise((resolve, reject) => {
            this.database.get(querySQL, params, (error, row) => {
                if (error) {
                    console.log("[!] ERROR: error running SQL: " + querySQL);
                    reject(error);
                } else {
                    resolve(row);
                }
            });
        });
    }

    all = (querySQL, params = []) => {
        return new Promise((resolve, reject) => {
            this.database.all(querySQL, params, (error, rows) => {
                if (error) {
                    console.log("[!] ERROR: error running SQL: " + querySQL);
                    reject(error);
                } else {
                    resolve(rows);
                }
            });
        });
    }
}

module.exports = DAO;