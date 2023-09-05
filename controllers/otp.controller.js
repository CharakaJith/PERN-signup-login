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
};

module.exports = OtpController;
