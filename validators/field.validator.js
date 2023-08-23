const { phone } = require('phone');

const FieldValidator = {
  checkIfEmptyString: async (field, fieldName) => {
    if (!field || field.trim().length === 0) {
      throw new Error(`The ${fieldName} field is empty!`);
    }
  },

  checkIfValidName: async (field, fieldName) => {
    const nameFormat = /^[A-Za-z ]+$/;

    await FieldValidator.checkIfEmptyString(field, fieldName);

    if (!String(field).match(nameFormat)) {
      throw new Error(`Invalid ${fieldName} format!`);
    }
  },

  checkIfValidEmail: async (email) => {
    const emailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

    await FieldValidator.checkIfEmptyString(email, 'email');

    if (!String(email).match(emailformat)) {
      throw new Error('Invalid email format!');
    }
  },

  checkIfValidMobile: async (mobile) => {
    await FieldValidator.checkIfEmptyString(mobile, 'mobile number');

    const checkMobile = phone(mobile);
    if (!checkMobile.isValid) {
      throw new Error('Invalid mobile number format!');
    }
  },
};

module.exports = FieldValidator;
