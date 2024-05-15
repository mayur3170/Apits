import { ResultSetHeader } from "mysql2";
import pool from "../database/connection";

 export async function selectQuery<T>(queryString:string, param?:any[]):Promise<Partial<T>[]> {
    const [results] = await pool.execute(queryString, param);
    return results as [T];    
}

 export async function modifyQuery<T>(queryString:string, param: any[]):Promise<ResultSetHeader> {
    const [results] = await pool.query(queryString, param);
    return results as ResultSetHeader;    
}
