assert=require('chai').assert;
sinon=require('sinon');

var parkingLot = require('../app/ParkingLot')
var airportSecurity = require("../app/AirportSecurity")
describe(`Airport Security Sinon Testing `,function(){
    
    let parkingLotObj;
    beforeEach(function(){
        parkingLotObj = new parkingLot();
        sinon.stub(airportSecurity,'isFull');
    })

    afterEach(function(){
        airportSecurity.isFull.restore();
    })

    //UC4-Security Notify Parking Full
    it(`givenParkingLotFull_notifyToAirportSecurity_ShouldThrowException`, ()=> {
        try {
            let car = new Object();
            let car1 = new Object();
            expect(parkingLotObj.park(car)).to.be.equal(true);   
        } catch (error) {
            expect(airportSecurity.isFull()).to.be.equal(error.message,"Parking Lot Is Full");
        }        
    });

});