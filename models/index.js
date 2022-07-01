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

User_tasks.belongsTo( User, { foreignKey: 'user_id', targetKey: 'id', as: 'User' });
User_tasks.belongsTo( Task, { foreignKey: 'task_id', targetKey: 'id', as: 'Task' });

User.belongsToMany( Task, { as: 'TasksForUser', through: User_tasks, foreignKey: 'user_id' });
Task.belongsToMany( User, { as: 'UsersForTasks', through: User_tasks, foreignKey: 'task_id' });

module.exports = { User, Project, Task, User_tasks };


//Code showing how to pull project and associated tasks and users

// const projectData = await Project.findByPk(req.params.id);
// const taskData = await Task.findAll({ 
//   where: { project_id: req.params.id },
//   include: {
//    model:  User, as: "UsersForTasks",
//   }
// });

// const project = projectData.get({ plain: true });
// const task = taskData.map((task) => task.get({ plain: true }));