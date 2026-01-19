import {Client} from "pg";
import { DB_URL } from "../config";

export const client = new Client({
    connectionString: DB_URL,
});

export async function connectDB() {
    if((client as any)._connected) return;
    await client.connect();
    (client as any)._connected = true;
}