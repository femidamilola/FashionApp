module.exports = {
    post: {
        tags: ["Auth"],
        description: "Verify Email",
        operationId: "verifyEmail",
        parameters: [],
        requestBody: {
            content: {
                "application/json": {
                    schema: {
                        $ref: "#/components/schemas/Verify",
                    },
                },
            },
        },
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
//# sourceMappingURL=verify.js.map