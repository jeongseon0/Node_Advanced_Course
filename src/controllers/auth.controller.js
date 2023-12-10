import { AuthService } from '../services/auth.service.js';
import { ErrorHandler } from '../middlewares/error-handler.middleware.js';

export class AuthController {
  authService = new AuthService();

  signup = async (req, res, next) => {
    try {
      const { email, name, password, confirmPassword } = req.body;

      const signedupUser = await this.authService.signup(email, name, password, confirmPassword);

      return res.status(200).json({ status: 'success', data: signedupUser });
    } catch (error) {
      if (error instanceof ErrorHandler) {
        res.status(error.statusCode).json({ status: 'error', message: error.message });
      } else {
        res.status(500).json({ status: 'error', message: 'Internal Server Error' });
      }
    }
  };

  signin = async (req, res, next) => {
    try {
      const { email, password } = req.body;

      const signedinToken = await this.authService.signin(email, password);

      return res.status(200).json({ status: 'success', data: signedinToken });
    } catch (error) {
      if (error instanceof ErrorHandler) {
        res.status(error.statusCode).json({ status: 'error', message: error.message });
      } else {
        res.status(500).json({ status: 'error', message: 'Internal Server Error' });
      }
    }
  };
}
