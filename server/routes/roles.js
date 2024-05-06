import express from 'express';
import { createRole, deleteRole, readRoles, updateRole } from '../controllers/roles.controller.js';

const router = express.Router();

router.post('/create', createRole);
router.get('/getAll', readRoles);
router.put('/update/:id', updateRole);
router.delete('/delete/:id', deleteRole);

export default router;