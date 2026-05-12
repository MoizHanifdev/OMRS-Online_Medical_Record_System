import { type Schema } from 'mongoose';

export function searchPlugin(schema: Schema, options?: { fields: string[] }) {
  if (options?.fields && options.fields.length > 0) {
    const indexObj: Record<string, 'text'> = {};
    options.fields.forEach((f) => {
      indexObj[f] = 'text';
    });
    schema.index(indexObj);
  }

  schema.statics.search = function (query: string) {
    if (!query) return this.find();
    return this.find({ $text: { $search: query } });
  };
}
