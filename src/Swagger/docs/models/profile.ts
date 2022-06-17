module.exports = {
  get: {
    tags: ["Profile"],
    description: "Get Profile by User ID",
    operationId: "getProfileByUserID",
    parameters: [
      {
        in: "query",
        name: "user",
        schema: {
          type: "string",
          description: "The user id",
        },
      },
    ],
    security: [
      {
        JWT: [],
      },
    ],
    requestBody: {},
    responses: {
      "200": {
        description: "A profile",
        content: {
          "application/json": {
            schema: {
              $ref: "#/components/schemas/ProfileResponse",
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
