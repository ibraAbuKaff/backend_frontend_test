import mongoose from "mongoose";
import mongoosePaginate from "mongoose-paginate-v2";

const SupplierBiddingsSchema = mongoose.Schema({
    price: {
        type: Number,
        required: true,
    },
    user_id: {
        type: String,
        required: true,
    },
    request_id: {
        type: String,
        required: true,
    }
});


SupplierBiddingsSchema.plugin(mongoosePaginate);

SupplierBiddingsSchema.statics.wasBadeBefore = async (user_id, request_id) => {
    const bidding = await SupplierBiddings.findOne({user_id, request_id}).lean().exec();

    return !bidding ? false : true;

};

const SupplierBiddings = mongoose.model('supplier_biddings', SupplierBiddingsSchema);

export default SupplierBiddings