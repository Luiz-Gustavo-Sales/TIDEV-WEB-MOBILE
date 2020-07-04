const axios = require("axios");
//importando bando de dados
const Dev = require("../model/Dev");
module.exports = {
  async index(req, res) {
    const { user } = req.headers;

    const loggeDev = await Dev.findById(user);

    const users = await Dev.find({
      //fazendo filtro para
      $and: [
        { _id: { $ne: user } }, //não aparecer seu proprio usuário
        { _id: { $nin: loggeDev.likes } }, // Não aparecer os usuário que o usuário deu Like
        { _id: { $nin: loggeDev.deslikes } }, //Não aparecer as pessoas que ele deu DESLIKE
      ],
    });
    return res.json(users);
  },

  async store(req, res) {
    //passando o nome do usuário para a const username
    const { username } = req.body;
    //verificar se não já existe um usuário com esse nome
    const userExists = await Dev.findOne({ user: username });
    //caso já exista ele retorna o usuário criado
    if (userExists) {
      return res.json(userExists);
    }

    //response vai receber os dados do usuário do GIT.
    const response = await axios.get(
      `https://api.github.com/users/${username}`
    );
    //desestruturação pegando apenas nome, biografia, e imagem do avatar
    const { name, bio, avatar_url: avatar } = response.data;

    //crinado um DEV no Banco
    const dev = await Dev.create({
      name,
      user: username,
      bio,
      avatar,
    });

    //restornando para mostrar os dados do GIT
    return res.json(dev);
  },
};
