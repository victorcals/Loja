require('./database/mongodb');
var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

const swaggerUi = require('swagger-ui-express');
const swaggerJsDoc = require('swagger-jsdoc');

var cors = require('cors');

var indexRouter = require('./routes/indexRouter');
var pedidoRouter = require('./routes/pedidoRouter');
var clienteRouter = require('./routes/clienteRouter');
var loginRouter = require('./routes/loginRouter');
var categoryRouter = require('./routes/categoryRouter');
var productRouter = require('./routes/productRouter');
var comentariosRouter = require('./routes/comentariosRouter');

var app = express();
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.listen(3000, function () {
  console.log("Servidor Online!")
});

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(cors());

// Definição das rotas
app.use('/', indexRouter);
app.use('/auth', loginRouter);
app.use('/clientes', clienteRouter);
app.use('/pedidos', pedidoRouter);
app.use('/category', categoryRouter);
app.use('/product', productRouter);
app.use('/comentarios', comentariosRouter);

// Configuração do Swagger
const swaggerOptions = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Documentação da API',
      version: '1.0.0',
      description: 'Descrição da sua API',
    },
    servers: [
      {
        url: 'http://localhost:3000',
        description: 'Servidor local',
      },
    ],
  },
  apis: ['./routes/*.js'], // Certifique-se de que o caminho esteja correto, apontando para os seus arquivos de rota
};
const swaggerDocs = swaggerJsDoc(swaggerOptions);

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));

// Gerenciamento de erros
app.use(function (req, res, next) {
  next(createError(404));
});

app.use(function (err, req, res, next) {
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
