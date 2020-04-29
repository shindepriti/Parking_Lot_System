const assert = require('chai').assert;
const parkingLot = require("../app/ParkingLot")
describe(`Parking Lot System`,function(){
    
    let parkingLotObj;
    beforeEach(() =>{
        parkingLotObj = new parkingLot();
    })
    
    //UC1-Test case to check car is park
    it(`givenVehicle_whenPark_shouldReturnTrue`,()=>{
        let vehicle = {};
        let park = parkingLotObj.park(vehicle);
        assert.isTrue(park);
    })

    it(`givenVehicle_WhenNullPark_ShouldThrowException`,()=>{
        try {
            parkingLotObj.park();  
        } catch (error) {
            assert.equal(error.message,"Vehicle Is Not Null Or Undefined")  
        }
    })
    
     //UC2-Test case To check Car is Unpark
     it(`givenVehicle_whenUnParked_shouldReturnTrue`,()=>{
        let vehicle = {};
        parkingLotObj.park(vehicle);
        let unPark = parkingLotObj.unPark(vehicle);
        assert.isTrue(unPark);
    })

    it(`givenVehicle_WhenAllReadyUnparked_ShouldThrowException`,()=>{
        try {
            let vehicle = {};
             parkingLotObj.park(vehicle);
             parkingLotObj.unPark(vehicle);
             parkingLotObj.unPark(vehicle);
        } catch (error) {
            assert.equal(error.message,"Vehicle Already Unparked")
        }
    })

    it(`givenVehicle_WhenNullUnPark_ShouldThrowException`,()=>{
        try {
            let vehicle = {};
            parkingLotObj.park(vehicle)
            parkingLotObj.unPark();  
        } catch (error) {
            assert.equal(error.message,"Vehicle Is Not Null Or Undefined")  
        }
    })

})