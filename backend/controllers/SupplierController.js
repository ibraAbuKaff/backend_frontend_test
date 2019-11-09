import ContractorRequest from "../models/ContractorRequest";
import SupplierBiddings from "../models/SupplierBiddings";

export default class SupplierController {

    bidOnRequest = async (req, res) => {
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
            let biddingRequest = new SupplierBiddings({
                price: price, request_id: requestId, user_id: supplierId
            });
            await biddingRequest.save();
            res.status(201).send(biddingRequest);
            biddingRequest = null;
        } catch (error) {
            res.status(400).send({error: "Error when bidding on the request"});
        }


    }
}
