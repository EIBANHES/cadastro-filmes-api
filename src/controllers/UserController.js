const knex = require("../database/knex");
const { hash, compare } = require("bcryptjs")
const AppError = require("../utils/AppError")

class UserController {

  async create(request, response) {


    try {
      const { name, email, password, avatar } = request.body;
      const userExist = await knex('users').where({ email }).first();
      console.log(userExist);

      if (userExist) {
        return response.json({
          message: "Usuário já existente"
        });
      }

      const passwordHash = await hash(password, 8)

      await knex('users').insert({
        name: name,
        email: email,
        password: passwordHash,
        avatar: avatar
      })

      response.json({});

    } catch (error) {
      return response.json({
        message: error
      })
    }

  }
}

module.exports = UserController;