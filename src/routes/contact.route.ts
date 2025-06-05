import { Router } from 'express';
import {
  getContacts,
  createContact,
  updateContact,
  deleteContact,
} from '../controllers/contact.controller';
import { verifyToken } from '../middlewares/auth.middleware';
import { authorize } from '../middlewares/role.middleware';

const router = Router();

// All routes below are protected
router.use(verifyToken);

router.get('/', authorize(['admin', 'viewer']), getContacts);
router.post('/', authorize(['admin']),createContact);
router.put('/:id', authorize(['admin']), updateContact);
router.delete('/:id', authorize(['admin']), deleteContact);

export default router;
