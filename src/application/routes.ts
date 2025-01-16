import { Router } from "express";
import { AuthRoutes } from "./auth/auth-route";
import { UserRoutes } from "./user/user-route";

export class AppRoutes {
    
    
    static get routes(): Router{
        const router = Router();



        router.use('/auth', AuthRoutes.routes)
        router.use('/users',UserRoutes.routes)
        return router;
    }
}