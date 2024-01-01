import express from 'express';
import pkg from 'sqlite3';
const {sqlite3} = pkg;
import bodyParser from 'body-parser';
import cors from 'cors';

import routes from './routes/routes.js';
import db from './db/db.js';

const app = express();

app.use(bodyParser.json({extended: true}));
app.use(bodyParser.urlencoded({extended: true}));

app.use(cors());

app.use('/todo', routes);

const port = process.env.PORT || 9000;
// console.log(port,'[port]');

app.listen(port, async () =>{
    // await db();
    console.log(`Server running on port = ${port}`);
})