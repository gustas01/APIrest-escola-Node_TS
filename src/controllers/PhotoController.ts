import { Request, Response } from 'express';
import multer from 'multer';
import multerConfig from '../config/multer';
import { IPhoto } from '../interfaces/IPhoto';
import Photo from '../models/Photo';

const upload = multer(multerConfig).single('photo');

class PhotoController {
  create(req: Request, res: Response){
    return upload(req, res, async (error) => {
      if(error){
        return res.status(400).json({
          errors: [error.code]
        });
      }

      try{
        const { originalname, filename } = req.file as IPhoto;
        const { student_id } = req.body;
        const photo = await Photo.create({originalname, filename, student_id});

        return res.json(photo);
      }catch(e: any){
        return res.status(400).json({errors: ['Aluno não existe'],});
      }
    });
  }
}


export default new PhotoController();
