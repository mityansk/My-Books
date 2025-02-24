const { User } = require('../db/models');

class UserService {
  static async getByEmail(email) {
    return await User.findOne({ where: { email } });
  }

  static async create(data) {
    return await User.create(data);
  }

}

module.exports = UserService;
