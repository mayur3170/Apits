import express, { Request, Response } from 'express';
import userRouter from './contollers/user';
import db from "./models";

const app = express();
app.use(express.json());

app.use('/user', userRouter);



app.get('/', (req: Request, res: Response) =>{
    res.send("get")
})



app.listen(3000, ()=>{console.log("server running on 3000")})