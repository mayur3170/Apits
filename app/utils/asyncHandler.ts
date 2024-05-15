import db from "../models";

// const functionName = db.users.getAll();
const asyncHandler = (cb: Function) => async (req: any, res: any, next: any): Promise<boolean> => {
    try {
        await cb(req, res, next);
    } catch (err) {
        return res.status(500).json({
            status: 'error',
            message: err.message
        });
    }
    return true;
}

export {
    asyncHandler
}