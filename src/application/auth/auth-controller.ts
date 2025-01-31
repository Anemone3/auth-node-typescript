import { NextFunction, Request, Response } from "express";
import { AuthRepository } from "../../domain/repositories/auth.repository";
import { RegisterUserDto } from "../../domain/dto/auth/register-user.dto";
import { CustomError } from "../../domain/errors/custom.error";
import { RegisterUser } from "../../domain/use-cases/auth/register-user.use-case";
import { LoginUserDto } from "../../domain/dto/auth/login-user.dto";
import { AuthService } from "./auth-service";
import { AuthToken } from "./auth.interface";

export class AuthController {
  constructor(private readonly authService: AuthService) {}

  registerUser = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<any> => {
    const { firstname, lastname, email, password } = req.body;
    const [error, registerUserDto] = await RegisterUserDto.create({
      firstname,
      lastname,
      email,
      password,
    });

    if (error) return res.status(400).json({ error });

    try {
      const usuarioRegister = await this.authService.register(registerUserDto!);

      if (!usuarioRegister)
        return res.status(401).json({ error: "Invalid credentials, service" });

      res.json({
        message: "Send code verification, please verify email",
        ...usuarioRegister,
      });
    } catch (error) {
      next(error);
    }
  };

  loginUser = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<any> => {
    const { email, password } = req.body;
    const [error, loginUserDto] = LoginUserDto.validate({ email, password });

    if (error) return res.status(400).json({ error });

    try {
      const userLogging = await this.authService.login(loginUserDto!);

      if (!userLogging)
        return res.status(401).json({ error: "Invalid credentials, service" });

      res.json({
        message: "Send code verification, please verify email",
        ...userLogging,
      });
    } catch (error) {
      next(error);
    }
  };

  verificateUserAuth = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<any> => {
    const { otp, email } = req.body;

    try {
      if (!otp || !email)
        return res.status(400).json({ error: "Invalid body, service" });

      const result = await this.authService.verifiyUserAndSendToken(
        email,
        otp
      );

      if (result === null)
        return res.status(400).json({ error: "Wrong code"});

      res.status(200).json({
        ...result,
      });
    } catch (error) {
      next(error);
    }
  };
}
