import { UserService } from "./user.service";
import { NextFunction, Request, Response } from "express";
import { CustomError } from "../../domain/errors/custom.error";
import { UpdateUserDto } from "../../domain/dto/user/update-user.dto";
import { UserEntity } from "../../domain/entities/user-entity";

export class UserController {
  constructor(private readonly userService: UserService) {}

  private handleError = (error: unknown, res: Response) => {
    if (error instanceof CustomError) {
      return res.status(error.statusCode).json({ error: error.message });
    }else{
      return res.status(500).json({ error: "Internal Server Error" });
    }
  };

  getUsers = async (req: Request, res: Response): Promise<any> => {
    try {
      const users = await this.userService.findAll();
      return res.status(200).json(users);
    } catch (error) {
      //todo: enviar al next de un handleError
    }
  };

  // getUserss = (req: Request, res: Response) => {
  //     this.userService.findAll()
  //       .then(users => res.json(users))
  //       .catch(error => console.log(error));
  //   }
  getUser = async (req: Request, res: Response, next: NextFunction): Promise<any> => {
    const { id } = req.params;
    try {
      const userFind = await this.userService.findById(id);
      return res.status(200).json(userFind);
    } catch (error) {
      next(error);
    }
  };

  updateUser = async (req: Request, res: Response): Promise<any> => {
    const { id } = req.params;
    const user = req.user as UserEntity;
    
    if (id !== user.id) {
      return res.status(401).json({ error: "id no encontrada" });
    }
    const [error,updateDto] = await UpdateUserDto.create(req.body);

    if(error) return res.status(400).json({error});

    try {

      const userUpdate = await this.userService.update(id, updateDto!);
      return res.status(200).json(userUpdate);
    } catch (error) {
      this.handleError(error, res);
    }
  };


  deleteUser = async (req: Request, res: Response): Promise<any> => {
    const { id } = req.params;

    if(!id) return res.status(400).json({error: "id no encontrada"})

    try {
      const userDelete = await this.userService.delete(id);
      return res.status(200).json(userDelete);
    } catch (error) {
      this.handleError(error, res);
    }
  };
}
