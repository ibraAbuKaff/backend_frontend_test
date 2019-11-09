import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import {ExpressAPILogMiddleware, log} from "@rama41222/node-logger";
import router from "./routers";
require('./db/db');

const config = {
    name: 'backend api',
    port: 3000,
    host: '0.0.0.0',
};

const app = express();
const logger = log({console: true, file: false, label: config.name});


app.use(bodyParser.json());
app.use(cors());

app.use(express.json());
app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});
app.use(router);
app.use(ExpressAPILogMiddleware(logger, {request: true}));


app.get('/ping', (req, res) => {
    res.status(200).send('pong');
});

app.listen(config.port, config.host, (e) => {
    if (e) {
        throw new Error('Internal Server Error');
    }
    logger.info(`${config.name} running on ${config.host}:${config.port}`);
});

require('./cronjob');

