import { Router } from 'express';
const router = Router();

import { getNombresTipo } from '../controllers/index.controller'

router.route('/')
    .get(getNombresTipo);

export default router;