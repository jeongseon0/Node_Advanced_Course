import { Router } from 'express';

import Product from './products.router.js';
import User from './users.router.js';
import Auth from './auth.router.js';

const apiRouter = Router();

apiRouter.use('/products', Product);
apiRouter.use('/users', User);
apiRouter.use('/auth', Auth);

export default apiRouter;
