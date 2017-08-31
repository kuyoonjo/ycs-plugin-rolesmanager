import { IModel, Model, Schema } from '@ycs/core/lib/db';

export function createModel(): IModel {
  const schema = new Schema(
    {
      operator: {
        type: Schema.Types.ObjectId,
        ref: '__auth',
        required: true,
      },
      target: {
        type: Schema.Types.ObjectId,
        ref: '__auth',
        required: true,
      },
      roles: [String],
    },
    {
      timestamps: {},
    }
  );
  return Model({
    name: '__rolesmanager',
    schema,
  });
}
