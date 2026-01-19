import { client,connectDB } from "./client";


export async function createUser(
    username: string,
     password: string,
     name: string
    ) {
     await connectDB();


    const query = `INSERT INTO users (username, password, name) VALUES ($1, $2, $3) RETURNING *`;
    const result  = await client.query(query, [username, password, name]);
    return result.rows[0];
}

export async function getUser(id: number) {
    await connectDB();
    
    const query = `SELECT * FROM users WHERE id = $1`;
    const result = await client.query(query, [id]);
    return result.rows[0];
}


