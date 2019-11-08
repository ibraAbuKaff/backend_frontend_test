import mongoose from "mongoose";

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
        enum: ['new', 'completed'],
        default: 'new'
    }
});

const ContractorRequest = mongoose.model('contractor_request', contractorRequestSchema);


export default ContractorRequest