import swaggerJsDoc from "swagger-jsdoc";

const swaggerOptions = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "API Control Flota",
      version: "1.0.0",
      description: "Documentación de la API de control de vehículos y registros de salida/entrada",
      contact: {
        name: "Mauricio Briceño",
      },
    },
    servers: [
      {
        url: "http://localhost:5000",
      },
    ],
  },

  apis: ["./src/routes/*.js"]
};

const swaggerSpec = swaggerJsDoc(swaggerOptions);

export default swaggerSpec;