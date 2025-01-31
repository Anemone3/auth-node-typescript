import { Router } from "express";
import { UserPrismaDataSourceImpl } from "../../infrastructure/datasources/user/prisma.user.datasource";
import { UserRepositoryImpl } from "../../infrastructure/repositories/user.repository.impl";
import { UserService } from "./user.service";
import { UserController } from "./user.controller";
import { AuthMiddleware } from "../middlewares/auth.middleware";
import { UserMiddleware } from "../middlewares/user.middleware";
import { RoleType } from "../../domain/entities/user-entity";

export class UserRoutes {
  static get routes(): Router {
    const router = Router();

    const datasource = new UserPrismaDataSourceImpl();
    const authRepository = new UserRepositoryImpl(datasource);
    //console.log(authRepository);
    const userService = new UserService(authRepository);
    //console.log(service);

    const controller = new UserController(userService);

    router.get("/", controller.getUsers);
    router.get("/:id", controller.getUser);
    router.put("/:id",[AuthMiddleware.validateJWT,AuthMiddleware.verifyOwnership] ,controller.updateUser);
    router.delete("/:id",[AuthMiddleware.validateJWT,UserMiddleware.verifiyRole(RoleType.ADMIN)], controller.deleteUser)

    
    return router;
  }
}
