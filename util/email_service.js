const mailgun = require('mailgun-js');

const email_service = {
  send_otp_email: async (otpEmailData) => {
    try {
      const { invitee, firstName, otp } = otpEmailData;

      const data = {
        from: 'PERN-SIGNUP-LOGIN <charaka.info@gmail.com>',
        to: invitee,
        subject: 'Account Verification',
        template: 'send-otp-template',
        'v:first_name': firstName,
        'v:otp_code': otp,
      };

      await send_email(data);
    } catch (error) {
      throw new Error(`Failed to send otp email due to error: ${error.message}`);
    }
  },
};

async function send_email(data) {
  const apiKey = process.env.MAILGUN_APIKEY;
  const domain = process.env.MAILGUN_DOMAIN;

  const mg = mailgun({ apiKey, domain });

  mg.messages().send(data, function (error, body) {
    if (error) {
      throw error;
    } else {
      console.log('body', body);
    }
  });
}

module.exports = email_service;
