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
        let vehicle = [new Object(0), new Object(1), new Object(2), new Object(3), new Object(4), new Object(5), new Object(6), new Object(7), new Object(8)];
        vehicle.map(car => {
            parkingLotObj.park(car)
        });
        parkingLotObj.unPark(vehicle[2]);
        let emptySlots = parkingLotObj.getEmptySlots();
        assert.equal(emptySlots.lot,2)
        assert.equal(emptySlots.slot,0)
    });

    it(`givenVehicle_whenSlotNotEmpty_shouldReturnException`,() =>{
        try {
            let vehicle = [new Object(0), new Object(1), new Object(2), new Object(3), new Object(4), new Object(5), new Object(6), new Object(7), new Object(8)];
            vehicle.map(vehicle => {
                parkingLotObj.park(vehicle)
            })
        } catch (error) {
            expect(parkingLotObj.getEmptySlots()).to.be.equal(error.message,"Parking Slot Is Not Empty");
        }
    })

    //UC7-Driver Find car
    it(`driver_whenFindVehicle_shouldReturnTrue`, () =>{
        let vehicle = [new Object(0),new Object(1),new Object(2)];
        vehicle.map( car => {
            parkingLotObj.park(car)
        });
        let findCar = parkingLotObj.findMyCar(vehicle[1]);
        assert.equal(findCar.lot,1)
        assert.equal(findCar.slot,0);
    })

    it(`whenDrier_notFindCar_shouldReturnFalse`, () => {
        let vehicle = [new Object(0),new Object(1),new Object(2)];
        vehicle.map(vehicle => {
            parkingLotObj.park(vehicle)
        })
        let findCar = parkingLotObj.findMyCar(vehicle);
        assert.equal(findCar,false)
    })

    //UC8- Apply Charges to User
    it(`givenVehicle_whenparkedApplyCharges_shouldReturnTrue` , () =>{
        let vehicle1 = [new Object(0),new Date()];
        let result =  parkingLotObj.park(vehicle1);
        assert.equal(result,true);
    })

    //UC9
    it(`givenVehicle_whenParkEvenly_shouldReturnTrue`,() =>{
        let car = [[new Object(0),new Date()],[new Object(1),new Date()],[new Object(2),new Date()],[new Object(3),new Date()],[new Object(4),new Date()],[new Object(5),new Date()],[new Object(6),new Date()],[new Object(7),new Date()]]
        car.map(car => {
           result =  parkingLotObj.park(car);
        })
        assert.equal(result,true)
    })

})  