module.exports = {
    post: {
        tags: ["Auth"],
        description: "Get Access Token",
        operationId: "getAccessToken",
        parameters: [],
        requestBody: {
            content: {
                "application/json": {
                    schema: {
                        $ref: "#/components/schemas/Token",
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
//# sourceMappingURL=token.js.map