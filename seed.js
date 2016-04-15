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
  if (completed) {
    stage.followedUp = chance.bool();
  } else stage.followedUp = false;
};

function newApp(stageId, jobId) {
  var application = {
  	stageId:stageId,
  	jobId:job_Id,
  	dateApplied: chance.date({year:2016})
  };
};

var models = require('./database')
var Job, company, Application, Contact, Stage, companyList, contactList;
// connect to DB;
models.then(function(models) {
    // set models to variables on outer scope
    Job = models.Job;
    Company = models.Company;
    Application = models.Application;
    Contact = models.Contact;
    Stage = models.Stage;

    // create x number of random companies
    return createXCompanies(4, Company);
  })
  .then(function(things) {
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
    // set contact list so we can access it later (if needed)
    contactList = newPersons.map(function(person) {
      person.dataValues;
    });

    // list of new job objects
    var jobList = companyList.map(function(company) {
      var job = newJob(company.uuid);
      return job;
    })

    // create jobs
    return Job.bulkCreate(jobList);
  })
  .then(function(newJobs) {
    var stages = [];
    newJobs.forEach(function(jobDoc) {
      var job = jobDoc.dataValues;
    // create random application stage for jobs that have been applied to 
      if (job.applied) stages.push(newStage(job.uuid));
    });
    return Stage.bulkCreate(stages);
  })
  .then(function(newStages) {

  	// create application for every single job that has been applied to
  	var applications = newStages.map(function(stageDoc){
  		var stage = stageDoc.dataValues;
  		return newApp(stage.jobId, stage.uuid);
  	})
  	return Application.bulkCreate(applications);
  })
  .catch(function(err) {
    console.log('seed failed', err)
  });
