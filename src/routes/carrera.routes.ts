import { Router } from 'express'
const router = Router();

import { getCarrera } from '../controllers/carrera.controller'
router.route('/:carreraId')
    .get(getCarrera);

export default router;