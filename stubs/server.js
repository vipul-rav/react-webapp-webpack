import express from 'express';
import cors from 'cors';
import { stubs } from './index.js';

const app = express();
app.use(cors());

app.all('/*', (req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', '*');
    res.header('Access-Control-Allow-Methods', '*');
    next();
});

Object.keys(stubs).forEach((key) => {
    app.all(key, (req, res, next) => {
        setTimeout(() => {
            res.json(stubs[key](req));
        }, 500);
    });
});

app.listen(9000, () => console.log('Example app listening on port 9000!'));
