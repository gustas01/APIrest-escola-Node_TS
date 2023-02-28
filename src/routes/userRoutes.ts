import { Router } from 'express';
import userController from '../controllers/UserController';

const router = Router();

router.get('/', userController.index);
router.post('/', userController.create);
router.get('/:id', userController.read);
router.put('/:id', userController.update);
router.delete('/:id', userController.delete);

export default router;
