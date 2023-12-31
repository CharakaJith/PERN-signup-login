const email_service = require('../util/email_service');
const otp_service = require('../util/otp_service');
const FieldValidator = require('../validators/field.validator');
const UserRepository = require('../repositories/user.repository');
const OtpRepository = require('../repositories/otp.repository');

const OtpService = {
  sendOtpToEmail: async (data) => {
    try {
      const { email } = data;

      // get toekn user
      const user = await UserRepository.getUserByEmail(email);

      // generate otp code
      const otp = await otp_service.generate_otp(user.id);

      // save otp code
      const otpDetails = {
        otp: otp,
        userId: user.id,
        isActive: true,
      };
      await OtpRepository.createNewOtp(otpDetails);

      const otpEmailData = {
        invitee: email,
        firstName: user.firstName,
        otp: otp,
      };

      await email_service.send_otp_email(otpEmailData);

      return 'otp sent to email';
    } catch (error) {
      throw error;
    }
  },

  verifyOtpCode: async (data) => {
    try {
      const { otp, userId } = data;

      // validate user inputs
      await FieldValidator.checkIfEmptyNumber(otp, 'OTP code');

      // check if otp exsists
      const getOtpDetails = {
        otp: otp,
        userId: userId,
        isActive: true,
      };
      const otpCode = await OtpRepository.getOtpDetails(getOtpDetails);
      if (!otpCode) {
        throw new Error('Invalid OTP code!');
      }

      // check otp expiration time
      const isActive = await otp_service.check_otp_expiration(otpCode);
      if (!isActive) {
        throw new Error('OTP code expired!');
      }

      // verifiy user account
      const user = {
        isVerified: true,
      };
      await UserRepository.updateUser(user, userId);

      return 'OTP verified!';
    } catch (error) {
      throw error;
    }
  },
};

module.exports = OtpService;
