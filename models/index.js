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
});



module.exports = { User, Project, Task, User_tasks };
