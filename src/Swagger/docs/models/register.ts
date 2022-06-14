module.exports = {
  post: {
    tags: ["Auth"],
    description: "Register User",
    operationId: "register",
    parameters: [],
    requestBody: {
      content: {
        "application/json": {
          schema: {
            $ref: "#/components/schemas/Register",
          },
        },
      },
    },
    responses: {
      "200": {
        description: "Verification Email Sent",
      },
      "500": {
        description: "Server error",
      },
    },
  },
};
