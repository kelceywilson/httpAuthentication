const db = require('./db_connection').db;
const { insertUser } = require('./db_queries.js');

/**  JSDOC????
  * Add a user to the db
  * @param {string} email - email of user to add
  * @param {string} password - password
  * @returns {Promise} - Promise resolving to user ID
  */

const addUser = (email, password) => db.one(insertUser, [email, password])
  .then(id => id.user_id)
  .catch((err) => {
    console.error(err.code);
    if (err.code === '23505') {
      throw new Error(`User ${email} already exists`);
    }
  });

module.exports = {
  addUser,
};
