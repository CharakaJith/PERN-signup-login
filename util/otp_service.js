const OtpRepository = require('../repositories/otp.repository');

const otp_service = {
  generate_otp: async (userId) => {
    return await generateSixDigitNumber(userId);
  },
};

async function generateSixDigitNumber(userId) {
  const min = 100000;
  const max = 999999;

  while (true) {
    const randomNumber = Math.floor(Math.random() * (max - min + 1)) + min;

    // validate the generated number with the databse
    const otpDetails = {
      otp: randomNumber,
      userId: userId,
      isActive: true,
    };

    const otp = await OtpRepository.getActiveOtpByUserId(otpDetails);
    if (!otp) {
      return randomNumber;
    }
  }
}

module.exports = otp_service;
