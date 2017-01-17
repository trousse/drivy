'use strict';

//list of cars
//useful for ALL exercises
var cars = [{
  'id': 'p306',
  'vehicule': 'peugeot 306',
  'pricePerDay': 20,
  'pricePerKm': 0.10
}, {
  'id': 'rr-sport',
  'pricePerDay': 60,
  'pricePerKm': 0.30
}, {
  'id': 'p-boxster',
  'pricePerDay': 100,
  'pricePerKm': 0.45
}];

//list of rentals
//useful for ALL exercises
//The `price` is updated from exercice 1
//The `commission` is updated from exercice 3
//The `options` is useful from exercice 4
var rentals = [{
  'id': '1-pb-92',
  'driver': {
    'firstName': 'Paul',
    'lastName': 'Bismuth'
  },
  'carId': 'p306',
  'pickupDate': '2016-01-02',
  'returnDate': '2016-01-02',
  'distance': 100,
  'options': {
    'deductibleReduction': false
  },
  'price': 0,
  'commission': {
    'insurance': 0,
    'assistance': 0,
    'drivy': 0
  }
}, {
  'id': '2-rs-92',
  'driver': {
    'firstName': 'Rebecca',
    'lastName': 'Solanas'
  },
  'carId': 'rr-sport',
  'pickupDate': '2016-01-05',
  'returnDate': '2016-01-09',
  'distance': 300,
  'options': {
    'deductibleReduction': true
  },
  'price': 0,
  'commission': {
    'insurance': 0,
    'assistance': 0,
    'drivy': 0
  }
}, {
  'id': '3-sa-92',
  'driver': {
    'firstName': ' Sami',
    'lastName': 'Ameziane'
  },
  'carId': 'p-boxster',
  'pickupDate': '2015-12-01',
  'returnDate': '2015-12-15',
  'distance': 1000,
  'options': {
    'deductibleReduction': true
  },
  'price': 0,
  'commission': {
    'insurance': 0,
    'assistance': 0,
    'drivy': 0
  }
}];

//list of actors for payment
//useful from exercise 5
var actors = [{
  'rentalId': '1-pb-92',
  'payment': [{
    'who': 'driver',
    'type': 'debit',
    'amount': 0
  }, {
    'who': 'owner',
    'type': 'credit',
    'amount': 0
  }, {
    'who': 'insurance',
    'type': 'credit',
    'amount': 0
  }, {
    'who': 'assistance',
    'type': 'credit',
    'amount': 0
  }, {
    'who': 'drivy',
    'type': 'credit',
    'amount': 0
  }]
}, {
  'rentalId': '2-rs-92',
  'payment': [{
    'who': 'driver',
    'type': 'debit',
    'amount': 0
  }, {
    'who': 'owner',
    'type': 'credit',
    'amount': 0
  }, {
    'who': 'insurance',
    'type': 'credit',
    'amount': 0
  }, {
    'who': 'assistance',
    'type': 'credit',
    'amount': 0
  }, {
    'who': 'drivy',
    'type': 'credit',
    'amount': 0
  }]
}, {
  'rentalId': '3-sa-92',
  'payment': [{
    'who': 'driver',
    'type': 'debit',
    'amount': 0
  }, {
    'who': 'owner',
    'type': 'credit',
    'amount': 0
  }, {
    'who': 'insurance',
    'type': 'credit',
    'amount': 0
  }, {
    'who': 'assistance',
    'type': 'credit',
    'amount': 0
  }, {
    'who': 'drivy',
    'type': 'credit',
    'amount': 0
  }]
}];

//list of rental modifcation
//useful for exercise 6
var rentalModifications = [{
  'rentalId': '1-pb-92',
  'returnDate': '2016-01-04',
  'distance': 150
}, {
  'rentalId': '3-sa-92',
  'pickupDate': '2015-12-05'
}];

/*
found an object in a array of object

arg : array - array to check
      objectID - value to found
      idFieldName - name of th efiled which need to be join
      callback - function call if value is found

return true if find false if not
*/
var foundObject = function(array,objectId,idFieldName,callback){
  array.forEach(function(item){
    if(item[idFieldName]==objectId){
      callback(item);
      return true;
    }
    return false;
  })
}

// apply driver's modification
rentalModifications.forEach(function(modifs){
  foundObject(rentals,modifs.rentalId,"id",function(rental){
    for (var modif in modifs) {
        rental[modif] = modifs[modif];
    }
  })
})

// main fonction
rentals.forEach(function(rental){

     var dateStart = new Date(rental.pickupDate);
     var dateEnd = new Date(rental.returnDate);
     var time = (dateEnd.getTime()-dateStart.getTime())/(24*3600000)+1;
     var distance = rental.distance;
     var price = 0;
     var reduction = 0;


     // for each rent figure the time and distance price
     foundObject(cars,rental.carId,"id",function(car){
       price = time*car.pricePerDay + distance*car.pricePerKm;
       return 0;
     })

     // figure reduction
     if(time >= 2) reduction = price*0.1;
     if(time >= 5) reduction = price*0.4;
     if(time >= 11) reduction = price*0.5;

     // figure commission
     rental.price = price-reduction;
     rental.commission.insurance = rental.price*0.3*0.5;
     rental.commission.assistance = time;
     rental.commission.drivy = rental.price*0.3 - rental.commission.insurance - rental.commission.assistance;
     if(rental.options.deductibleReduction) rental.price += time*4 ;

     // make transaction bettween all the actors
     foundObject(actors,rental.id,"rentalId",function(rentActors){
       rentActors.payment.forEach(function(actor){
         switch(actor.who){
           case "driver" :
              actor.amount = rental.price;
              break;
           case "owner" :
              actor.amount =   actor.amount = rental.price*0.7;
              break;
          case "assistance":
              actor.amount = rental.commission.assistance;
              break;
          case "drivy":
              actor.amount = rental.commission.drivy;
              break;
          case "insurance":
              actor.amount = rental.commision.insurance;
              break;
         }
       })
     })
     return 0;
  })

console.log(cars);
console.log(rentals);
console.log(actors);
console.log(rentalModifications);
