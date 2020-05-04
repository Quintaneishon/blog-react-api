var sql = require("mssql");

export async function connect() {
    var config = {
        user: 'sa',
        password: '83197',
        server: 'DESKTOP-B0KSOD0',
        //server: 'DESKTOP-17HHG00',
        database: 'EducationHub'
    };

    const conn=await sql.connect(config);
    return conn;
}