const knex = require("../database/knex");
const { hash, compare } = require("bcryptjs")
const AppError = require("../utils/AppError");
const usersRoutes = require("../routes/users.routes");

class UserController {

  async create(request, response) {
    try {
      const { name, email, password } = request.body;
      const userExist = await knex('users').where({ email }).first();

      if (userExist) {
        return response.json({
          message: "Usuário já existente"
        });
      }

      const passwordHash = await hash(password, 8);

      await knex('users').insert({
        name: name,
        email: email,
        password: passwordHash,
      });

      response.json({});

    } catch (error) {
      return response.json({
        message: "Erro ao cadastrar usuário!"
      })
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
    const { user_id } = request.params;
    const { name, email, old_password, password } = request.body;

    // Verificar se o usuário existe
    const user = await knex("users").where({ id: user_id }).first();
    if (!user) {
      return response.json({
        message: "Usuário não encontrado"
      });
    }

    // Verificar se o novo email já existe para outro usuário
    const emailExist = await knex('users').where({ email }).first();
    if (emailExist) {
      return response.json({
        message: "Email já existente"
      });
    }

    // Verificar se a senha antiga está correta
    if (old_password) {
      const verifyPass = await compare(old_password, user.password);
      if (!verifyPass) {
        return response.json({
          message: "Senha antiga incorreta"
        });
      }
    }

    // Atualizar os dados do usuário
    const updatedUser = {};
    updatedUser.name = name ?? user.name;
    updatedUser.email = email ?? user.email;
    if (password) {
      updatedUser.password = await hash(password, 8) ?? user.password;
    }

    await knex("users").where({ id: user_id }).update(updatedUser);

    return response.json({
      message: "Usuário atualizado com sucesso",
      user: updatedUser
    });
  }


}

module.exports = UserController;