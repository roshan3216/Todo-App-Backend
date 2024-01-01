import sqlite3 from 'sqlite3';
import { open } from 'sqlite';
import fs from 'fs';

// (async () => {
//     const db = await open({
//       filename: '/tmp/database.db',
//       driver: sqlite3.cached.Database
//     });
//     // return db;
// })()

sqlite3.verbose();

const connectDb = async () =>{
    const filename = './db/todos.db';
    const fileExists = fs.existsSync(filename);
    // console.log(fileExists,'[temp]');
    // console.log(process.cwd(),'[CWD]');
    try {
        const db = await open({
            filename ,
            driver: sqlite3.cached.Database,
        });

        if(!fileExists){
            await db.exec(`CREATE TABLE todos (
                id INTEGER PRIMARY KEY AUTOINCREMENT, 
                to_do VARCHAR(200) NOT NULL,
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL, 
                deleted_at TIMESTAMP DEFAULT NULL);`
            );
            console.log('Todos table created');
        }

        console.log('Connected to db successfully');
        return db;
        
    } catch (err) {
        console.error(err,'[error in connecting with database]');
        throw new Error ('Could not connect to database');
    }

}
// connectDb();
export default connectDb;