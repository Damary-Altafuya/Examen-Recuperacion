import { Router } from 'express';
import { TvShowsController } from './controller'; // Import the TvShow controller

export class TvShowRoutes {
  static get routes(): Router {
    const router = Router();
    const tvShowController = new TvShowsController(); // Use the TvShow controller

    router.get('/', tvShowController.getTvShows);
    router.get('/:id', tvShowController.getTvShowById);

    router.post('/', tvShowController.createTvShow);
    router.put('/:id', tvShowController.updateTvShow);
    router.delete('/:id', tvShowController.deleteTvShow);

    return router;
  }
}
