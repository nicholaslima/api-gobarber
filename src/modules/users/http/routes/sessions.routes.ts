
import express from 'express';
const routes = express.Router();

import SessionsController from '../controllers/SessionsController';

const sessions = new  SessionsController();

routes.post('/auth',sessions.auth);

export default routes;