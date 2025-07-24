import AuthService from "../services/auth.js";

class AuthController {
  static async signup(req, res) {
    try {
      await AuthService.signup(req.body);

      res.status(201).json({ message: "User signed up successfully" });
    } catch (error) {
      res.status(500).json({ error: "Internal server error" });
    }
  }
}

export default AuthController;
