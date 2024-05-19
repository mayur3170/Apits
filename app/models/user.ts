import { RowDataPacket } from "mysql2";
import { modifyQuery, selectQuery } from "../utils/queryhandler"

export interface IUser extends RowDataPacket{
    id:number,
    name:string,
    email:string,
    password:string
}

// getupdate
export function adduser(body:string){
    return modifyQuery<IUser>('INSERT into users SET ?',[body]);   
}
// get all
export function getAll(){
   return selectQuery<IUser>('SELECT * FROM users');
}
// getByid
export function getOne(id:string, body?:string){
    return selectQuery<IUser>(`SELECT * FROM users WHERE id = ?`, [id]);
}
// getByEmail
export function getByEmail(body?:string){
    return selectQuery<IUser>(`SELECT * FROM users WHERE email = ?`, [body] );
}
 // getupdate
export function update(id:string, body:string){
    return modifyQuery<IUser>('UPDATE users SET ? WHERE users.id = ?',[body,id]);   
}
export function deleteOne(id:string){
    return modifyQuery<IUser>('DELETE FROM users WHERE users.id = ?',[id]);   
}

