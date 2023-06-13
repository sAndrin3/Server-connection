import express from 'express';
import bodyParser from 'body-parser';
import config from './db/config.js';
import { userRoutes } from './routes/tourRoutes.js';


const app = express();

app.use(bodyParser.json());

userRoutes(app)

app.get('/', (req, res) => {
    res.send("Hello Welcome to my tour API!");
});

app.listen(config.port, () => {
    console.log(`Server is running on ${config.port}`);
});