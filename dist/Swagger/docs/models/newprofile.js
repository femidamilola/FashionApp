module.exports = {
    post: {
        tags: ["Profile"],
        description: "Create Profile by User ID",
        operationId: "createProfileByUserID",
        parameters: [],
        security: [
            {
                JWT: [],
            },
        ],
        requestBody: {
            content: {
                "application/json": {
                    schema: {
                        type: "object",
                        properties: {
                            user: {
                                type: "string",
                                description: "The user ID",
                            },
                            fullName: {
                                type: "string",
                                description: "The user name",
                            },
                            phone: {
                                type: "string",
                            },
                        },
                    },
                },
            },
            required: true,
        },
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
//# sourceMappingURL=newprofile.js.map