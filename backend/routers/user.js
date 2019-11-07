import express from "express";

const router = express.Router();

router.get('/users', async (req, res) => {
    res.status(200).send({"name": "ewfewfew"})

});

export default router