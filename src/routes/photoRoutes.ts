/* eslint-disable @typescript-eslint/no-unused-vars */
import { Router } from 'express';
import photoController from '../controllers/PhotoController';
import loginRequired from '../middlewares/loginRequired';


const router = Router();

router.post('/', loginRequired, photoController.create);

export default router;
