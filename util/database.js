const Sequelize = require('sequelize'); 

const sequelize = new Sequelize('node-complete', 'root', 'nhatnhat', 
    {
        dialect: 'mysql',
        host: 'localhost'
    }
 ); 

module.exports = sequelize; 