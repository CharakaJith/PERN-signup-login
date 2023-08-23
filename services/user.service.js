const bcrypt = require('bcrypt');
const FieldValidator = require('../validators/field.validator');
const ExposableIdGenerator = require('../common/exposableIdGenerator');
const JwtGeneraor = require('../util/jwtGenerator');
const UserRepository = require('../repositories/user.repository');

const UserService = {
  registerNewUser: async (data) => {
    try {
      const { firstName, lastName, birthDate, gender, email, mobile, password } = data;

      // validate user inputs
      await FieldValidator.checkIfValidName(firstName, 'first name');
      await FieldValidator.checkIfValidName(lastName, 'last name');
      await FieldValidator.checkIfEmptyString(birthDate, 'date of birth');
      await FieldValidator.checkIfEmptyString(gender, 'gender');
      await FieldValidator.checkIfValidEmail(email);
      await FieldValidator.checkIfValidMobile(mobile);
      await FieldValidator.checkIfEmptyString(password, 'password');

      // check user email
      const user = await UserRepository.getUserByEmail(email);
      if (user) {
        throw new Error('Email is already registered! Try logging in!');
      }

      // encrypt password and get user display id
      const encryptedPassword = await bcrypt.hash(password, 10);
      const displayId = await ExposableIdGenerator.EXPOSABLE_ID_USER();

      // create new user
      const newUser = {
        displayId: displayId,
        firstName: firstName,
        lastName: lastName,
        birthDate: birthDate,
        gender: gender,
        email: email,
        mobile: mobile,
        password: encryptedPassword,
        isVerified: false,
        isActive: true,
      };
      await UserRepository.createNewUser(newUser);

      return 'User registered!';
    } catch (error) {
      throw error;
    }
  },

  userLogin: async (data) => {
    try {
      const { email, password } = data;

      // validate user inputs
      await FieldValidator.checkIfValidEmail(email);
      await FieldValidator.checkIfEmptyString(password, 'password');

      // check user email
      const user = await UserRepository.getUserByEmail(email);
      if (!user) {
        throw new Error('Email is not registered! Try signing in!');
      }
      if (!user.isActive) {
        // TODO: make user do something to re-active account
      }

      // validate password
      const isValidPassword = await bcrypt.compare(password, user.password);
      if (!isValidPassword) {
        throw new Error('invalid password');
      }

      // generate access token
      const tokenUser = {
        id: user.id,
        displayId: user.displayId,
        name: `${user.firstName} ${user.lastName}`,
        email: user.email,
      };
      const accessToken = await JwtGeneraor.generateAccessToken(tokenUser);

      return {
        accessToken: accessToken,
        user: {
          id: user.id,
          displayId: user.displayId,
          firstName: user.firstName,
          lastName: user.lastName,
          email: user.email,
        },
      };
    } catch (error) {
      throw error;
    }
  },
};

module.exports = UserService;