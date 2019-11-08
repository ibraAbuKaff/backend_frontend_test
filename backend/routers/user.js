import express from "express";
import User from "../models/User";
import Auth from "../middleware/auth";

const router = express.Router()
router.post('/users', async (req, res) => {
    try {
        const user = new User(req.body);
        await user.save();
        const token = await user.generateAuthToken();
        res.status(201).send({user, token});
    } catch (error) {
        res.status(400).send(error)
    }
});

router.post('/users/login', async (req, res) => {
    try {
        const {email, password} = req.body
        const user = await User.findByCredentials(email, password)
        if (!user) {
            return res.status(401).send({error: 'Login failed! Check authentication credentials'})
        }
        const token = await user.generateAuthToken()

        console.log(token)
        res.send({user, token})
    } catch (error) {
        res.status(400).send(error)
    }

});

router.get('/users/me', Auth, async (req, res) => {
    res.send(req.user)
});

router.post('/users/me/logout', Auth, async (req, res) => {
    try {
        req.user.tokens = req.user.tokens.filter((token) => {
            return token.token !== req.token;
        })
        await req.user.save();
        res.send();
    } catch (error) {
        res.status(500).send(error);
    }
});

export default router