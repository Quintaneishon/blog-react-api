import { createPool } from 'mysql2/promise';

export async function connect() {

    
    return await createPool({
        host: 'localhost',
        user: 'root',
        password: 'password',
        database: 'EducationHub',
        connectionLimit: 10,
        port: 3307,
    });

}
