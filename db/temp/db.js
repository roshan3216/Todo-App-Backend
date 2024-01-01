// const sqlite3 = require("sqlite3").verbose();
import sqlite3 from "sqlite3";
import fs from 'fs';
const filepath = "./db/fish.db";

function createDbConnection() {
    if (fs.existsSync(filepath)) {
        console.log('Database already exists');
        return new sqlite3.Database(filepath);
    } else {
        const db = new sqlite3.Database(filepath, (error) => {
            if (error) {
                return console.error(error.message);
            }
            createTable(db);
        });
        console.log("Connection with SQLite has been established");
        return db;
    }
}

function createTable(db) {
    db.exec(`
    CREATE TABLE sharks
    (
        ID INTEGER PRIMARY KEY AUTOINCREMENT,
        name   VARCHAR(50) NOT NULL,
        color   VARCHAR(50) NOT NULL,
        weight INTEGER NOT NULL
    );
    `);
}

// createDbConnection();
export {createDbConnection};