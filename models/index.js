const User = require('./User');
const Threads = require('./Threads');
const Comment = require('./Comment');

User.hasMany(Threads, {
  foreignKey: 'user_id',
  onDelete: 'CASCADE'
});

Threads.belongsTo(User, {
  foreignKey: 'user_id'
});

User.hasMany(Comment, {
  foreignKey: 'user_id',
});

Comment.belongsTo(User, {
  foreignKey: 'user_id',
});

Threads.hasMany(Comment, {
  foreignKey: 'thread_id',
});

Comment.belongsTo(Threads, {
  foreignKey: 'thread_id',
});

module.exports = { User, Threads };
