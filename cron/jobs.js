const Traveler = require('../database/models/travelers');

module.exports = {

	setToAtRisk: Traveler.setToAtRisk,

	setToUnconfirmed: Traveler.getAllRecentArrivals
	
};


/*

getAllRecentArrivals: function() {
  return Traveler.findAll({
    include: [
      { model: ['flight'],
        where: {
          recentArrival: true
        }
      }
    ]
  })
  .then(travelers => console.log('-------------------LOOGIT ', travelers))
  .catch(err => console.error(err));
}

getterMethods: {
  recentArrival: function() {
    const now = new Date();
    const scheduledArrival = this.arrivalTime;
    console.log('SCHEDULED ARRIVAL IS ', this.arrivalTime)
    console.log("ITS TYPE IS ", typeof this.arrivalTime)
    console.log('IS IT A REAL DATE OBJ??', this.arrivalTime instanceof Date)  

    return false;
  }
}



*/