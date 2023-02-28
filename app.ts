import dotenv from 'dotenv';
import express from 'express';
import homeRoutes from './src/routes/homeRoutes';
import userRoutes from './src/routes/userRoutes';

dotenv.config();

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
  }

  routes(){
    this.app.use('/', homeRoutes);
    this.app.use('/users', userRoutes);
  }
}

new App().app.listen(process.env.APP_PORT, () => console.log(`Backend ouvindo na porta ${process.env.APP_PORT} ${process.env.APP_URL}`));
