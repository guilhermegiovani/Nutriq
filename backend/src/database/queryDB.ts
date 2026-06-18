import pool from "./db.js";

export async function queryDB(query: string, params?: any[]): Promise<any> {
    return await pool.query(query, params ?? []);
}