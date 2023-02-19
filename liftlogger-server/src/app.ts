import express, { Request, Response } from 'express';

const app = express();

// A simple route that sends a 'Hello World' message when accessed
app.get('/', (req: Request, res: Response) => {
  res.send('Hello World');
});

// The port that the express app will listen to, taken from the environment variable PORT or 3000 as default
const port: number = Number(process.env.PORT) || 3000;

// starts the express app
app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
