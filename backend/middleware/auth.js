import jwt from "jsonwebtoken";
import User from "../models/User";

const Auth = async (req, res, next) => {
    const authorizationHeaderValue = req.header('Authorization') || '';
    if (!authorizationHeaderValue) {
        res.status(401).send({error: 'Not authorized to access this resource'})
    }

    const token = authorizationHeaderValue.replace('Bearer ', '');
    try {
        const data = jwt.verify(token, process.env.JWT_KEY);
        const user = await User.findOne({_id: data._id, 'tokens.token': token});
        if (!user) {
            throw new Error();
        }
        req.user = user;
        req.token = token;
        next()
    } catch (error) {
        res.status(401).send({error: 'Not authorized to access this resource'})
    }

};

export default Auth;