const express = require('express');
const session = require('express-session');
const exphbs = require('express-handlebars');
const path = require('path');

const sequelize = require('./config/connection'); // Import Sequelize configuration
const apiRoutes = require('./controllers/api'); // Import API routes
const homeRoutes = require('./controllers/homeRoutes'); // Import home routes

const app = express();
const PORT = process.env.PORT || 3000;

// Set up handlebars as the view engine
app.engine('handlebars', exphbs());
app.set('view engine', 'handlebars');

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));
app.use(session({  
secret: 'Super secret secret',
cookie: {},
resave: false,
saveUninitialized: true,
store: new SequelizeStore({
  db: sequelize
})
}));

// Use API routes
app.use('/api', apiRoutes);

// Use home routes
app.use('/', homeRoutes);

// Sync Sequelize models with the database
sequelize.sync().then(() => {
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
});