import { Router } from 'express'
const router = Router();

import { getCarrera, getSearch } from '../controllers/carrera.controller'
router.route('/:carreraId')
    .get(getCarrera);
router.route('/search/:text')
    .get(getSearch);
export default router;