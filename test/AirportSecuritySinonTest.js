assert=require('chai').assert;
sinon=require('sinon');

var parkingLot = require('../app/ParkingLot')
var airportSecurity = require("../app/AirportSecurity")
describe(`Airport Security Sinon Testing `,function(){
    
    beforeEach(function(){
        parkingLotObj = new parkingLot();
        sinon.stub(airportSecurity,'isFull');
    })

    afterEach(function(){
        airportSecurity.isFull.restore();
    })

    //UC4-Security Notify Parking Full
    it(`givenParkingLotFull_notifyToAirportSecurity_ShouldThrowException`,function(){
        try {
            let car = new Object();
            let car1 = new Object();
            let car2 = new Object();
            let car3 = new Object();
            parkingLotObj.park(car);
            parkingLotObj.park(car1);
            parkingLotObj.park(car2);
            parkingLotObj.park(car3);  
        } catch (error) {
            assert.equal(error.message,"Parking Lot Is Full");

        }
    })

});