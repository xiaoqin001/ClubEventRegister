const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const csurf = require('csurf');
const helmet = require('helmet');
const cookieParser = require('cookie-parser');
const { environment } = require('./config');
const routes = require('./routes');

const isProduction = environment === 'production';

const app = express();


app.use(morgan('dev'));

app.use(cookieParser());
app.use(express.json());


// Security Middleware
if (!isProduction) {
    // enable cors only in development
    app.use(cors());
  }

  // helmet helps set a variety of headers to better secure your app
  app.use(
    helmet.crossOriginResourcePolicy({
      policy: "cross-origin"
    })
  );

  // Set the _csrf token and create req.csrfToken method
  app.use(
    csurf({
      cookie: {
        // secure makes the server https, not http
        secure: isProduction,
        // same-site makes it so the cookie needs to be coming from the same
        // application that the server sent it to while in production
        sameSite: isProduction && "Lax",
        // makes it so the cookie can only be read by http and not JavaScript
        httpOnly: true
      }
    })
  );

  app.use(routes);

  module.exports = app;
