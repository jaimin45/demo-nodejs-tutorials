const express = require("express");
const swaggerUi = require("swagger-ui-express");
const swaggerYaml = require("yamljs");

const app = express();

const swaggerYamlDocument = swaggerYaml.load("./swagger.yaml");

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerYamlDocument));

app.listen(3000, () => {
  // eslint-disable-next-line no-console
  console.log("server listening on port 8000!");
});
