module.exports = {
  get: {
    tags: ["Auth"],
    description: "Test Middleware",
    operationId: "testMiddleware",
    parameters: [
      //   {
      //     in: "query",
      //     name: "offset",
      //     schema: {
      //       type: "integer",
      //       description:
      //         "The number of items to skip before starting to collect the result set",
      //     },
      //   },
    ],
    security: [
      {
        JWT: [],
      },
    ],
    requestBody: {},
    responses: {
      "200": {
        description: "Successful",
      },
      "500": {
        description: "Server error",
      },
    },
  },
};
