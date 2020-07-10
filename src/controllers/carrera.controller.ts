import { Request,Response, request } from 'express';
import { connect } from '../database'
import { Carrera } from '../models/Carrera';
import {Busquedas} from '../models/Busqueda';

export async function getCarrera(req: Request, res: Response): Promise<Response> {
    res.header('Access-Control-Allow-Origin', "*");
    res.header('Access-Control-Allow-Headers', "*");
	const id = req.params.carreraId;
	const tipo = req.params.tipo;
    const conn = await connect();
	try {
		let peticion = await conn.query(
		`select c.Id_carrera,c.Nombre as nombre_carrera,c.Imagen as imagen_carrera
		from Carrera c
		where c.Id_carrera = ${id};`);
		
		let carrera = new Carrera( peticion[0][0] ); 
		// console.log(carrera);

		peticion = await conn.query(
			`select h.Id_herramienta,h.Nombre,Link,h.Icono,Descripcion,Pros,Contras,Costo
			from Herramienta h
			join Carrera_Herramienta ch on ch.Id_herramienta=h.Id_herramienta
			join Carrera c on c.Id_carrera=ch.Id_carrera
			where c.Id_carrera= ${id};`
		);

		// console.log(peticion[0]);
		carrera.Herramientas = peticion[0];
		// console.log(carrera);

		peticion = await conn.query(
			`select  m.Id_materia,m.Nombre,m.Dificultad,a.Imagen, a.Id_materia, a.Titulo
			from Materia m
			join Carrera_Materia cm on cm.Id_materia=m.Id_materia
			join Carrera c on c.Id_carrera=cm.Id_carrera
			join Apuntes a on m.Id_materia=a.Id_materia
			where c.Id_carrera = ${id};`
		);

		carrera.Materias = peticion[0];
		// console.log(carrera);

		peticion = await conn.query(
			`select cc.Id_curso,c.Nombre,Link,Descripcion,Costo,c.Imagen
			from Cursos c
			join Carrera_Cursos cc on cc.Id_curso=c.Id_curso
			join Carrera ca on ca.Id_carrera=cc.Id_carrera
			where ca.Id_carrera= ${id};`
		);
		
		carrera.Cursos = peticion[0];
		// console.log(carrera);


		
		peticion = await conn.query(
			`select Nombre,Link,Posicion 
			from Escuela
			where Id_carrera=${id}
			order by 3;`
		);
		
		carrera.Ranking = peticion[0];
		// console.log(carrera);
		return res.json(carrera);
	} catch (error) {
		console.log(error);
		return res.json(null);		
	}
} 

export async function getSearch(req: Request, res: Response): Promise<Response> {
    res.header('Access-Control-Allow-Origin', "*");
    res.header('Access-Control-Allow-Headers', "*");
	const text:String = req.params.text;
	const conn = await connect();
	// var request = new sql.Request();
	try {
		const statement = await conn.prepare(
			`select c.Id_carrera,c.Nombre as nombre_carrera,c.Imagen as imagen_carrera
			from Carrera c
			where c.Nombre like @parametro;

			select top 1 h.Nombre,h.Icono,c.Id_carrera
			from Herramienta h
			join Carrera_Herramienta ch on ch.Id_herramienta=h.Id_herramienta
			join Carrera c on c.Id_carrera=ch.Id_carrera
			where h.Descripcion like @parametro or h.Nombre like @parametro;
			
			select c.Nombre,Icono, ca.Id_carrera
			from Cursos c
			join Carrera_Cursos cc on cc.Id_cursos=c.Id_curso
			join Carrera ca on ca.Id_carrera=cc.Id_carrera
			where c.Nombre like @parametro or c.Descripcion like @parametro;

			select  m.Nombre, a.Titulo, c.Id_carrera
			from Materia m
			join Carrera_Materia cm on cm.Id_materia=m.Id_materia
			join Carrera c on c.Id_carrera=cm.Id_carrera
			join Apuntes a on m.Id_materia=a.Id_materia
			where a.Titulo like @parametro or m.Nombre like @parametro;`
		);
		const result = await statement.execute({
			parametro: `%${text}%`
		});
		await statement.unprepare();
		return res.json(new Busquedas(result.recordsets));
	} catch (error) {
		console.log(error);
		return res.json(null);		
	}
} 