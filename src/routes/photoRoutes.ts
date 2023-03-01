/* eslint-disable @typescript-eslint/no-unused-vars */
import { Router } from 'express';
import photoController from '../controllers/PhotoController';

import multer from 'multer';
import multerConfig from '../config/multer';

const upload = multer(multerConfig);

const router = Router();

router.post('/', upload.single('photo'), photoController.index);

export default router;
