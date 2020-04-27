const assert = require('chai').assert;
const parkingLot = require("../app/ParkingLot")
describe(`Parking Lot System`,function(){
    
    let parkingLotObj;
    beforeEach(() =>{
        parkingLotObj = new parkingLot();
    })
    
    //UC1-Test case to check car is park
    it(`givenVehicle_whenPark_shouldReturnTrue`,function(){
        let vehicle = new Object();
        let park = parkingLotObj.park(vehicle);
        assert.isTrue(park);
    })


     //UC2-Test case To check Car is Unpark
     it(`givenVehicle_whenUnParked_shouldReturnTrue`,function(){
        let vehicle = new Object();
        parkingLotObj.park(vehicle);
        let unPark = parkingLotObj.unPark(vehicle);
        assert.isTrue(unPark);
    })
})