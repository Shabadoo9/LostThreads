const User = require('./User');
const Threads = require('./Threads');
const Comments = require('./Comments');

// Define associations
User.hasMany(Threads, {
  foreignKey: 'user_id',
  onDelete: 'CASCADE'
});

Threads.belongsTo(User, {
  foreignKey: 'user_id'
});

User.hasMany(Comments, { // User has many Comments
  foreignKey: 'user_id',
  as: 'comments',
  onDelete: 'CASCADE'
});

Threads.hasMany(Comments, { // Threads has many Comments
  foreignKey: 'thread_id',
  onDelete: 'CASCADE'
});

Comments.belongsTo(User, {
  foreignKey: 'user_id',
  as: 'user',
});

Comments.belongsTo(Threads, {
  foreignKey: 'thread_id'
});

module.exports = { User, Threads, Comments };

