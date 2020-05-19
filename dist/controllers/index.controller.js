"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const database_1 = require("../database");
var sql = require('mssql');
function getNombresTipo(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        res.header('Access-Control-Allow-Origin', "*");
        res.header('Access-Control-Allow-Headers', "*");
        const conn = yield database_1.connect();
        var request = new sql.Request();
        let carrera = yield request.query(`select Id_Tipo,Nombre,Icono from Carrera;`);
        return res.json(carrera.recordsets);
    });
}
exports.getNombresTipo = getNombresTipo;
;
