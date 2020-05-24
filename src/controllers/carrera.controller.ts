import { Request,Response, request } from 'express'
import {connect} from '../database'

var sql= require('mssql');

export async function getCarrera(req: Request, res: Response): Promise<Response> {
    res.header('Access-Control-Allow-Origin', "*");
    res.header('Access-Control-Allow-Headers', "*");
    const id = req.params.carreraId;
    const conn = await connect();
    var request=new sql.Request();
    let carrera = await request.query(`select c.Id_carrera,c.Nombre as nombre_carrera,c.Imagen as imagen_carrera,r.Escuela,r.Escuela2,r.Escuela3,r.Escuela4,r.Escuela5,t.Id_temario
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
    
	select Id_curso,c.Nombre,Link,Descripcion,Costo,c.Imagen
	from Cursos c
	join Carrera_Cursos cc on cc.Id_cursos=c.Id_curso
	join Carrera ca on ca.Id_carrera=cc.Id_carrera
	where ca.Id_carrera= ${id};`);
    return res.json(carrera.recordsets);
    //return res.json(id);
} 