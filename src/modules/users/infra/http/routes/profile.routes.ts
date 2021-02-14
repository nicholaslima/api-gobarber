

import app from 'express';
import ProfileControler from '../controllers/ProfileController';
import authentication from '@shared/infra/http/middlewares/MiddlewareToken';

const routes = app.Router();

const profileControler = new ProfileControler();

routes.use(authentication);

routes.get('/',profileControler.show);
routes.put('/',profileControler.update);

export default routes;