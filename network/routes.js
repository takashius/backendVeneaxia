import user from "../components/user/network.js";

const url_api = "";

const routes = function (server) {
  server.use(url_api + "/user", user);
};

export default routes;
