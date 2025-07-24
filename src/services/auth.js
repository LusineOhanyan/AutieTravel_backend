import Users from "../db/models/user.js";

class AuthService {
  static async signup(userData) {
    await Users.create(userData);
  }
}

export default AuthService;
