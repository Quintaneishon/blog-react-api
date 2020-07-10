import {Request,Response} from 'express'
import { connect } from '../database'

export async function getNombresTipo(req: Request, res: Response): Promise<Response>{
    res.header('Access-Control-Allow-Origin', "*");
    res.header('Access-Control-Allow-Headers', "*");
    const conn = await connect();
    const carrera = await conn.query(`select Id_Tipo,Nombre,Icono from Carrera;`);
    return res.json(carrera[0]);
};