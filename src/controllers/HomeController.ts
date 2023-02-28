import { Request, Response } from 'express';
import Student from '../models/Student';

class HomeController {
  async index(req: Request, res: Response){
    const newStudent = await Student.create({
      firstName: 'Gustavo',
      lastName: 'Lima',
      age: 28,
      email: 'gus@email.com',
      height: 1.7,
      weight: 55
    });

    res.json(newStudent);
  }
}


export default new HomeController();
