import mongoose from "mongoose";

mongoose.set('useNewUrlParser', true);
mongoose.set('useCreateIndex', true);

mongoose.connect(process.env.MONGODB_URL)