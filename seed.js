var Chance = require('chance');
chance = new Chance(),
  _ = require('lodash'),
  Promise = require('bluebird');

function newCompany() {
  return {
    name: chance.word() + 'Inc.',
    description: chance.paragraph({ sentences: 2 }),
    industry: chance.word(),
    address: chance.address(),
    phone: chance.phone()
  };
}

function createXCompanies(x, model) {
  var companies = _.times(x, newCompany);
  return model.bulkCreate(companies);
}

function newContact(companyId) {
  var nameArr = chance.name().split(' ');
  return {
    companyUuid:companyId,
    firstName: nameArr[0],
    lastName: nameArr[1],
    email: chance.email(),
    title: chance.word(),
    phone: chance.phone()
  };
}

function newJob(companyId) {
  return {
  companyUuid : companyId,
  title : chance.word(),
  applied : chance.bool(),
  };
}


var stageNames = ['phone screen', '1st-Round', '2nd-Round', 'Offer'];

function newStage(appId) {
  var stage = {
    applicationUuid: appId,
    stageName: stageNames[chance.integer({ min: 0, max: stageNames.length - 1 })],
    date: chance.date({ year: 2016 }),
    notes: chance.paragraph({ sentences: 1 }),
  }
  stage.completed = stage.date < Date.now();
  if (stage.completed) {
    stage.followedUp = chance.bool();
  } else stage.followedUp = false;
  return stage;
};

function getRecentDate() {
  var date = chance.date({ year: 2016 });
  while(date > Date.now){
    date = chance.date({ year: 2016 });
  }
  return date
}

function newApp(jobId) {
  return {
    jobUuid: jobId,
    dateApplied: getRecentDate()
  };
};

var models;
var companyList, contactList, stageList, applications, jobList;
var seedStage ="";
// connect to DB;
require('./database').then(function(dbModels) {
  models = dbModels;
  return createXCompanies(15,models.Company);
  })
  .then(function(created){
    // console.log(models.Contact.attributes)
    companyList = [];
    var newDocs = [];
    created.forEach(function(compDoc){
      var company = compDoc.dataValues;
      companyList.push(company);
      newDocs.push(newContact(company.uuid));
    });
    // console.log(companyList)
    return models.Contact.bulkCreate(newDocs)
  })
  .then(function(created){
    // console.log(created)
    contactList = created.map(function(contactDoc){
      return contactDoc.dataValues;
    });
    var newDocs = companyList.map(function(doc){
      return newJob(doc.uuid);
    })
    return models.Job.bulkCreate(newDocs)
  })
  .then(function(created){
    var newDocs = created.map(function(jobDoc){
      return newApp(jobDoc.dataValues.uuid);
    })
    return models.Application.bulkCreate(newDocs);
  })
  .then(function(created){
    console.log(created)
    var newDocs = created.map(function(appDoc){
      return newStage(appDoc.dataValues.uuid);
    });
    return models.Stage.bulkCreate(newDocs);
  })
  .then(function(){
    console.log("GREAT SUCCESS!!!!!!")
  })
  .catch(function(err) {
    console.log('seed failed ',err);
  });
