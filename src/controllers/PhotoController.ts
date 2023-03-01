import { Request, Response } from 'express';
import multer from 'multer';
import multerConfig from '../config/multer';

const upload = multer(multerConfig).single('photo');

class PhotoController {
  async create(req: Request, res: Response){
    return upload(req, res, (error) => {
      if(error){
        return res.status(400).json({
          errors: [error.code]
        });
      }
      return res.json(req.file);
    });
  }
}


export default new PhotoController();
