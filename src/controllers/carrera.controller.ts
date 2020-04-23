import { Request,Response, request } from 'express'
import {connect} from '../database'

var sql= require('mssql');

export async function getCarrera(req: Request, res: Response): Promise<Response> {
    const id = req.params.carreraId;
    const conn = await connect();
    var request=new sql.Request();
    const carrera = await request.query(`select *
    from Carrera c  
    join Ranking r on c.Id_carrera=r.Id_carrera
    join Herramienta h on h.Id_carrera=c.Id_carrera
    join Temario t on t.Id_carrera=c.Id_carrera
    join Materia m on m.Id_temario=t.Id_temario
    join Apuntes a on a.Id_materia=m.Id_materia
    where c.Id_carrera=${id}`);
    console.log(carrera);
    return res.json(carrera.recordset);
    //return res.json(id);
} 