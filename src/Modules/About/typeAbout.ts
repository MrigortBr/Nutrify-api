import packageJson from "../../../package.json";

interface AboutInterface {
  name: string;
  version: string;
  author: string;
  license: string;
  repository: { url: string };
  dependencies?: { [key: string]: string };
  devDependencies?: { [key: string]: string };
}

const aboutData: AboutInterface = {
  name: packageJson.name,
  version: packageJson.version,
  author: packageJson.author,
  license: packageJson.license,
  repository: packageJson.repository,
};

export default aboutData;
