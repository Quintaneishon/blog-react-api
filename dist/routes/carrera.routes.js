"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const router = express_1.Router();
const carrera_controller_1 = require("../controllers/carrera.controller");
router.route('/:carreraId')
    .get(carrera_controller_1.getCarrera);
exports.default = router;
