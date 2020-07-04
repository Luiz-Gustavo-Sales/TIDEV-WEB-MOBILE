const Dev = require("../model/Dev");

module.exports = {
  async store(req, res) {
    //ID de quem vou dá o Like (Quem vai receber)
    const { idDev } = req.params;
    //User quem deu o Like
    const { user } = req.headers;

    const loggedDev = await Dev.findById(user);
    //usuario que vai receber o like
    const targetDev = await Dev.findById(idDev);
    //if para quando for querer dar Like em um usuário não existente
    if (!targetDev) {
      return res.status(400).json({ error: "Dev not exists" });
    }

    //caso usuário existe dando o like passando o ID
    loggedDev.deslikes.push(targetDev._id);
    //salvando o lik do usuário logado
    await loggedDev.save();

    return res.json(loggedDev);
  },
};
