import { NextFunction, Request, Response } from "express";
import { JwtAdaptar } from "../../config/jwt-adapter";
import { prisma } from "../../data";
import { PayloadToken } from "../../domain/dto/auth/payload-token";
import { RoleType, UserEntity } from "../../domain/entities/user-entity";
import { CustomError } from "../../domain/errors/custom.error";


// Solo me funciona aqui, ni idea..
declare global {
  namespace Express {
    interface Request {
      user?: UserEntity;
    }
  }
}
export class AuthMiddleware  {
  static validateJWT = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<any> => {
    try {
      // const authorization = req.header("Authorization");

      // if (!authorization)
      //   throw CustomError.unathorized(
      //     "Unauthorized, Missing header Authorization"
      //   );

      // if (!authorization.startsWith("Bearer "))
      //   throw CustomError.unathorized("Unauthorized, Bearer missing ");

      // const token = authorization.split(" ").at(1) || "";
      const token = req.cookies.token;
      if(!token) throw CustomError.unathorized("Unauthorized, No token found");
      
      const payload = await JwtAdaptar.validateToken<PayloadToken>(token);

      if (!payload)
        throw CustomError.unathorized("Unauthorized, Invalid token");

      const user = await prisma.user.findUnique({ where: { id: payload.sub } });

      if (!user) return res.status(401).json({ error: "not user?" });

      (req as any).user = user;

      next();
    } catch (error) {
      next(error);
    }
  };

  static verifyOwnership = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<any> => {
    try {
      const user = req.user as UserEntity;

      if (!user)
        throw CustomError.badRequest("Unauthorized, No user found in request");

      const userIdFromToken = user.id;
      const userRole = user.role;
      const userIdFromRequest = req.params.id;

      console.log(user.id, userIdFromRequest);

      if (
        userRole.includes(RoleType.ADMIN) ||
        userIdFromToken === userIdFromRequest
      ) {
        return next();
      }

      throw CustomError.unathorized("Unauthorized, No eres el propietario");
    } catch (error) {
      next(error);
    }
  };
}
