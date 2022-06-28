const sequelize = require('../config/connection');
const { User, Project, Task, User_tasks } = require('../models');

const userSeedData = require('./userSeedData.json');
const projectSeedData = require('./projectSeedData.json');
const taskSeedData = require('./taskSeedData.json');
const userTaskSeedData = require('./userTaskSeedData.json');

const seedDatabase = async () => {
  await sequelize.sync({ force: true });

  await User.bulkCreate(userSeedData);
  await Project.bulkCreate(projectSeedData);
  await Task.bulkCreate(taskSeedData);
  await User_tasks.bulkCreate(userTaskSeedData);

  process.exit(0);
};

seedDatabase();