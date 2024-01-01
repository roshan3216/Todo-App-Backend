import Database from '../db/db.js';

const db = await Database();

export const getAllTodos = async ( req , res ) =>{
    try {
        const rows = await db.all('SELECT id , to_do AS todo FROM todos ;');
        console.log(rows,'[rows]-[getAllTodos]');

        return res.status(200).json(rows);
    } catch (err) {
        console.error(err, '[error in getting all todos');
        return res.status(500).json('Internal Server Error');
    }


}

export const createTodo = async ( req, res ) => {
    const body = req.body;
    console.log(body,'[body]-[saveTodo]');

    if(!body || !body.todo){
        return res.status(404).json('Please provide the correct params');
    }
    try {
        const response = await db.run(`
            INSERT INTO todos (to_do) VALUES ( ? );
        `,
        [body.todo]
        );
        console.log(response, ' [response]-[saveTodo]');

        return res.status(201).json('Record inserted');

    } catch (err) {
        console.error(err,'[error in saveTodo]');
        return res.status(500).json('Internal Server Error');
    }


}

export const updateTodo = async ( req , res ) =>{
    const body = req.body;
    // const { id , text } = body;

    console.log({body} , '[body]-[updateTodo]');
    if(!body || !body.todo || !body.id){
        return res.status(404).json('Please provide the correct params');
    }

    try {
        const response = await db.run(`
            UPDATE todos SET to_do = ? WHERE id = ? ;
        `,
        [body.todo, body.id]
        );
        console.log(response, '[response]-[updateTodo]');
        return res.status(200).json('Record Updated Successfully');
    } catch (err) {
        console.error(err, '[erorr in updateTodo]');

        return res.status(500).json('Internal Server Error');
        
    }
}

export const deleteTodo = async ( req , res ) =>{
    const body = req.body;
    // const { id , text } = body;

    console.log({body} , '[body]-[deleteTodo]');
    if(!body || !body.id){
        return res.status(404).json('Please provide the correct params');
    }
    try {
        const response = await db.run(`
            DELETE FROM todos WHERE id = ? ;
        `,
        [body.id]
        );

        console.log(response, '[response]-[deleteTodo]');
        return res.status(200).json('Record deleted successfully');
    } catch (err) {
        console.error(err, '[error in deleTodo]');

        return res.status(500).json('Internal Server Error');
    }

}

export const searchTodo = async ( req , res ) =>{
    const body = req.body;
    // const { id , text } = body;
    console.log({body} , '[body]-[searchTodo]');
    if(!body || !body.todo){
        return res.status(404).json('Please provide the correct params');
    }
    const s = ''; s.toLowerCase();
    s.trim().toLowerCase();
    try {
        const todo = body.todo.split(' ').filter((t) => t.length)
        const searchParams = todo.map((t) => `LOWER(todo) LIKE '%${t}%'`).join(' OR ');
        console.log(todo,'[todo]-searchTodo]');
        console.log(searchParams,'[searchParams]');
        const query = `
            SELECT id, to_do AS todo FROM todos WHERE ${searchParams};
        `

        console.log(query, '[query]');
        const response = await db.all(query);
    
        console.log(response,'[response]-[searchTodo]');
        return res.status(200).json(response);
    } catch (err) {
        console.error(err, '[error in searchTodo]');
        return res.status(500).json('Internal Server Error');
    }

}