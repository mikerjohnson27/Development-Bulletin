const User = require('./User');
const Project = require('./Project');
const Task = require('./Task');
const User_tasks = require('./User_tasks');

Project.hasMany(Task, {
    foreignKey: 'project_id',
    onDelete: 'CASCADE',
});
  
Task.belongsTo(Project, {
    foreignKey: 'project_id',
});

User_tasks.hasMany(User, {
    foreignKey: 'id',
    sourceKey: 'user_id',
});

User_tasks.hasMany(Task, {
    foreignKey: 'id',
    sourceKey: 'task_id',
});

User.belongsTo(User_tasks, {
    foreignKey: 'id',
    targetKey: 'user_id',
});

Task.belongsTo(User_tasks, {
    foreignKey: 'id',
    targetKey: 'task_id',
});

module.exports = { User, Project, Task, User_tasks };
