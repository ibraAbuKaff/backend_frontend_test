import User from "../models/User";

export default class UserController {
    register = async (req, res) => {
        try {
            let user = new User(req.body);
            await user.save();
            const token = await user.generateAuthToken();
            res.status(201).send({user, token});
            user = null;
        } catch (error) {
            res.status(400).send(error)
        }

    };

    login = async (req, res) => {
        try {
            const {email, password} = req.body;
            const user = await User.findByCredentials(email, password);
            if (!user) {
                return res.status(401).send({error: 'Login failed! Check authentication credentials'})
            }
            const token = await user.generateAuthToken();
            res.send({user, token})
        } catch (error) {
            res.status(400).send(error)
        }
    };

    me = async (req, res) => {
        res.send(req.user)
    };

    logout = async (req, res) => {
        try {
            req.user.tokens = req.user.tokens.filter((token) => {
                return token.token !== req.token;
            });
            await req.user.save();
            res.send();
        } catch (error) {
            res.status(500).send(error);
        }
    }

}