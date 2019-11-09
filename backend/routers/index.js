import express from "express";
import User from "../models/User";
import ContractorRequest from "../models/ContractorRequest";
import SupplierBiddings from "../models/SupplierBiddings";
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
        const {email, password} = req.body;
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
        return res.status(401).send({error: 'Not authorized to access this resource'})
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

router.get('/contractors/me/requests', Auth, async (req, res) => {
    // todo: move contractor as a value to constants
    if (req.user.type_of_user !== "contractor") {
        return res.status(401).send({error: 'Not authorized to access this resource'})
    }

    const page = req.query.page || 1;
    const status = req.query.status || 'awaiting';

    try {
        const results = await ContractorRequest.getRequestsByUserId(req.user._id, status, page);
        res.send(results);
    } catch (error) {
        res.status(400).send(error)
    }

});


router.get('/contractors/requests', Auth, async (req, res) => {
    // todo: move supplier as a value to constants
    if (req.user.type_of_user !== "supplier") {
        return res.status(401).send({error: 'Not authorized to access this resource'})
    }

    const page = req.query.page || 1;
    const status = req.query.status || 'awaiting';

    try {
        const results = await ContractorRequest.getAllRequests(status, page);
        res.send(results);
    } catch (error) {
        res.status(400).send(error)
    }

});


router.post('/suppliers/bidding/requests/:id', Auth, async (req, res) => {
    // todo: move supplier as a value to constants
    if (req.user.type_of_user !== "supplier") {
        return res.status(401).send({error: 'Not authorized to access this resource'})
    }

    const requestId = req.params.id || '';
    const supplierId = req.user._id || '';
    const price = req.body.price || 0;

    if (await SupplierBiddings.wasBadeBefore(supplierId, requestId)) {
        return res.status(400).send({error: "you have already bade on this request"});
    }

    let requestOfContractor;
    try {
        // check if the request is available
        requestOfContractor = await ContractorRequest.findById(requestId)
    } catch (error) {
        return res.status(400).send({error: 'contractor request not found'})
    }
    // check if the request is completed
    if (requestOfContractor.status === 'completed') {
        return res.status(400).send({error: 'we are so sorry, as contractor request got expired|completed'})
    }
    // check if the request is not expired
    const endTimestamp = new Date(requestOfContractor.endAt).getTime() / 1000;

    if (endTimestamp < Date.now() / 1000) {
        return res.status(400).send({error: 'we are so sorry, as contractor request got expired'})
    }

    try {
        const biddingRequest = new SupplierBiddings({
            price: price, request_id: requestId, user_id: supplierId
        });
        await biddingRequest.save();
        res.status(201).send(biddingRequest);
    } catch (error) {
        res.status(400).send({error: "Error when bidding on the request"});
    }


});


export default router