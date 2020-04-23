import { Request,Response } from 'express'

import {connect} from '../database'

export async function getCarrera(req: Request, res: Response): Promise<Response> {
    const id = req.params.carreraId;
    //const conn = await connect();
    //const carrera = await conn.query('select * from Carreras wjere id = ?', [id]);
    //return res.json(carrera[0]);
    return res.json(id);
} 