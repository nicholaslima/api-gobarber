

import express from 'express';
import { Joi,Segments,celebrate } from 'celebrate';
import ProvidersControler from '@modules/appointments/infra/http/controllers/ProvidersController';
import MiddlewareAuth from '@shared/infra/http/middlewares/MiddlewareToken';
import ProvidersMonthAvailabilityController from '@modules/appointments/infra/http/controllers/ProvidersMonthAvailabilityController';
import ProvidersDayAvaibilityController from '@modules/appointments/infra/http/controllers/ProvidersDayAvaibilityController';

const providersRoutes = express.Router();

const daysAvaibility = new ProvidersDayAvaibilityController();
const monthAvailability = new ProvidersMonthAvailabilityController();
const providersController = new ProvidersControler();

providersRoutes.use(MiddlewareAuth);

providersRoutes.get('/:provider_id/month-availability',
    celebrate({
        [ Segments.PARAMS ]:{
            provider_id: Joi.string().uuid().required(),
        }
    }),
    monthAvailability.index);
    
providersRoutes.get(
        '/:provider_id/days-avaibility',
        celebrate({
            [ Segments.PARAMS ]:{
                provider_id: Joi.string().uuid().required(),
            }
        }),
    daysAvaibility.index);


providersRoutes.get(
    '/list',
    providersController.listProviders
);


export default providersRoutes