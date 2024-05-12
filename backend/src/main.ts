import cookieParser from 'cookie-parser';
import * as dotenv from 'dotenv';
import express, { json, urlencoded } from 'express';
import { join } from 'path';
import swaggerJsdoc from 'swagger-jsdoc';
import { serve, setup } from 'swagger-ui-express';
import { router } from './api/routes/index.ts';

dotenv.config();

const basePath = process.env.BASE_PATH ? `/${process.env.BASE_PATH}` : '';
const app = express();

const port = process.env.API_PORT || 3000;

app.use(json());
app.use(urlencoded({ extended: false }));
app.use(cookieParser());

// ------ Configure swagger docs ------
const options = {
    swaggerDefinition: {
        info: {
            title: 'Accounting',
            version: '1.0.0',
            // description: "My API for doing cool stuff!",
        },
        basePath: `${basePath}api`,
    },
    apis: [join(import.meta.url, '/routes/**/*.js')],
};
const swaggerSpecs = swaggerJsdoc(options);

app.use(`${basePath}/api`, router);
app.use(`${basePath}/swagger`, serve, setup(swaggerSpecs));

app.listen(port, () => {
    console.log(`App running at http://localhost:${port}${basePath}`);
});
