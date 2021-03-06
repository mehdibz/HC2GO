const settings = require("./settings");

const knex = require('knex')({
  client: 'pg',
  version: '7.2',
  connection: {
  user     : settings.user,
  password : settings.password,
  database : settings.database,
  host     : settings.hostname,
  }
});

const addAppointment = (cid, pid, sid) => {
  return knex('appointments')
          .insert({client_id: cid, provider_id: pid, service_id: sid})
          .returning('id')
          .then((arrayOfResults) => arrayOfResults[0])
          .catch(function(err){
            console.error("error appointments query", err);
  });
};

const addReport = (aid, report) => {
  return knex('appointments')
          .update({report: report})
          .where('id', aid)
          .then((arrayOfResults) => arrayOfResults[0])
          .catch(function(err){
            console.error("error appointments query", err);
  });
};

const getAppointmentList = () => {
  return knex('appointments')
    .select('*')
    .returning('id')
    .asCallback( function (err, result){
        if (err) {
          return console.error("error running query", err);
        }
          return result;
      })
    .catch(function(err){
      console.error("error appointments query", err);
  });
};


exports.addAppointment = addAppointment;
exports.getAppointmentList = getAppointmentList;
exports.addReport = addReport;

