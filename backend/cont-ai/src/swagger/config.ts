import swaggerJSDoc from "swagger-jsdoc";

const swaggerOptions: swaggerJSDoc.Options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Cont-AI - Gestão Contábil Inteligente",
      version: "1.0.0",
      description: "Documentação da API para o sistema de gestão contábil inteligente Cont-AI.",
    },
    servers: [
      {
        description: "Development server",
        url: "http://localhost:3000/api",
      },
      {
        description: "Production server",
        url: "https://cont-ai.onrender.com/api",
      },
    ],
    components: {
      schemas: {
        RecordInput: {
          type: "object",
          required: ["date", "amount", "type", "description"],
          properties: {
            date: {
              type: "string",
              description: "Data no formato dd/MM/yyyy",
              example: "04/06/2025",
            },
            amount: {
              type: "number",
              example: 100.5,
            },
            type: {
              type: "number",
              enum: ["Credit", "Debit"],
              example: 0,
            },
            description: {
              type: "string",
              example: "Compra mercado",
            },
          },
        },
        Record: {
          allOf: [
            { $ref: "#/components/schemas/RecordInput" },
            {
              type: "object",
              required: ["id"],
              properties: {
                id: {
                  type: "integer",
                  example: 232,
                },
              },
            },
          ],
        },
        GroupedRecord: {
          type: "object",
          properties: {
            monthYear: {
              type: "string",
              example: "04/2025",
            },
            records: {
              type: "array",
              items: {
                $ref: "#/components/schemas/Record",
              },
            },
            totalCredit: {
              type: "number",
              example: 1500,
            },
            totalDebit: {
              type: "number",
              example: 700,
            },
          },
        },
      },
    },
  },
  apis: ["./src/swagger/paths/*.ts"], // caminhos dos seus comentários JSDoc
};

const swaggerSpec = swaggerJSDoc(swaggerOptions);

export default swaggerSpec;
