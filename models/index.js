const User = require('./User');
const Threads = require('./Threads');

User.hasMany(Threads, {
  foreignKey: 'user_id',
  onDelete: 'CASCADE'
});

Threads.belongsTo(User, {
  foreignKey: 'user_id'
});

module.exports = { User, Threads };
