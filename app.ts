import express from 'express';
import homeRoutes from './src/routes/homeRoutes';

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
  }
}

new App().app.listen(3001, () => console.log(`Backend ouvindo na porta ${4000} http://localhost:3001`));
