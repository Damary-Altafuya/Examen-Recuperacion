import { Router } from 'express';
import { TvShowRoutes  } from './tvshow/routes';

export class AppRoutes {


  static get routes(): Router {

    const router = Router();

    router.use('/api/tvshows', TvShowRoutes.routes );    
    return router;
  }


}
