import express from 'express';
import bodyParser from 'body-parser';
import config from './src/db/config.js';
import { userRoutes } from './src/routes/tourRoutes.js';


const app = express();

// app.use

app.use(bodyParser.json());

userRoutes(app)

app.get('/', (req, res) => {
    res.send("Hello Welcome to my tour API!");
});

app.listen(config.port, () => {
    console.log(`Server is running on ${config.port}`);
});