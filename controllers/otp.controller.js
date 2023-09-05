const OtpService = require('../services/otp.service');

const OtpController = {
  sendOtpToEmail: async (req, res) => {
    try {
      const data = ({ email } = req.user);
      const sendOtpResponse = await OtpService.sendOtpToEmail(data);

      res.json({
        success: true,
        message: sendOtpResponse,
      });
    } catch (error) {
      res.json({
        success: false,
        error: error.message,
      });
    }
  },

  verifyOtpCode: async (req, res) => {
    try {
      const { otp } = req.body;
      const { id: userId } = req.user;

      const data = { otp, userId };

      const verifyOtpResponse = await OtpService.verifyOtpCode(data);

      res.json({
        success: true,
        message: verifyOtpResponse,
      });
    } catch (error) {
      res.json({
        success: false,
        error: error.message,
      });
    }
  },
};

module.exports = OtpController;
