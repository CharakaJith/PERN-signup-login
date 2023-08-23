const UserService = require('../services/user.service');

const UserController = {
  registerNewUser: async (req, res) => {
    try {
      const data = ({ firstName, lastName, birthDate, gender, email, mobile, password } = req.body);

      const registerUserResponse = await UserService.registerNewUser(data);

      res.json({
        success: true,
        message: registerUserResponse,
      });
    } catch (error) {
      res.json({
        success: false,
        error: error.message,
      });
    }
  },

  userLogin: async (req, res) => {
    try {
      const data = ({ email, password } = req.body);

      const userLoginResponse = await UserService.userLogin(data);

      // set response header
      res.set({
        'Access-Token': userLoginResponse.accessToken,
      });
      res.json({
        success: true,
        message: userLoginResponse.user,
      });
    } catch (error) {
      res.json({
        success: false,
        error: error.message,
      });
    }
  },
};

module.exports = UserController;
