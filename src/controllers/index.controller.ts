import {Request,Response} from 'express'
import {connect} from '../database'

var sql= require('mssql');
export async function getNombresTipo(req: Request, res: Response): Promise<Response>{
    res.header('Access-Control-Allow-Origin', "*");
    res.header('Access-Control-Allow-Headers', "*");
    const conn = await connect();
    var request=new sql.Request();
    let carrera = await request.query(`select Id_Tipo,Nombre from Carrera;`);
    return res.json(carrera.recordsets);
};