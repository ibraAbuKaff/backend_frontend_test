import mongoose from "mongoose";
import mongoosePaginate from "mongoose-paginate-v2";

const contractorRequestSchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true,
        minlength: 3
    },
    year: {
        type: Number,
        required: true,
        validate: value => {
            if (value < 1950 || value > 2030) {
                throw new Error({error: 'Invalid Year'})
            }
        },
    },
    model: {
        type: String,
        required: true,
        trim: true,
        minlength: 3
    },
    capacity: {
        type: String,
        required: true,
        trim: true,
        minlength: 3
    },
    location: {
        type: String,
        required: true,
        trim: true,
        minlength: 3
    },
    startAt: {
        type: Date,
        default: Date.now().toFixed()
    },
    endAt: {
        type: Date,
        default: (new Date(new Date().getTime() + process.env.REQUEST_EXPIRATION_IN_MINIUTES * 60000))
    },
    status: {
        type: String,
        enum: ['awaiting', 'completed'],
        default: 'awaiting',
        required: true,
    },
    user_id: {
        type: String,
        required: true,
    },
    awarded_bidding: {
        type: Map,
        default: {}
    }
});


contractorRequestSchema.plugin(mongoosePaginate);

contractorRequestSchema.statics.getRequestsByUserId = async (user_id, status = 'awaiting', page = 1) => {
    // todo: it can be moved to a middleware
    if (page <= 0) {
        page = 1;
    }

    return await ContractorRequest.paginate({user_id, status}, {lean: true, page});
};

contractorRequestSchema.statics.findById = async (requestId) => {
    const contractorReq = await ContractorRequest.findOne({_id: requestId}).lean().exec()
    if (!contractorReq) {
        throw new Error('contractor request not found')
    }

    return contractorReq
};

contractorRequestSchema.statics.getAllRequests = async (status = 'awaiting', page = 1) => {
    // todo: it can be moved to a middleware
    if (page <= 0) {
        page = 1;
    }

    return await ContractorRequest.paginate({status}, {lean: true, page});
};

const ContractorRequest = mongoose.model('contractor_request', contractorRequestSchema);


export default ContractorRequest