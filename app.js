// All imports needed heres
const express = require('express');
const path = require('path');
require('dotenv').config({path:path.join(__dirname,'.env')});
const exphbs = require('express-handlebars');
const handlebars = require('handlebars');
const bodyParser = require('body-parser');
const mysql = require('./models/connection');
const compression = require('compression')
const {allowInsecurePrototypeAccess} = require('@handlebars/allow-prototype-access');
const fs = require('fs');
const Chart = require('chart.js');

const { envPort, sessionKey, dbDatabase } = require('./config');
// Routes imports
const authRouter = require('./routes/auth');

// Creates the express application
const app = express();
const port = envPort || 5000;

// Configure to use sessions
const session = require('express-session');
const flash = require('connect-flash');

// Listening to the port provided
app.listen(port, () => {
  console.log('App listening at port ' + port)
});

// Creates an engine called "hbs" using the express-handlebars package.
app.engine('hbs', exphbs({
  handlebars: allowInsecurePrototypeAccess(handlebars),
  extname: 'hbs',
  defaultView: 'main',
  layoutsDir: path.join(__dirname, '/views/layouts'),
  partialsDir: path.join(__dirname, '/views/partials'),
  helpers: {
    grouped_each: function(freq, context, options) {
      var out = "", subcontext = [], i;
      if (context && context.length > 0) {
          for (i = 0; i < context.length; i++) {
              if (i > 0 && i % freq === 0) {
                  out += options.fn(subcontext);
                  subcontext = [];
              }
              subcontext.push(context[i]);
          }
          out += options.fn(subcontext);
      }
      return out;
    }
  }
}));

// Setting the view engine to the express-handlebars engine we created
app.set('view engine', 'hbs');

// Configuration for handling API endpoint data
app.use(compression({level:9}));
app.use(bodyParser.json({parameterLimit: 100000, limit: '500mb', extended: true}));
app.use(bodyParser.urlencoded({parameterLimit: 100000, limit: '500mb',extended: true}));

// serve static files
app.use('/uploads', express.static('uploads'));
app.use(express.static('public'));

// Sessions
app.use(session({
  secret: sessionKey,
  store: mysql,
  resave: false,
  saveUninitialized: false,
  cookie: { secure: false, maxAge: 1000 * 600 * 60 * 3 }
}));

// Flash
app.use(flash());

// Global messages vars
app.use((req, res, next) => {
  res.locals.success_msg = req.flash('success_msg');
  res.locals.error_msg = req.flash('error_msg');
  res.locals.add_err = req.flash('add_err');
  res.locals.add_success = req.flash('add_success');
  next();
});

app.use('/', authRouter); // Login/registration routes