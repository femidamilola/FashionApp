module.exports = {
  get: {
    tags: ["Users"],
    description: "Get Users by Role",
    operationId: "getUsersByRole",
    parameters: [
      {
        in: "query",
        name: "role",
        schema: {
          type: "string",
          description: "The user role for the query",
        },
      },
    ],
    requestBody: {},
    responses: {
      "200": {
        description: "A list of users",
        content: {
          "application/json": {
            schema: {
              $ref: "#/components/schemas/UsersResponse",
            },
          },
        },
      },
      "500": {
        description: "Server error",
      },
    },
  },
};
