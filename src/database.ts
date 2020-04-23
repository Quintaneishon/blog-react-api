var sql = require("mssql");

export async function connect() {
    var config = {
        user: 'sa',
        password: '83197',
        server: 'DESKTOP-B0KSOD0',
        database: 'EducationHub'
    };

    await sql.connect(config, function (err: any) {
        if (err) console.log(err);
    });

    var request = new sql.Request();
    return request;
}