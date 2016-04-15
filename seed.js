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

function newContact() {
  var nameArr = chance.name().split(' ');
  return {
    firstName: nameArr[0],
    lastName: nameArr[1],
    email: chance.email(),
    title: chance.word(),
    phone: chance.phone()
  };
}

function newJob(companyId) {
  var job = {};
  job.companyId = companyId;
  job.title = chance.word();
  job.applied = chance.bool();
  return job;
}


var stageNames = ['phone screen', '1st-Round', '2nd-Round', 'Offer'];

function newStage(jobId) {
  var stage = {
    jobId: jobId,
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

function newApp(stageId, jobId) {
  var application = {
    stageId: stageId,
    jobId: jobId,
    dateApplied: chance.date({ year: 2016 })
  };
  return application
};

var models = require('./database')
var Job, company, Application, Contact, Stage, companyList, contactList, stageList, applications, jobList;
var seedStage ="";
// connect to DB;
models.then(function(models) {
    // set models to variables on outer scope
    Job = models.Job;
    Company = models.Company;
    Application = models.Application;
    Contact = models.Contact;
    Stage = models.Stage;
    syncDb = Object.keys(models).map(function(model) {
      console.log(model)
      seedStage = 'sync model: ' + model;
      return models[model].sync();
    })
    return Promise.map(syncDb,{concurrency:1});
  }).then(function() {
    seedStage = "Before create companies"
      // create x number of random companies
    return createXCompanies(4, Company);
  })
  .then(function(things) {
    seedStage = "Before create contacts"
      // set company list variable so we can access it later;
    companyList = things.map(function(doc) {
      return doc.dataValues;
    })

    // list of new persons
    var newPersons = companyList.map(function(company) {
        var person = newContact();
        person.company = company.uuid;
        return person;
      })
      // create contacts
    return Contact.bulkCreate(newPersons);
  })
  .then(function(newPersons) {
    seedStage = "Before create jobs"
      // set contact list so we can access it later (if needed)
    contactList = newPersons.map(function(person) {
      return person.dataValues;
    });

    // list of new job objects
    var newJobs = companyList.map(function(company) {
      var job = newJob(company.uuid);
      return job;
    })

    // create jobs
    return Job.bulkCreate(newJobs);
  })
  .then(function(newJobs) {
    seedStage = "Before create stages"
    newStages = [];
    jobList = [];
    newJobs.forEach(function(jobDoc) {
      var job = jobDoc.dataValues;
      jobList.push(job);
      // create random application stage for jobs that have been applied to 
      if (job.applied) newStages.push(newStage(job.uuid));
    });
    console.log(newStages)
    return Stage.bulkCreate(newStages);
  })
  .then(function(newStages) {
    seedStage = "Before create applications"
      // create application for every single job that has been applied to
    var newApps = []
    newStages.forEach(function(stageDoc) {
      var stage = stageDoc.dataValues;
      stageList = [];
      stageList.push(stage);
      newApps.push(newApp(stage.jobId, stage.uuid));
    })
    return Application.bulkCreate(newApps);
  })
  .then(function(appDocs) {
    applications = appDocs.map(function(appDoc) {
      return appDoc.dataValues;
    })
    console.log("Great SUCCESS!!!!");
  })
  .catch(function(err) {
    console.log('seed failed ' + err + ' at ' + seedStage);
  });
