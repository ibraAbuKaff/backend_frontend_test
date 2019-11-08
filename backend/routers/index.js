import express from "express";
import User from "../models/User";
import ContractorRequest from "../models/ContractorRequest";
import Auth from "../middleware/auth";


//todo : add controllers
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


router.post('/contractors/requests', Auth, async (req, res) => {
    // todo: move 'contractor' as a value to constants
    if (req.user.type_of_user !== "contractor") {
        res.status(401).send({error: 'Not authorized to access this resource'})
    }

    let data = req.body;
    data.user_id = req.user._id;
    try {
        const contractorReq = new ContractorRequest(req.body);
        await contractorReq.save();
        res.status(201).send(contractorReq);
    } catch (error) {
        res.status(400).send(error)
    }

});

router.get('/contractors/requests', Auth, async (req, res) => {
    // todo: move contractor as a value to constants
    if (req.user.type_of_user !== "contractor") {
        res.status(401).send({error: 'Not authorized to access this resource'})
    }

    const page = req.query.page || 1;
    const status = req.query.status || 'awaiting';

    try {
        const results = await ContractorRequest.getRequests(req.user._id, status, page);
        res.send(results);
    } catch (error) {
        res.status(400).send(error)
    }

});


export default router