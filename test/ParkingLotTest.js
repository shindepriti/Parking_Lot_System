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

    it(`givenVehicle_WhenNullPark_ShouldThrowException`,function(){
        try {
            parkingLotObj.park();  
        } catch (error) {
            assert.equal(error.message,"Vehicle Is Not Null Or Undefined")  
        }
    })
    
     //UC2-Test case To check Car is Unpark
     it(`givenVehicle_whenUnParked_shouldReturnTrue`,function(){
        let vehicle = new Object();
        parkingLotObj.park(vehicle);
        let unPark = parkingLotObj.unPark(vehicle);
        assert.isTrue(unPark);
    })

    it(`givenVehicle_WhenAllReadyUnparked_ShouldThrowException`,function(){
        try {
            let vehicle = new Object();
             parkingLotObj.park(vehicle);
             parkingLotObj.unPark(vehicle);
             parkingLotObj.unPark(vehicle);
        } catch (error) {
            assert.equal(error.message,"Vehicle Already Unparked")
        }
    })

    it(`givenVehicle_WhenNullUnPark_ShouldThrowException`,function(){
        try {
            let vehicle = new Object();
            parkingLotObj.park(vehicle)
            parkingLotObj.unPark();  
        } catch (error) {
            assert.equal(error.message,"Vehicle Is Not Null Or Undefined")  
        }
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