require('dotenv').config();
const express = require('express');
const postgraphql = require('postgraphql').postgraphql;

const app = express()

const postgresConfig = {
  user: process.env.POSTGRES_USERNAME,
  password: process.env.POSTGRES_PASSWORD,
  host: process.env.POSTGRES_HOST,
  port: process.env.POSTGRES_PORT,
  database: process.env.POSTGRES_DATABASE
}

app.use(postgraphql(
  postgresConfig,
  process.env.POSTGRAPHQL_SCHEMA, {
    graphiql: true,
    watchPg: true,
    jwtPgTypeIdentifier: `${process.env.POSTGRAPHQL_SCHEMA}.jwt`,
    jwtSecret: process.env.JWT_SECRET,
    pgDefaultRole: process.env.POSTGRAPHQL_DEFAULT_ROLE
  }))

app.use(function (req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

app.use(function (err, req, res, next) {
  res.send('Error! ', err.message, ' ', (req.app.get('env') === 'development' ? err : {}));
});

app.listen(process.env.PORT);