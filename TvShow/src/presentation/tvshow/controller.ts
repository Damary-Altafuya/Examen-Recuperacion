import { Request, Response } from 'express';
import { prisma } from '../../data/postgres';
import { CreateTvShowDto, UpdateTvShowDto } from '../../domain/dtos';

export class TvShowsController {
  //* DI
  constructor() { }

  public getTvShows = async (req: Request, res: Response) => {
    const tvShow = await prisma.tvShow.findMany();
    return res.json(tvShow);
  };

  public getTvShowById = async (req: Request, res: Response) => {
    const id = +req.params.id;
    // localhost:3000/producto/1
    if (isNaN(id)) return res.status(400).json({ error: 'ID argument is not a number' });

    const tvShow = await prisma.tvShow.findFirst({
      where: { id }
    });

    tvShow
      ? res.json(tvShow)
      : res.status(404).json({ error: `TvShow with id ${id} not found` });
  };
  public createTvShow = async (req: Request, res: Response) => {
    const [error, createTvShowDto] = CreateTvShowDto.create(req.body);

    if (error) return res.status(400).json({ error });

    const tvShow = await prisma.tvShow.create({
      data: createTvShowDto!,
    });

    res.json(tvShow);
  };

  public updateTvShow = async (req: Request, res: Response) => {
    const id = +req.params.id;
    const [error, updateTvShowDto] = UpdateTvShowDto.create({ ...req.body, id });
    if (error) return res.status(400).json({ error });

    const tvShow = await prisma.tvShow.findFirst({
      where: { id }
    });
    if (!tvShow) return res.status(404).json({ error: `TvShow with id ${id} not found` });
    const updatedTvShow = await prisma.tvShow.update({
      where: { id },
      data: updateTvShowDto!.values
    });
    res.json(updatedTvShow);
  }

  public deleteTvShow = async (req: Request, res: Response) => {
    const id = +req.params.id;
    const tvShow = await prisma.tvShow.findFirst({
      where: { id }
    });

    if (!tvShow) return res.status(404).json({ error: `TvShow with id ${id} not found` });
    const deleted = await prisma.tvShow.delete({
      where: { id }
    });
    deleted
      ? res.json(deleted)
      : res.status(400).json({ error: `TvShow with id ${id} not found` });
  }
}
