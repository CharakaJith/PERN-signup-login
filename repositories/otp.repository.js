const models = require('../models');

const OtpRepository = {
  /**
   * Function to create a new record in table "otps"
   *
   * @param {Object} otp: otp details object
   * @returns an object of newly created otp code details
   */
  createNewOtp: async (otp) => {
    try {
      return await models.otp.create(otp);
    } catch (error) {
      throw new Error(`Internal server error while creating new otp code: ${error.message}`);
    }
  },

  /**
   * Function to find an active record from table "otps" by fields 'userId' and 'otp'
   *
   * @param {Object} otpDetails: otp details object
   * @returns an object otp code details if exsists, else null
   */
  getActiveOtpByUserId: async (otpDetails) => {
    try {
      return await models.otp.findOne({
        where: otpDetails,
      });
    } catch (error) {
      throw new Error(
        `Internal server error while getting active otp by user id: ${error.message}`
      );
    }
  },
};

module.exports = OtpRepository;
