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
function getCarrera(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        res.header('Access-Control-Allow-Origin', "*");
        res.header('Access-Control-Allow-Headers', "*");
        const id = req.params.carreraId;
        const conn = yield database_1.connect();
        var request = new sql.Request();
        let carrera = yield request.query(`select c.Id_carrera,c.Nombre as nombre_carrera,c.Imagen as imagen_carrera,r.Escuela,r.Escuela2,r.Escuela3,r.Escuela4,r.Escuela5,t.Id_temario
	from Carrera c,Ranking r, Temario t
	where c.Id_carrera = ${id}
	and r.Id_carrera = ${id}
    and t.Id_carrera= ${id};

    select h.Id_herramienta,h.Nombre,Link,h.Icono,Descripcion,Pros,Contras,Costo
	from Herramienta h
	join Carrera_Herramienta ch on ch.Id_herramienta=h.Id_herramienta
	join Carrera c on c.Id_carrera=ch.Id_carrera
    where c.Id_carrera= ${id};
    
	Select  m.Id_materia,m.Titulo,m.Descripcion,m.Dificultad,a.Imagen
	from Materia m
	join Apuntes a on m.Id_materia=a.Id_materia
	join Temario t on t.Id_temario=m.Id_temario
    where t.Id_carrera = ${id};
    
	select Id_curso,c.Nombre,Link,Descripcion 
	from Cursos c
	join Carrera_Cursos cc on cc.Id_cursos=c.Id_curso
	join Carrera ca on ca.Id_carrera=cc.Id_carrera
	where ca.Id_carrera= ${id};`);
        return res.json(carrera.recordsets);
        //return res.json(id);
    });
}
exports.getCarrera = getCarrera;
