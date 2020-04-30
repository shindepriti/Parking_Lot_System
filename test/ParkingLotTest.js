const assert = require('chai').assert;
expect = require('chai').expect;
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
            assert.equal(error.message,"Vehicle Is Not Null")  
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

    //UC6-Parked Vehicle At Particular position
    it(`givenVehicle__whenParkedAtParticularPosition__shouldReturnTrue`, () => {
        let vehicle1 = {};
        let vehicle2 = {};
        parkingLotObj.park(vehicle1)
        parkingLotObj.park(vehicle2)
        parkingLotObj.unPark(vehicle2);
        let checkEmptySlots = parkingLotObj.getEmptySlots();
        assert.equal(checkEmptySlots,1)
    });

    it(`givenVehicle_whenSlotNotEmpty_shouldReturnException`,() =>{
        try {
            let vehicle1 = {};
            let vehicle2 = {};
            parkingLotObj.park(vehicle1)
            parkingLotObj.park(vehicle2)
        } catch (error) {
            expect(parkingLotObj.getEmptySlots()).to.be.equal(error.message,"Parking Slot Is Not Empty");
        }
    })

    //UC7-Driver Find car
    it(`driver_whenFindVehicle_shouldReturnTrue`, () =>{
        let vehicle1 = {};
        let vehicle2 = {};
        parkingLotObj.park(vehicle1)
        parkingLotObj.park(vehicle2)
        let getVehicle = parkingLotObj.findMyCar(vehicle2);
        assert.equal(getVehicle,1)
    })

})