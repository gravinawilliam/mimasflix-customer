import { Router } from 'express';

import customers from './customers.route';

const routes = Router();

routes.use('/customers', customers);

export default routes;
