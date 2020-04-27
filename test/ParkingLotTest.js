const assert = require('chai').assert;
const parkingLot = require("../app/ParkingLot")
describe(`Parking Lot System`,function(){

     //UC1-Test case to check car is park
    it(`givenVehicle_whenPark_shouldReturnTrue`,function(){
        let parkingLotObj = new parkingLot();
        let vehicle = new Object();
        let park = parkingLotObj.park(vehicle);
        assert.isTrue(park);
    })
})