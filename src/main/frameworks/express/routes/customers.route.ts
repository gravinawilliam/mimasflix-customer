import { Router } from 'express';

import { adapterRoute } from '@main/adapters/express-router';
import { makeCreateCustomerController } from '@main/factories/application/controllers/customers/create-customer-controller.factory';

const customersRouter = Router();

customersRouter.post('/create', adapterRoute(makeCreateCustomerController()));

export default customersRouter;
