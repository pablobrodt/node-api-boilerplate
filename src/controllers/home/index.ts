import {
  Router,
  type NextFunction,
  type Request,
  type Response,
} from 'express';

const homeController = Router();

homeController.get(
  '/',
  (
    req: Request<{}, {}, { bodyParam?: string }, { queryParam?: string }>,
    res: Response,
    next: NextFunction,
  ) => {
    try {
      const { queryParam } = req.query;
      const { bodyParam } = req.body;

      res.status(200).json({ queryParam, bodyParam });
    } catch (error) {
      return next(error);
    }
  },
);

export { homeController };
