/* eslint-disable @typescript-eslint/no-unused-vars */
import { Router } from 'express';
import photoController from '../controllers/PhotoController';


const router = Router();

router.post('/', photoController.create);

export default router;
