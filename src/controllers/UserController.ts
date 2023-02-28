import { Request, Response } from 'express';
import { IErrorDB } from '../interfaces/IErrorDB';
import User from '../models/User';

class UserController {
  async create(req: Request, res: Response){
    try{
      const { password } = req.body;

      if (!((/[A-Z]/).test(password) && ((/[a-z]/).test(password))))
        return res.status(400).json({errors: ['A senha deve ter pelo menos 1 letra maiúscula e 1 minúscula']});


      const newUser = await User.create(req.body);

      res.json(newUser);
    }catch(e: any){
      res.status(400).json({errors: e.errors.map((err: IErrorDB) => err.message)});
    }
  }
}


export default new UserController();
