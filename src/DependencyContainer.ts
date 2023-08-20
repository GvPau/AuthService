import { ContainerBuilder, YamlFileLoader } from "node-dependency-injection";

async function createContainer() {
  const container = new ContainerBuilder();
  const loader = new YamlFileLoader(container);
  const env = process.env.NODE_ENV || "dev";

  await loader.load(`${__dirname}/dependencies_${env}.yaml`);

  return container;
}

export default createContainer();
