import { Router } from 'express';
import {
  getContacts,
  createContact,
  updateContact,
  deleteContact,
} from '../controllers/contact.controller';
import { verifyToken } from '../middlewares/auth.middleware';

const router = Router();

// All routes below are protected
router.use(verifyToken);

router.get('/', getContacts);
router.post('/', createContact);
router.put('/:id', updateContact);
router.delete('/:id', deleteContact);

export default router;
