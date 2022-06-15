module.exports = {
    post: {
        tags: ["Auth"],
        description: "Resend email",
        operationId: "resend",
        parameters: [],
        requestBody: {
            content: {
                "application/json": {
                    schema: {
                        $ref: "#/components/schemas/Resend",
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
//# sourceMappingURL=resend.js.map