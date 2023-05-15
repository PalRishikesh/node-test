import { createPool } from 'mysql2/promise';

export async function DbConnection(){
    const pool = createPool({
        host        : process.env.HOST,
        user        : process.env.DB_USERNAME,
        password    :process.env.DB_PASSWORD,
        database    :process.env.DB_DATABASE,
        connectionLimit:10,
        multipleStatements:true
    });
    console.log("connection: ", pool);
    
    return pool;
}

module.exports = {
    DbConnection
}