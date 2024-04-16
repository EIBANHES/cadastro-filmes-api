//Inicialização do express
const express = require('express');
const app = express();

// Banco de dados
const migrationsRun = require("./database/sqlite/migrations")

migrationsRun();

// Import de rotas
const routes = require("./routes")
app.use(routes);

// Tratativa de erros
require('express-async-errors')
const AppError = require("./utils/AppError")

app.use((error, request, response, next) => {
  if (error instanceof AppError) {
    return response.status(error.statusCode).json({
      status: "error",
      message: error.message
    });
  }
  console.error(error);
  return response.status(500).json({
    status: "error",
    message: "Internal server error"
  })
});

// Porta da aplicação
const PORT = 3333;
app.listen(PORT, () => console.log(`API rodando na porta ${PORT}!`));