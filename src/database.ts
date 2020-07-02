// var sql = require("mssql");

// export async function connect() {
//     var config = {
//         user: 'sa',
//         password: '83197',
//         //server: 'DESKTOP-B0KSOD0',
//         server: 'DESKTOP-17HHG00',
//         database: 'EducationHub'
//     };

//     const conn=await sql.connect(config);
//     return conn;
// }

const mariadb = require('mariadb');

export const pool = mariadb.createPool({
    // host: '',
    user:'YOUR_SYSTEM_USER', 
    password: '',
    database: 'educationhub'
});

