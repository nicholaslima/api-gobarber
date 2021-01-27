
import 'reflect-metadata';
import express from 'express';
import './database';
import routes from '@shared/infra/http/routes';

const App = express();


App.use(express.json());
App.use(routes);


App.listen(3333,() => {
    console.log('server is runing in port 3333');
});