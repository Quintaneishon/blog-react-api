var sql = require("mssql");

export async function connect() {
    var config = {
        user: 'test123',
        password: 'test',
        server: 'localhost',
        database: 'node_db'
    };

    await sql.connect(config, function (err: any) {
        if (err) console.log(err);
    });

    var request = new sql.Request();
    return request;
}