// import {Request,Response} from 'express'
// import {connect} from '../database'

// var sql= require('mssql');
// export async function getNombresTipo(req: Request, res: Response): Promise<Response>{
//     res.header('Access-Control-Allow-Origin', "*");
//     res.header('Access-Control-Allow-Headers', "*");
//     const conn = await connect();
//     var request=new sql.Request();
//     let carrera = await request.query(`select Id_Tipo,Nombre,Icono from Carrera;`);
//     return res.json(carrera.recordsets);
// };

import {Request,Response} from 'express'
import { pool } from '../database'

var sql= require('mariadb');
export async function getNombresTipo(req: Request, res: Response): Promise<Response>{
    res.header('Access-Control-Allow-Origin', "*");
    res.header('Access-Control-Allow-Headers', "*");
    try{
        const conn = await pool.getConnection();
        let carrera = await conn.query(`select Id_Tipo,Nombre,Icono from Carrera;`);
        console.log(carrera);
        return res.json(carrera.recordsets);
    } catch (error) {
		console.log(error);
		return res.json(null);		
	}
};