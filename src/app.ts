import dotenv from 'dotenv';
import express from 'express';
import { resolve } from 'path';
import homeRoutes from './routes/homeRoutes';
import photoRoutes from './routes/photoRoutes';
import studentRoutes from './routes/studentRoutes';
import tokenRoutes from './routes/tokenRoutes';
import userRoutes from './routes/userRoutes';

import cors from 'cors';
import helmet from 'helmet';

dotenv.config();

const whitelist = [
  'http://localhost:3000',
  'http://localhost:3001',
];

const corsOptions: cors.CorsOptions = {
  origin(origin = '', callback) {
    if (whitelist.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
};

class App {
  public app;

  constructor(){
    this.app = express();
    this.middlewares();
    this.routes();
  }

  middlewares(){
    this.app.use(express.urlencoded({extended: true}));
    this.app.use(express.json());
    this.app.use('/images/', express.static(resolve(__dirname, '..', 'uploads', 'images')));

    this.app.use(cors());
    this.app.use(helmet());
  }

  routes(){
    this.app.use('/', homeRoutes);
    this.app.use('/users', userRoutes);
    this.app.use('/tokens', tokenRoutes);
    this.app.use('/students', studentRoutes);
    this.app.use('/photos', photoRoutes);

  }
}

new App().app.listen(process.env.APP_PORT, () => console.log(`Backend ouvindo na porta ${process.env.APP_PORT} ${process.env.APP_URL}`));
