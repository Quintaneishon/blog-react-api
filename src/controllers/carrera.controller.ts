import { Request,Response, request } from 'express';
import {connect} from '../database';
import {Carrera} from '../models/Carrera';

var sql= require('mssql');

export async function getCarrera(req: Request, res: Response): Promise<Response> {
    res.header('Access-Control-Allow-Origin', "*");
    res.header('Access-Control-Allow-Headers', "*");
    const id = req.params.carreraId;
    const conn = await connect();
    var request=new sql.Request();
	try {
		let peticion = await request.query(
		`select c.Id_carrera,c.Nombre as nombre_carrera,c.Imagen as imagen_carrera
		from Carrera c
		where c.Id_carrera = ${id};

		select h.Id_herramienta,h.Nombre,Link,h.Icono,Descripcion,Pros,Contras,Costo
		from Herramienta h
		join Carrera_Herramienta ch on ch.Id_herramienta=h.Id_herramienta
		join Carrera c on c.Id_carrera=ch.Id_carrera
		where c.Id_carrera= ${id};
		
		select  m.Id_materia,m.Nombre,m.Dificultad,a.Imagen, a.Id_materia, a.Titulo
		from Materia m
		join Carrera_Materia cm on cm.Id_materia=m.Id_materia
		join Carrera c on c.Id_carrera=cm.Id_carrera
		join Apuntes a on m.Id_materia=a.Id_materia
		where c.Id_carrera = ${id};
		
		select Id_curso,c.Nombre,Link,Descripcion,Costo,c.Imagen
		from Cursos c
		join Carrera_Cursos cc on cc.Id_cursos=c.Id_curso
		join Carrera ca on ca.Id_carrera=cc.Id_carrera
		where ca.Id_carrera= ${id};
		
		select Nombre,Link,Posicion 
		from Escuela
		where Id_carrera=${id}
		order by 3;`);
		const objeto:Carrera = new Carrera(peticion.recordsets);
		return res.json(objeto);
	} catch (error) {
		console.log(error);
		return res.json(null);		
	}
	// console.log(peticion.recordsets);
} 

export async function getSearch(req: Request, res: Response): Promise<Response> {
    res.header('Access-Control-Allow-Origin', "*");
    res.header('Access-Control-Allow-Headers', "*");
	const text:String = req.params.text;
	const conn = await connect();
    var request = new sql.Request();
	try {
		let peticion = await request.query(
			`select c.Id_carrera,c.Nombre as nombre_carrera,c.Imagen as imagen_carrera
			from Carrera c
			where c.Nombre like '%${text}%';

			select top 1 h.Nombre,h.Icono,c.Id_carrera
			from Herramienta h
			join Carrera_Herramienta ch on ch.Id_herramienta=h.Id_herramienta
			join Carrera c on c.Id_carrera=ch.Id_carrera
			where h.Descripcion like '%${text}%' or h.Nombre like '%${text}%';
			
			select  m.Nombre, a.Titulo, c.Id_carrera
			from Materia m
			join Carrera_Materia cm on cm.Id_materia=m.Id_materia
			join Carrera c on c.Id_carrera=cm.Id_carrera
			join Apuntes a on m.Id_materia=a.Id_materia
			where a.Titulo like '%${text}%' or m.Nombre like '%${text}%';
			
			select c.Nombre,Descripcion, ca.Id_carrera
			from Cursos c
			join Carrera_Cursos cc on cc.Id_cursos=c.Id_curso
			join Carrera ca on ca.Id_carrera=cc.Id_carrera
			where c.Nombre like '%${text}%' or c.Descripcion like '%${text}%';`
		)
		return res.json(peticion.recordsets);
	} catch (error) {
		console.log(error);
		return res.json(null);		
	}
	// console.log(peticion.recordsets);
} 