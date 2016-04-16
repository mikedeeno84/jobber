var Sequelize = require('sequelize');
var jobberDB = new Sequelize('jobber', null, null, {
  dialect: 'postgres',
  port: 5432
});
var models;
module.exports = jobberDB
  .authenticate()
  .then(function() {
    console.log('connection successful')
    models = {
      Job: require('./models/Job')(jobberDB),
      Company: require('./models/Company')(jobberDB),
      Stage: require('./models/Stage')(jobberDB),
      Application: require('./models/Application')(jobberDB),
      Contact: require('./models/Contact')(jobberDB)
    };
    models.Company.hasMany(models.Job);
    models.Job.belongsTo(models.Company);
    
    models.Company.hasMany(models.Contact);
    models.Contact.belongsTo(models.Company);
    
    models.Job.hasMany(models.Application);
    models.Application.belongsTo(models.Job);
    
    models.Application.hasMany(models.Stage);
    models.Stage.belongsTo(models.Application);
    
    return jobberDB.sync();
  }).then(function(){
    return models;
  })
