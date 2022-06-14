module.exports = {
  post: {
    tags: ["Auth"],
    description: "Login User",
    operationId: "login",
    parameters: [],
    requestBody: {
      content: {
        "application/json": {
          schema: {
            $ref: "#/components/schemas/Login",
          },
        },
      },
    },
    responses: {
      "200": {
        description: "Login Successful",
      },
      "500": {
        description: "Server error",
      },
    },
  },
};
