import ContractorRequest from "./models/ContractorRequest";
import SupplierBiddings from "./models/SupplierBiddings";
require('./db/db');

const CronJob = require('cron').CronJob;
const job = new CronJob('* * * * * *', async function () {
    // get expired requests
    const contractRequests = ContractorRequest.find({
        status: "awaiting",
        endAt: {'$lt': Date.now().toFixed()}
    }).cursor();

    let document;
    while ((document = await contractRequests.next())) {
        updateContractorRequestWithBidding(document._id)
    }
});


async function updateContractorRequestWithBidding(requestId) {
    const awardedBidding = await SupplierBiddings.find({request_id: requestId}).sort({'price': 'descending'}).limit(1);
    if (awardedBidding.length === 0) {
        return;
    }

    let doc = await ContractorRequest.findOneAndUpdate({_id: requestId}, {awarded_bidding: awardedBidding[0], status: "completed"}, {
        new: true
    });

    console.log(doc)

}
console.log('After job instantiation');
job.start();