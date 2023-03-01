import { Request, Response } from 'express';

class PhotoController {
  async index(req: Request, res: Response){
    res.json(req.file);
  }
}


export default new PhotoController();
