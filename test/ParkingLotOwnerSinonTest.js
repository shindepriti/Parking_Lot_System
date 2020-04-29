assert=require('chai').assert;
sinon=require('sinon');

var parkingLot = require('../app/ParkingLot')
var parkingLotOwner = require('../app/ParkingLotOwner');
describe(`Parking Lot Owner Sinon Testing `,function(){
    
    beforeEach(function(){
        parkingLotObj = new parkingLot();
        sinon.stub(parkingLotOwner,'isFull');
    })

    afterEach(function(){
        parkingLotOwner.isFull.restore();
    })

    //UC3-Parking Owner Should Know Parking Full Or Not
    it(`givenParkingLotFull_ShouldThrowExceptionNotyifyToOwner`,function(){
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

})