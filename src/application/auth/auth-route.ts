import { NextFunction, Request, Response, Router } from "express";
import { AuthRepositoryImpl } from "../../infrastructure/repositories/auth.repository.impl";
import { PrismaDataSourceImpl } from "../../infrastructure/datasources/auth/prisma.auth.datasource";
import { AuthController } from "./auth-controller";
import { AuthService } from "./auth-service";
import { AuthMiddleware } from "../middlewares/auth.middleware";
import { OPTService } from "../../infrastructure/services/OtpServices";
import { UserPrismaDataSourceImpl } from "../../infrastructure/datasources/user/prisma.user.datasource";
import { UserRepositoryImpl } from "../../infrastructure/repositories/user.repository.impl";

export class AuthRoutes {
  static get routes(): Router {
    const router = Router();

    const datasource = new PrismaDataSourceImpl();

    const authRepository = new AuthRepositoryImpl(datasource);
    //console.log(authRepository);
    const otpService = new OPTService();

    //User
    const userDataSource = new UserPrismaDataSourceImpl();
    const userRepository = new UserRepositoryImpl(userDataSource);
    //console.log(authRepository);

    //console.log(service);

    const authService = new AuthService(
      authRepository,
      otpService,
      userRepository
    );
    //console.log(service)
    const controller = new AuthController(authService);

    //const middleware = new AuthMiddleware();

    router.post("/register", controller.registerUser);
    router.post("/login", controller.loginUser);
    router.post("/verify", controller.verificateUserAuth);
    router.get(
      "/protected",
      [AuthMiddleware.validateJWT],
      (req: Request, res: Response, next: NextFunction) => {
        res.json({ message: "Acceso autorizado", user: req.body.user });
      }
    );

    return router;
  }
}
