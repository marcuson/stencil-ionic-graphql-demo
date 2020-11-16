const tdn = require('@graphql-codegen/typescript-document-nodes');

module.exports = {
  plugin: (schema, documents, config) => {
    const ret = tdn.plugin(schema, documents, config);

    return ret.prepend.join('\n') + ret.content;
  },
};
