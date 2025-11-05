// src/app/swagger.ts
import type { Application } from 'express';
import path from 'node:path';
import swaggerJSDoc, { type Options } from 'swagger-jsdoc';
import swaggerUI from 'swagger-ui-express';

const options: Options = {
  definition: {
    openapi: '3.0.0',
    info: { title: 'TS-REST-EXPRESS API', version: '1.0.0' },
  },
  apis: [
    // ajusta a tu estructura real
    path.resolve('src/app/routes/*.ts'),
    path.resolve('src/app/database/*.ts'),
    path.resolve('dist/app/routes/*.js'),
    path.resolve('dist/app/database/*.js'),
  ],
};

const swaggerSpec = swaggerJSDoc(options);

// ✅ Acepta Application y port como number | string
export function swaggerDocs(app: Application, port: number | string): void {
  app.use('/api/v1/docs', swaggerUI.serve, swaggerUI.setup(swaggerSpec));

  app.get('/api/v1/docs.json', (_req, res) => {
    res.type('application/json').send(swaggerSpec);
  });

  console.log(
    `Version 1 Docs are available at http://localhost:${port}/api/v1/docs`,
  );
}

export default { swaggerDocs };
