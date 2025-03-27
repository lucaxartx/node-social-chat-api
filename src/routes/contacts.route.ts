import { Router } from 'express';
import { authMiddleware } from '../middlewares/auth';
import {
    getContacts,
    getContactById,
    searchContacts,
    sendContactRequest,
    getContactRequests,
    handleContactRequest
} from '../controllers/contacts.controller';

const router = Router();

router.use(authMiddleware);

router.get('/', getContacts);
router.get('/search', searchContacts);
router.get('/:id', getContactById);
router.post('/requests', sendContactRequest);
router.get('/requests', getContactRequests);
router.post('/requests/:requestId/:action', handleContactRequest);

export default router;