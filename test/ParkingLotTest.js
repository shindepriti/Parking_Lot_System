const assert = require('chai').assert;
expect = require('chai').expect;
sinon=require('sinon');

const parkingLot = require("../app/ParkingLot")
var airportSecurity = require("../app/AirportSecurity")
var parkingLotOwner = require('../app/ParkingLotOwner');

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
            assert.equal(error.message,"Vehicle Is Not Null Or Vehicle Must be Object")  
        }
    })
    it(`givenVehicle_WhenNotObjectPark_ShouldThrowException`,()=>{
        try {
            parkingLotObj.park(1);  
        } catch (error) {
            assert.equal(error.message,"Vehicle Is Not Null Or Vehicle Must be Object")  
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

    //UC10
    it(`whenDriverIsHandicap_ThenHisCarParksnNearestFreeSpace_shouldRetuReturnTrue `, () => {
        let vehicle = new Object('Handicap');
        let car = [[new Object(0), new Date()], [new Object(1), new Date()], [new Object(2), new Date()], [new Object(3), new Date()]]
        car.map(vehicle1 => {
            parkingLotObj.park(vehicle1);
        })
        let result = parkingLotObj.park(vehicle);
        assert.equal(result, true)
    });

})


describe(`Parking Lot Owner Sinon Testing `,function(){

    let parkingLotObj;
        beforeEach(function(){
        parkingLotObj = new parkingLot();
        sinon.stub(parkingLotOwner,'isFull');
    })

    afterEach(function(){
        parkingLotOwner.isFull.restore();
    })

    //UC3-Parking Owner Should Know Parking Full Or Not
    it(`givenParkingLotFull_ShouldThrowExceptionNotyifyToOwner`,()=> {
        try {
            let vehicle =[new Object(), new Object(), new Object(), new Object(), new Object(), new Object(), new Object(), new Object(), new Object()]
            vehicle.map(car => {
                parkingLotObj.park(car)
            }) 
        } catch (error) {
            expect(parkingLotOwner.isFull()).to.be.equal(error.message,"Parking Lot Is Full");
        }        
    });

    //  //UC5-Owner Notify Available Space
    it(`givenParkingLotFull__whenSapceAvailableAgain__notifyOwner` , ()=> {
        let vehicle =[new Object(), new Object(), new Object(), new Object(), new Object(), new Object(), new Object(), new Object(), new Object()]
        vehicle.map(car => {
            parkingLotObj.park(car)
        }) 
        expect(parkingLotOwner.spaceAvailable()).to.be.equal("Parking Lot Space Available");
    });

});

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
            let vehicle =[new Object(), new Object(), new Object(), new Object(), new Object(), new Object(), new Object(), new Object(), new Object()]
            vehicle.map(car => {
                parkingLotObj.park(car)
            })
        } catch (error) {
            expect(airportSecurity.isFull()).to.be.equal(error.message,"Parking Lot Is Full");
        }        
    });

});
