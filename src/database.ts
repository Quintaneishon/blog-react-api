var sql = require("mssql");

export async function connect() {
    var config = {
        user: 'sa',
        password: '83197',
        server: 'DESKTOP-B0KSOD0',
        database: 'EducationHub'
    };

    const conn=await sql.connect(config);
    /*await sql.connect(config, function (err: any) {
        if (err) console.log(err);


        // create Request object


        var request = new sql.Request();


        // query to the database and get the records


        request.query('select * from Carrera',


        function (err:any, recordset:any) {


            if (err) console.log(err)


            // send records as a response


            console.log(recordset);


        });


    });

    var request = new sql.Request();*/
    return conn;
}