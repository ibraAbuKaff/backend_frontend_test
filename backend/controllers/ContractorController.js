import ContractorRequest from "../models/ContractorRequest";

export default class ContractorController {

    placeRequest = async (req, res) => {
        // todo: move 'contractor' as a value to constants
        if (req.user.type_of_user !== "contractor") {
            return res.status(401).send({error: 'Not authorized to access this resource'})
        }

        let data = req.body;
        data.user_id = req.user._id;
        try {
            let contractorReq = new ContractorRequest(req.body);
            await contractorReq.save();
            res.status(201).send(contractorReq);
            contractorReq = null;
        } catch (error) {
            res.status(400).send(error)
        }
    };

    getMyRequests = async (req, res) => {
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
    };


    getAllRequests = async (req, res) => {
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

    }
}
