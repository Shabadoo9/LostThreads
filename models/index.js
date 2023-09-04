const User = require('./User');
const Threads = require('./Threads');
const Comments = require('./Comments');

User.hasMany(Threads, {
  foreignKey: 'user_id',
  onDelete: 'CASCADE'
});

Threads.belongsTo(User, {
  foreignKey: 'user_id'
});


module.exports = { User, Threads, Comments };
