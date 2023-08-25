const sequelize = require('../config/connection');
const { User, Threads } = require('../models');

const userData = require('./userData.json');
const threadsData = require('./threadsData.json');

const seedDatabase = async () => {
  await sequelize.sync({ force: true });

  const users = await User.bulkCreate(userData, {
    individualHooks: true,
    returning: true,
  });

  for (const threads of threadsData) {
    await Threads.create({
      ...threads,
      user_id: users[Math.floor(Math.random() * users.length)].id,
    });
  }

  process.exit(0);
};

seedDatabase();