import { Router } from "express";
// import { IUser } from "../models/user";
import db from "../models";

const router = Router();

const userq = db.users.getAll();


router.post('/', async (req, res)=>{
    try{
        const users = await db.users.adduser(req.body);
        res.json(users);
    }
    catch(error){
        res.status(500).json(error)
        console.log(error);
    }
});

router.get('/', async (req, res)=>{
    try{
        const users = await userq;
        res.json(users);
    }
    catch(error){
        res.status(500).json(error)
        console.log(error);
    }
});

router.get('/:id', async (req, res)=>{
    const id = req.params.id;
    try{
        const users = await db.users.getOne(id);
        if(!users.length){
            res.status(401).json("user not Found");
        }
        res.json(users);
    }
    catch(error){
        res.status(500).json(error);
        console.log(error);
    }
});

router.put('/:id', async (req, res)=>{
    const {name, email}  = req.body;
    const id = req.params.id;
    try{
        const users = await db.users.update(id,req.body);
        res.json(users);
    }
    catch(error){
        res.status(500).json(error)
        console.log(error);
    }


});

router.delete('/:id', async (req, res)=>{
    const {name, email}  = req.body;
    const id = req.params.id;
    try{
        const users = await db.users.deleteOne(id);
        res.json(users);
    }
    catch(error){
        res.status(500).json(error)
        console.log(error);
    }
});

export default router;