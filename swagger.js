import user from "./documentation/user.js";

const definition = {
  swagger: "2.0",
  info: {
    version: "2.0.0",
    title: "Multitrack API",
    description: "New version of the app",
    license: {
      name: "MIT",
      url: "https://opensource.org/licenses/MIT",
    },
  },
  host: "localhost:8080",

  servers: [
    {
      url: "localhost:8080",
      description: "Local server",
    },
  ],

  tags: [
    {
      name: "Users",
      description: "User management",
    },
    {
      name: "Auth",
      description: "User authentication via oauth",
    },
  ],
  consumes: ["application/json"],
  produces: ["application/json"],
  paths: {
    "/user/login": user.login,
    "/user/logout": user.logout,
    "/user": user.create,
    "/user ": user.update,
    "/user  ": user.list,
    "/user/{id}": user.userByID,
    "/user/account": user.account,
    "/user/change_password": user.changePassword,
  },
  definitions: {
    User: user.definitions.User,
    Users: user.definitions.Users,
    ResponseUserLoginData: user.definitions.ResponseUserLoginData,
    ResponseUserData: user.definitions.ResponseUserData,
  },
};

export default definition;
