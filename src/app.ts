import express, { Application } from 'express';
import morgan from 'morgan';

//Routes
import IndexRoutes from './routes/index.routes';
import CarreraRoutes from './routes/carrera.routes';

export class App {
    private app: Application;

    constructor(private port?: number | string) {
        this.app = express();
        this.settings();
        this.middleware();
        this.routes();
    }

    settings() {
        this.app.set('port', this.port || process.env.PORT || 3001);
    }

    middleware() {
        this.app.use(morgan('dev'));
        this.app.use(express.json());
    }

    routes() {
        this.app.use(IndexRoutes);
        this.app.use('/carrera',CarreraRoutes);
    }

    async listen() {
        await this.app.listen(this.app.get('port'));
        console.log('Server on port', this.app.get('port'));
    }
}