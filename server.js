const express = require('express');
const session = require('express-session');
const exphbs = require('express-handlebars');
const routes = require('./controllers');
const helpers = require('./utils/helpers');
const path = require('path');

const sequelize = require('./config/connection'); // Import Sequelize configuration
const SequelizeStore = require('connect-session-sequelize')(session.Store);

// const apiRoutes = require('./controllers/api'); // Import API routes
// const homeRoutes = require('./controllers/homeRoutes'); // Import home routes

const app = express();
const PORT = process.env.PORT || 3001;

// Set up Handlebars.js engine with custom helpers
const hbs = exphbs.create({ helpers });


// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.stat ic(path.join(__dirname, 'public')));

const sess = {
  secret: 'Super secret secret',
  cookie: {
    maxAge: 300000,
    httpOnly: true,
    secure: false,
    sameSite: 'strict',
  },
  resave: false,
  saveUninitialized: true,
  store: new SequelizeStore({
    db: sequelize
  })
};

app.use(session(sess));

// Set up handlebars as the view engine
app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

// // Use API routes
// app.use('/api', apiRoutes);

// // Use home routes
// app.use('/', homeRoutes);

app.use(routes);

// Sync Sequelize models with the database
// sequelize.sync().then(() => {
//   app.listen(PORT, () => {
//     console.log(`Server is running on port ${PORT}`);
//   });
// });
sequelize.sync({ force: false }).then(() => {
  app.listen(PORT, () => console.log('Now listening on port '+ PORT));
});