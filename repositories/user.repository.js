const models = require('../models');

const UserRepository = {
  /**
   * Function to create a new record in table "users"
   *
   * @param {Object} user: user details object
   * @returns an object of newly created user details
   */
  createNewUser: async (user) => {
    try {
      return await models.user.create(user);
    } catch (error) {
      throw new Error(`Internal server error while creating new user: ${error.message}`);
    }
  },

  /**
   * Function to update a record in table "user" by field 'id'
   *
   * @param {Object} user: user detail object
   * @param {Integer} userId: id of the user
   */
  updateUser: async (user, userId) => {
    try {
      await models.user.update(user, {
        where: {
          id: userId,
        },
      });
    } catch (error) {
      throw new Error(`Internal server error while updating user: ${error.message}`);
    }
  },

  /**
   * Function to get a record from table "users" by field 'email'
   *
   * @param {String} email: email of the user
   * @returns an object of user details if exists, else null
   */
  getUserByEmail: async (email) => {
    try {
      return await models.user.findOne({
        where: {
          email: email,
        },
      });
    } catch (error) {
      throw new Error(`Internal server error while getting user by email: ${error.message}`);
    }
  },
};

module.exports = UserRepository;
