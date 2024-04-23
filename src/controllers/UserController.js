const knex = require("../database/knex");
const { hash, compare } = require("bcryptjs")
const AppError = require("../utils/AppError");

class UserController {

  async create(request, response) {
    try {
      const { name, email, password } = request.body;
      const userExist = await knex('users').where({ email }).first();

      if (userExist) {
        throw new AppError("Usuário já existente!");
      }

      const passwordHash = await hash(password, 8);

      await knex('users').insert({
        name: name,
        email: email,
        password: passwordHash,
      });

      response.json({});

    } catch (error) {
      return response.status(error.statusCode).json({
        message: error.message
      });
    }
  }

  async getUserById(request, response) {
    const { user_id } = request.params;
    const user = await knex("users").select('id', 'name', 'email').where({ id: user_id }).first();

    if (!user) {
      return response.json({
        message: "Usuário não encontrado!"
      });
    }

    return response.json({
      user
    });
  }

  async updateUser(request, response) {
    const { name, email, old_password, password } = request.body;
  }


}

module.exports = UserController;