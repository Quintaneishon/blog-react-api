import { Request,Response, request } from 'express';
import { pool } from '../database';
import {Carrera} from '../models/Carrera';
import {Busquedas} from '../models/Busqueda';
import { ConnectionError } from 'mssql';

var sql= require('mariadb');

export async function getCarrera(req: Request, res: Response): Promise<Response> {
    res.header('Access-Control-Allow-Origin', "*");
    res.header('Access-Control-Allow-Headers', "*");
	const id = req.params.carreraId;
	const tipo = req.params.tipo;
    const conn = await pool.getConnection();
	try {
		const peticion = await pool.query(
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
		console.log(peticion);
		const objeto:Carrera = new Carrera(peticion.recordsets);
		objeto.tipo = tipo;
		return res.json(objeto);
	} catch (error) {
		console.log(error);
		return res.json(null);		
	}
} 

export async function getSearch(req: Request, res: Response): Promise<Response> {
    res.header('Access-Control-Allow-Origin', "*");
    res.header('Access-Control-Allow-Headers', "*");
	const text:String = req.params.text;
	const conn = await pool.getConnection();
	try {
		const statement = await conn.query(
			`select c.Id_carrera,c.Nombre as nombre_carrera,c.Imagen as imagen_carrera
			from Carrera c
			where c.Nombre like ?;

			select top 1 h.Nombre,h.Icono,c.Id_carrera
			from Herramienta h
			join Carrera_Herramienta ch on ch.Id_herramienta=h.Id_herramienta
			join Carrera c on c.Id_carrera=ch.Id_carrera
			where h.Descripcion like ? or h.Nombre like ?;
			
			select c.Nombre,Icono, ca.Id_carrera
			from Cursos c
			join Carrera_Cursos cc on cc.Id_cursos=c.Id_curso
			join Carrera ca on ca.Id_carrera=cc.Id_carrera
			where c.Nombre like ? or c.Descripcion like ?;

			select  m.Nombre, a.Titulo, c.Id_carrera
			from Materia m
			join Carrera_Materia cm on cm.Id_materia=m.Id_materia
			join Carrera c on c.Id_carrera=cm.Id_carrera
			join Apuntes a on m.Id_materia=a.Id_materia
			where a.Titulo like ? or m.Nombre like ?;`,
			[
				`%${text}%`,
				`%${text}%`,
				`%${text}%`,
				`%${text}%`,
				`%${text}%`,
				`%${text}%`,
				`%${text}%`,
			]
		);
		console.log(statement);
		return res.json(new Busquedas(statement.recordsets));
	} catch (error) {
		console.log(error);
		return res.json(null);		
	}
} 

// import { Request,Response, request } from 'express';
// import {connect} from '../database';
// import {Carrera} from '../models/Carrera';
// import {Busquedas} from '../models/Busqueda';

// var sql= require('mssql');

// export async function getCarrera(req: Request, res: Response): Promise<Response> {
//     res.header('Access-Control-Allow-Origin', "*");
//     res.header('Access-Control-Allow-Headers', "*");
// 	const id = req.params.carreraId;
// 	const tipo = req.params.tipo;
//     const conn = await connect();
//     var request=new sql.Request();
// 	try {
// 		let peticion = await request.query(
// 		`select c.Id_carrera,c.Nombre as nombre_carrera,c.Imagen as imagen_carrera
// 		from Carrera c
// 		where c.Id_carrera = ${id};

// 		select h.Id_herramienta,h.Nombre,Link,h.Icono,Descripcion,Pros,Contras,Costo
// 		from Herramienta h
// 		join Carrera_Herramienta ch on ch.Id_herramienta=h.Id_herramienta
// 		join Carrera c on c.Id_carrera=ch.Id_carrera
// 		where c.Id_carrera= ${id};
		
// 		select  m.Id_materia,m.Nombre,m.Dificultad,a.Imagen, a.Id_materia, a.Titulo
// 		from Materia m
// 		join Carrera_Materia cm on cm.Id_materia=m.Id_materia
// 		join Carrera c on c.Id_carrera=cm.Id_carrera
// 		join Apuntes a on m.Id_materia=a.Id_materia
// 		where c.Id_carrera = ${id};
		
// 		select Id_curso,c.Nombre,Link,Descripcion,Costo,c.Imagen
// 		from Cursos c
// 		join Carrera_Cursos cc on cc.Id_cursos=c.Id_curso
// 		join Carrera ca on ca.Id_carrera=cc.Id_carrera
// 		where ca.Id_carrera= ${id};
		
// 		select Nombre,Link,Posicion 
// 		from Escuela
// 		where Id_carrera=${id}
// 		order by 3;`);
// 		const objeto:Carrera = new Carrera(peticion.recordsets);
// 		objeto.tipo = tipo;
// 		return res.json(objeto);
// 	} catch (error) {
// 		console.log(error);
// 		return res.json(null);		
// 	}
// } 

// export async function getSearch(req: Request, res: Response): Promise<Response> {
//     res.header('Access-Control-Allow-Origin', "*");
//     res.header('Access-Control-Allow-Headers', "*");
// 	const text:String = req.params.text;
// 	const conn = await connect();
// 	// var request = new sql.Request();
// 	const ps = new sql.PreparedStatement();
// 	try {
// 		ps.input('parametro', sql.NVarChar);
// 		const statement = await ps.prepare(
// 			`select c.Id_carrera,c.Nombre as nombre_carrera,c.Imagen as imagen_carrera
// 			from Carrera c
// 			where c.Nombre like @parametro;

// 			select top 1 h.Nombre,h.Icono,c.Id_carrera
// 			from Herramienta h
// 			join Carrera_Herramienta ch on ch.Id_herramienta=h.Id_herramienta
// 			join Carrera c on c.Id_carrera=ch.Id_carrera
// 			where h.Descripcion like @parametro or h.Nombre like @parametro;
			
// 			select c.Nombre,Icono, ca.Id_carrera
// 			from Cursos c
// 			join Carrera_Cursos cc on cc.Id_cursos=c.Id_curso
// 			join Carrera ca on ca.Id_carrera=cc.Id_carrera
// 			where c.Nombre like @parametro or c.Descripcion like @parametro;

// 			select  m.Nombre, a.Titulo, c.Id_carrera
// 			from Materia m
// 			join Carrera_Materia cm on cm.Id_materia=m.Id_materia
// 			join Carrera c on c.Id_carrera=cm.Id_carrera
// 			join Apuntes a on m.Id_materia=a.Id_materia
// 			where a.Titulo like @parametro or m.Nombre like @parametro;`
// 		);
// 		const result = await statement.execute({
// 			parametro: `%${text}%`
// 		});
// 		await statement.unprepare();
// 		return res.json(new Busquedas(result.recordsets));
// 	} catch (error) {
// 		console.log(error);
// 		return res.json(null);		
// 	}
// } 