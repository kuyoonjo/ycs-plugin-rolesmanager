import { AuthModel } from '@ycs/core/lib/auth';
import { IContext } from '@ycs/core/lib/context';
import { IModel, Mongoose, paginate } from '@ycs/core/lib/db';
import { Boom, handleError } from '@ycs/core/lib/errors';
import { response } from '@ycs/core/lib/response';
import { IConfig } from './config';

export class Controller {
  constructor(private model: IModel, private config: IConfig) {}
  // Gets a list of Models
  public index = async (ctx: IContext) => {
    try {
      const paginateResult = await paginate(this.model, ctx);
      response(ctx, 200, paginateResult);
    } catch (e) {
      console.error(e);
      handleError(ctx, e);
    }
  };

  // Creates a new Model in the DB
  public create = async (ctx: IContext) => {
    try {
      if (!ctx.request.fields) throw Boom.badData(this.config.errors.empty);
      delete ctx.request.fields._id;
      ctx.request.fields.operator = ctx.request.auth._id;
      const entity = new this.model(ctx.request.fields) as any;
      const auth = (await AuthModel.findById(entity.target).exec()) as any;
      if (!auth) throw Boom.badData(this.config.errors.targetNotFound);
      auth.roles = entity.roles;
      await auth.save();
      await entity.save();
      response(ctx, 201, entity);
    } catch (e) {
      handleError(ctx, e);
    }
  };
}
