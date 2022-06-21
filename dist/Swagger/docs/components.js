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
                    name: {
                        type: "object",
                        properties: {
                            first: {
                                type: "string",
                            },
                            last: {
                                type: "string",
                            },
                        },
                    },
                    // password: {
                    //   type: "string",
                    //   description: "The user's password, hashed",
                    // },
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
                    fullName: {
                        type: "string",
                        description: "User Name",
                        example: "John Doe",
                    },
                },
            },
            Token: {
                type: "object",
                properties: {
                    refreshToken: {
                        type: "string",
                        description: "Refresh Token",
                    },
                },
            },
            Verify: {
                type: "object",
                properties: {
                    token: {
                        type: "string",
                        description: "Token",
                        required: true,
                    },
                    email: {
                        type: "string",
                        required: true,
                    },
                },
            },
            Resend: {
                type: "object",
                properties: {
                    old_email: {
                        type: "string",
                        description: "Initial email used",
                    },
                    new_email: {
                        type: "string",
                        description: "New email used",
                    },
                },
            },
            Profile: {
                type: "object",
                properties: {
                    id: {
                        type: "string",
                        description: "Profile unique id",
                    },
                    name: {
                        type: "object",
                        properties: {
                            first: {
                                type: "string",
                            },
                            last: {
                                type: "string",
                            },
                        },
                    },
                    phone: {
                        type: "string",
                        description: "Phone Number",
                        example: "Admin",
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
            ArrayOfUsers: {
                type: "array",
                items: {
                    $ref: "#/components/schemas/User",
                },
            },
            UsersResponse: {
                type: "object",
                properties: {
                    data: {
                        $ref: "#/components/schemas/ArrayOfUsers",
                    },
                },
            },
            ProfileResponse: {
                type: "object",
                properties: {
                    profile: {
                        $ref: "#/components/schemas/Profile",
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
        securitySchemes: {
            JWT: { type: "apiKey", in: "header", name: "Authorization" },
        },
    },
};
//# sourceMappingURL=components.js.map