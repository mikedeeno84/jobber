var Sequelize = require('sequelize');
var jobberDB = new Sequelize('jobber', null, null, {
  dialect: 'postgres',
  port: 5432
});

// sequelize.sync();
module.exports = jobberDB
    .authenticate()
    .then(function() {
      console.log('connection successful')
      var models = {
        Job: require('./models/Job')(jobberDB),
        Company: require('./models/Company')(jobberDB),
        Stage: require('./models/Stage')(jobberDB),
        Application: require('./models/Application')(jobberDB),
        Contact: require('./models/Contact')(jobberDB)
      };
      models.Contact.belongsTo(models.Company);
      return models;
    })
