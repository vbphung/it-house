import { Autoloader } from "autoloader-ts";
import lodash from "lodash";

const loadGraphqlSchemas = async () => {
  const loader = await Autoloader.dynamicImport();
  await loader.fromGlob(__dirname + "/../modules/**/*.schema.ts");

  const exports = loader.getResult().exports;

  return exports;
};

const loadGraphqlResolvers = async () => {
  const loader = await Autoloader.dynamicImport();
  await loader.fromGlob(__dirname + "/../modules/**/*.resolver.ts");

  const exports = loader.getResult().exports;

  return lodash.reduce(
    exports,
    (pre, val) => {
      return lodash.merge(pre, val);
    },
    {} as any
  );
};

const loadGraphql = async () => {
  const loader = await Autoloader.dynamicImport();
  await loader.fromGlob(__dirname + "/../modules/**/*.graphql.ts");

  const exports = loader.getResult().exports;

  return lodash.reduce(
    exports,
    (pre, val) => {
      if (val["schema"]) {
        pre["typeDefs"]["push"](val["schema"]);
      }

      if (val["resolvers"]) {
        pre["resolvers"] = lodash.merge(pre["resolvers"], val["resolvers"]);
      }

      return pre;
    },
    { typeDefs: [], resolvers: {} } as { typeDefs: any[]; resolvers: any }
  );
};

export { loadGraphqlSchemas, loadGraphqlResolvers, loadGraphql };
