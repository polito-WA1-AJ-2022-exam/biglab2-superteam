'use strict';

/* ---------- IMPORT MODULES ---------- */
const sqlite = require('sqlite3');


/* ---------- DAO CLASS ---------- */
class DAO {
    static database;

    /**
     * CONSTRUCTOR OF THE DATABASE
     * ---------------------------
     */
    constructor () {
        this.database = new sqlite.Database("films.db", (error) => {
            if (error) {
                console.log(error)
                throw error;
            }
        });
    }

    /**
     *  + --------------------------------------------- +
     *  |                                               |
     *  |             DATABASE: OPERATIONS              |
     *  |                                               |
     *  + --------------------------------------------- +
    */

    run(sql, params = []) {
        return new Promise((resolve, reject) => {
          this.database.run(sql, params, function (err) {
            if (err) {
              console.log('Error running sql ' + sql)
              console.log(err)
              reject(err)
            } else {
              resolve({ id: this.lastID })
            }
          })
        })
    }

    get(sql, params = []) {
        return new Promise((resolve, reject) => {
          this.database.get(sql, params, (err, result) => {
            if (err) {
              console.log('Error running sql: ' + sql)
              console.log(err)
              reject(err)
            } else {
              resolve(result)
            }
          })
        })
    }
    
    all(sql, params = []) {
        return new Promise((resolve, reject) => {
          this.database.all(sql, params, (err, rows) => {
            if (err) {
              console.log('Error running sql: ' + sql)
              console.log(err)
              reject(err)
            } else {
              resolve(rows)
            }
          })
        })
    }

}

module.exports = DAO;