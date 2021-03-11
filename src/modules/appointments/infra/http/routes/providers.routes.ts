

import express from 'express';
import { Joi,Segments,celebrate } from 'celebrate';
import AppointmentControler from '../controllers/AppointmentControler';
import MiddlewareAuth from '@shared/infra/http/middlewares/MiddlewareToken';
import ProvidersMonthAvailabilityController from '@modules/appointments/infra/http/controllers/ProvidersMonthAvailabilityController';
import ProvidersDayAvaibilityController from '@modules/appointments/infra/http/controllers/ProvidersDayAvaibilityController';

const providersRoutes = express.Router();

const daysAvaibility = new ProvidersDayAvaibilityController();
const monthAvailability = new ProvidersMonthAvailabilityController();

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


export default providersRoutes