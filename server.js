const express = require("express");
const app = express();
const swaggerUi = require("swagger-ui-express");
const swaggerYaml = require('yamljs');
const swaggerYamlDocument  = swaggerYaml.load('./swagger.yaml'); 


app.use(
  '/api-docs',swaggerUi.serve,swaggerUi.setup(swaggerYamlDocument)
);

app.listen(8000, () => {
  console.log("server listening on port 8000!");
  });
