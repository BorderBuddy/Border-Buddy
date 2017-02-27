// Require our models.
const Traveler = require('./travelers');
const Flight = require('./flights');
//const User = require('./user');

// -=-=-=-=-=-= ASSOCIATIONS =-=-=-=-=-=-
// http://docs.sequelizejs.com/en/latest/docs/associations/

Flight.hasOne(Traveler, {foreignKey : 'flight_id'});
Traveler.belongsTo(Flight) // for eager loading

// Examples
// Therapist.hasMany(Patient) // patient << therapist_id // therapist.getPatients/setPatients
// Patient.belongsTo(Therapist);
// Exercise.belongsTo(Therapist, { foreignKey: 'therapist_id' }) // exercise << therapist_id
// Therapist.hasMany(Exercise); // exercise << therapist_id
//
// Patient.hasMany(Workout) // workout << patient_id // patient.getWorkouts/setWorkouts
// Plan.hasMany(Workout) // workout << plan_id // plan.getWorkouts/setWorkouts
// Plan.belongsTo(Patient) // workout << plan_id // plan.getWorkouts/setWorkouts
// Plan.hasMany(Treatment) // treatment << plan_id // plan.getTreatments/setTreatments
//
// Patient.hasMany(Treatment) // treatment << patient_id // patient.getTreatments/setTreatments
// Patient.hasMany(Plan) // plan << patient_id // patient.getPlans/setPlans
//
// Treatment.hasMany(Workout, { foreignKey: 'treatment_id' }) // workout << treatment_id
// Exercise.hasOne(Treatment, { foreignKey: 'exercise_id' }) // treatment << exercise_id
// Treatment.belongsTo(Exercise);
// Workout.belongsTo(Treatment);

module.exports = { Traveler, Flight};
