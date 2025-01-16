import { NextFunction, Request, Response } from "express";
import { AuthMiddleware } from "./auth.middleware";
import { RoleType } from "../../domain/entities/user-entity";
import { CustomError } from "../../domain/errors/custom.error";

export class UserMiddleware extends AuthMiddleware {
  static verifiyRole = (requiredRoles: RoleType[]) => {
    return async (
      req: Request,
      res: Response,
      next: NextFunction
    ): Promise<any> => {
      try {
        const userRoles = req.user?.role;
        console.log('que rol llega aca xd', userRoles);
        
        if (!userRoles) throw CustomError.notFound("Rol no encontrado");

        const hasRequiredRole = requiredRoles.some((role) =>
          userRoles.includes(role)
        );

        if (!hasRequiredRole) {
          throw CustomError.forbidden("Rol no authorizado.");
        }

        next();
      } catch (error) {
        next(error);
      }
    };
  };
}
