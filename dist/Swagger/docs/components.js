module.exports = {
    components: {
        schemas: {
            User: {
                type: "object",
                properties: {
                    id: {
                        type: "string",
                        description: "User unique id",
                        example: "62a5b646744cc358cdb834aa",
                    },
                    email: {
                        type: "string",
                        description: "User email",
                        example: "test@mail.com",
                    },
                    password: {
                        type: "string",
                        description: "The user's password, hashed",
                    },
                    role: {
                        type: "string",
                        description: "User role, and basis for authorization",
                        example: "Admin",
                    },
                    verified: {
                        type: "boolean",
                        description: "User verification status",
                        example: false,
                    },
                    verification: {
                        type: "**array**",
                        description: "List of verification tokens issued for user",
                    },
                    createdAt: {
                        type: "string",
                        description: "Timestamp",
                    },
                    updatedAt: {
                        type: "string",
                        description: "Timestamp",
                    },
                },
            },
            Login: {
                type: "object",
                properties: {
                    email: {
                        type: "string",
                        description: "User email",
                        example: "test@test.com",
                    },
                    password: {
                        type: "string",
                        description: "User Password",
                    },
                },
            },
            Register: {
                type: "object",
                properties: {
                    email: {
                        type: "string",
                        description: "User email",
                        example: "test@test.com",
                    },
                    password: {
                        type: "string",
                        description: "User Password",
                    },
                },
            },
            Error: {
                type: "object",
                properties: {
                    message: {
                        type: "string",
                    },
                    internal_code: {
                        type: "string",
                    },
                },
            },
        },
    },
};
//# sourceMappingURL=components.js.map