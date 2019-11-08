import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import {ExpressAPILogMiddleware, log} from "@rama41222/node-logger";
import router from "./routers/user";
import db from "./db/db"



const config = {
    name: 'backend api',
    port: 3000,
    host: '0.0.0.0',
};

const app = express();
const logger = log({console: true, file: false, label: config.name});


app.use(express.json());
app.use(router);

app.use(bodyParser.json());
app.use(cors());
app.use(ExpressAPILogMiddleware(logger, {request: true}));

app.get('/', (req, res) => {
    res.status(200).send('hello this is api service');
});

app.listen(config.port, config.host, (e) => {
    if (e) {
        throw new Error('Internal Server Error');
    }
    logger.info(`${config.name} running on ${config.host}:${config.port}`);
});