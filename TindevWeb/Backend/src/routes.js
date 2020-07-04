const express = require("express");
const DevController = require("./controllers/DevController");
const LikeController = require("./controllers/LikeController");
const DeslikesController = require("./controllers/DeslikesController");
//usando o Router do express 
const routes = express.Router();


routes.get("/devs",DevController.index);

//rotas de cadastrar usuários
routes.post("/devs", DevController.store);
//rota de dar Likes
routes.post("/devs/:idDev/likes",LikeController.store)

//rota dislike
routes.post("/devs/:idDev/dislikes",DeslikesController.store)

module.exports = routes;
