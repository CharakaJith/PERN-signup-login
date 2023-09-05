const OtpRepository = require('../repositories/otp.repository');
const { OTP_EXPIRATION } = require('../enum/timeouts');

const otp_service = {
  generate_otp: async (userId) => {
    return await generateSixDigitNumber(userId);
  },

  check_otp_expiration: async (otpDetails) => {
    const currentDateTime = new Date();
    const currentTime = currentDateTime.getTime();
    const otpTime = otpDetails.createdAt.getTime();

    const msTimeDiffer = currentTime - otpTime;
    const sTimeDiffer = Math.floor(msTimeDiffer / 1000);
    const hrTimeDiffer = Math.floor((msTimeDiffer % 86400000) / 3600000);

    if (hrTimeDiffer == OTP_EXPIRATION.HOURS && sTimeDiffer <= OTP_EXPIRATION.SECONDS) {
      return true;
    } else {
      // update otp status to inactive
      const updateOtpDetails = {
        isActive: false,
      };
      await OtpRepository.updateOtpDetails(updateOtpDetails, otpDetails.id);

      return false;
    }
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

    const otp = await OtpRepository.getOtpDetails(otpDetails);
    if (!otp) {
      return randomNumber;
    }
  }
}

module.exports = otp_service;
