import { Request, Response } from "express";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import db from "../models";
import { stringify } from "querystring";
import pool from "../database/connection";
import { RowDataPacket } from "mysql2";

const saltRounds = 10;
const secret = "3BB3D94936846DC89843BFB7121A7";

export const login = async (req: Request, res: Response) =>{
    const userFound = await db.users.getByEmail(req.body.email);    
    
    if(userFound.length!=0 || userFound[0].password != undefined ){
        try{
        console.log(userFound[0].password);
            const password: string = userFound[0].password || "";
            const isMatched  = await bcrypt.compare(req.body.password, password)
            if(!isMatched){


                res.status(200).json({login: "failed", message:"password Not matched"})
            }
            else{
                
                const token = await jwt.sign({ user_id: userFound[0].user_id }, secret)

                res.status(200).json({login: "success", message:"password matched", token: token})
            }
           
            
        }
        catch(error){
            res.status(500).json(error);
            console.log(error);
        }
    }
    else{
        res.status(200).json({message: "user dosn't exist"})
    }
    
}
export const register = async (req: Request, res: Response) =>{    
    const userFound = await db.users.getByEmail(req.body.email);
    if(userFound.length>0){
            res.status(200).json({message: "user Already exist", user:userFound})
        }
        else{
        try{
            //Encriptar contraseña
            const salt = await bcrypt.genSalt(saltRounds);
            const encryptedPassword = await bcrypt.hash(req.body.password, salt);

            req.body.password = encryptedPassword;

            const users = await db.users.adduser(req.body);
            res.json({message: `User Created with ID ${users.insertId}`});
        }
        catch(error){
            res.status(500).json(error);
            console.log(error);
        }
    }
    
}
