const models = require('../models');

const BlacklistedJwtRepository = {
  /**
   * function to create a new record in table "blacklistedJwts"
   *
   * @param {Object} jwtDetails: jwt details object
   */
  addNewJwt: async (jwtDetails) => {
    try {
      await models.blacklistedJwt.create(jwtDetails);
    } catch (error) {
      throw new Error(`Internal server error while adding new blacklisted jwt: ${error.message}`);
    }
  },

  /**
   * Function to get a record from table "blacklistedJwts" by field 'jwt'
   *
   * @param {String} jwt: jwt token
   * @returns a blacklisted jwt token object if exists, else null
   */
  getJwt: async (jwt) => {
    try {
      return await models.blacklistedJwt.findOne({
        where: {
          jwt: jwt,
        },
      });
    } catch (error) {
      throw new Error(`Internal server error while getting blacklisted jwt: ${error.message}`);
    }
  },
};

module.exports = BlacklistedJwtRepository;
