import { Ycs } from '@ycs/core';
import { IDocs } from '@ycs/core/lib/docs';
import { Router } from '@ycs/core/lib/routers';
import { IConfig } from './config';
import { Controller } from './controller';
import { createModel } from './model';

export async function setupRouter(app: Ycs): Promise<Router[]> {
  const config: IConfig = app.config.rolesmanager;
  const routers: Router[] = [];
  const model = createModel();
  const controller = new Controller(model, config);
  routers.push(
    model.routes(
      config.endpoint,
      {
        path: '/',
        methods: ['get'],
        controller: controller.index,
        tags: ['__rolesmanager'],
        summary: 'List documents',
        description: 'List documents',
        consumes: ['application/json', 'application/xml'],
        produces: ['application/json', 'application/xml'],
        parameters: [model.docSchema.paginateOptions],
        responses: {
          200: {
            description: 'Successful operation',
            schema: model.docSchema.paginateResultWithOptions({
              exclude: '_id',
            }),
          },
          '4xx': model.docSchema.response4xx,
          '5xx': model.docSchema.response5xx,
        },
      },
      {
        path: '/',
        methods: ['post'],
        controller: controller.create,
        auth: {
          type: 'hasRoles',
          roles: config.roles,
        },
        tags: ['__rolesmanager'],
        summary: 'Manage roles',
        description: `<b>require roles: </b>${config.roles.join()}`,
        consumes: ['application/json', 'application/xml'],
        produces: ['application/json', 'application/xml'],
        parameters: [model.docSchema.body],
        responses: {
          201: {
            description: 'Successful operation',
            schema: model.docSchema.result,
          },
          '4xx': model.docSchema.response4xx,
          '5xx': model.docSchema.response5xx,
        },
      }
    )
  );

  return routers;
}
