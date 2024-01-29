import express, {
  type Response,
  type Request,
  type NextFunction,
} from 'express';
import routes from './controllers';

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

for (const route of routes) {
  app.use(route.path, route.controller);
}

// Middlewares
app.use((_req: Request, res: Response, _next: NextFunction) => {
  return res.status(404).json('Rota Inexistente');
});

app.use((error: Error, _req: Request, res: Response, _next: NextFunction) => {
  if (error.message) {
    const { message } = error;

    return res.status(500).json({ message });
  }

  return res.sendStatus(500);
});
// ----

const PORT = 3000;

console.log(`Starting server on port ${PORT}`);
app.listen(PORT);
