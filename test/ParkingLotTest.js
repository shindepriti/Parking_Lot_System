const assert = require('chai').assert;
expect = require('chai').expect;
sinon=require('sinon');

const parkingLot = require("../app/ParkingLot")
var airportSecurity = require("../app/AirportSecurity")
var parkingLotOwner = require('../app/ParkingLotOwner');
var driver = require("../app/Driver")
var vehicleType = require("../app/VehicleType")

describe(`Parking Lot System`,function(){
    
    let parkingLotObj;
    beforeEach(() =>{
        parkingLotObj = new parkingLot();
    })

    it(`check Class Exist`, () =>{
        expect(parkingLot).to.not.be.undefined;
    })
    
    //UC1-Test case to check car is park
    it(`givenVehicle_whenPark_shouldReturnTrue`,()=>{
        let vehicle = {};
        let park = parkingLotObj.park(vehicle,driver.type.NORMAL,vehicleType.SMALL);
        assert.equal(park,0);
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
        parkingLotObj.park(vehicle,driver.type.NORMAL,vehicleType.SMALL);
        let unPark = parkingLotObj.unPark(vehicle);
        assert.isTrue(unPark);
    })

    it(`givenVehicle_WhenAllReadyUnparked_ShouldThrowException`,()=>{
        try {
             let vehicle = {};
             let vehicle2 = {};
             parkingLotObj.park(vehicle,driver.type.NORMAL,vehicleType.SMALL);
             parkingLotObj.unPark(vehicle2);
             parkingLotObj.unPark(vehicle2);
        } catch (error) {
            assert.equal(error.message,"Vehicle Already Unparked")
        }
    })

    it(`givenVehicle_WhenNullUnPark_ShouldThrowException`,()=>{
        try {
            let vehicle = {};
            parkingLotObj.park(vehicle,driver.type.NORMAL,vehicleType.SMALL)
            parkingLotObj.unPark();  
        } catch (error) {
            assert.equal(error.message,"Vehicle Is Not Null Or Undefined")  
        }
    })

    it(`whenparkingLotFull_shouldReturnException`, () => {
        try{
        let vehicle = [new Object(0), new Object(1), new Object(2), new Object(3), new Object(4), new Object(5), new Object(6), new Object(7), new Object(8),new Object(9)];
        vehicle.map(car => {
            parkingLotObj.park(car,driver.type.NORMAL,vehicleType.SMALL)
        });
        } catch (error) {
        assert.equal(error.message,"Parking Lot Is Full");
        }
    })

    //UC6-Parked Vehicle At Particular position
    it(`givenVehicle__whenParkedAtParticularPosition__shouldReturnTrue`, () => {
        let vehicle = [new Object(0), new Object(1), new Object(2), new Object(3), new Object(4), new Object(5), new Object(6), new Object(7), new Object(8)];
        vehicle.map(car => {
            parkingLotObj.park(car,driver.type.NORMAL,vehicleType.SMALL)
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
                parkingLotObj.park(vehicle,driver.type.NORMAL,vehicleType.SMALL)
            })
            parkingLotObj.getEmptySlots();
        } catch (error) {
            assert.equal(error.message,"Parking Slot Is Not Empty");
        }
    })

    //UC7-Driver Find car
    it(`driver_whenFindVehicle_shouldReturnTrue`, () =>{
        let vehicle = [[new Object(0)],[new Object(1)],[new Object(2)]];
        vehicle.map( car => {
            parkingLotObj.park(car,driver.type.NORMAL,vehicleType.SMALL)
        });
        let findCar = parkingLotObj.findMyCar(vehicle[1]);
        assert.equal(findCar.lot,1)
        assert.equal(findCar.slot,0);
    })

    it(`whenDrier_notFindCar_shouldReturnFalse`, () => {
        let vehicle = [new Object(0),new Object(1),new Object(2)];
        vehicle.map(vehicle => {
            parkingLotObj.park(vehicle,driver.type.NORMAL,vehicleType.SMALL)
        })
        let findCar = parkingLotObj.findMyCar(vehicle);
        assert.equal(findCar,false)
    })

    //UC8- Apply Charges to User
    it(`givenVehicle_whenparkedApplyCharges_shouldReturnTrue` , () =>{
        let vehicle1 = [new Object(0),new Date()];
        let result =  parkingLotObj.park(vehicle1,driver.type.NORMAL,vehicleType.SMALL);
        assert.equal(result,0);
    })

    //UC9
    it(`givenVehicle_whenParkEvenly_shouldReturnTrue`,() =>{
        let car = [[new Object(0),new Date()],[new Object(1),new Date()],[new Object(2),new Date()],[new Object(3),new Date()],[new Object(4),new Date()],[new Object(5),new Date()],[new Object(6),new Date()],[new Object(7),new Date()]]
        car.map(car => {
           result =  parkingLotObj.park(car,driver.type.NORMAL,vehicleType.SMALL);
        })
        assert.equal(result,true)
    })

    //UC10
    it(`whenDriverIsHandicap_ThenHisCarParksnNearestFreeSpace_shouldRetuReturnLotNumber `, () => {
        let vehicle1 = new Object();
        let car = [[new Object(0), new Date()], [new Object(1), new Date()],[new Object(2), new Date()],[new Object(3), new Date()],[new Object(4), new Date()]]
        car.map(vehicle => {
           parkingLotObj.park(vehicle,driver.type.NORMAL,vehicleType.SMALL);
        })
        let result = parkingLotObj.park(vehicle1,driver.type.HANDICAP,vehicleType.SMALL);
        assert.equal(result,0)
    });

    it(`whenMultipleDriverIsHandicap_ThenHisCarParksnNearestFreeSpace_shouldRetuReturnLotNumber `, () => {
        let vehicle1 = new Object();
        let vehicle2 = new Object();
        let car = [[new Object("Tata"), new Date()], [new Object("Ford"), new Date()]]
        car.map(vehicle => {
            parkingLotObj.park(vehicle,driver.type.NORMAL,vehicleType.SMALL);
        })
        parkingLotObj.park(vehicle1,driver.type.HANDICAP,vehicleType.SMALL)
        let result = parkingLotObj.park(vehicle2,driver.type.HANDICAP,vehicleType.SMALL);
        assert.equal(result,0);
    });

    //UC11 Park Large Vehicle At Highest No Of Free Space
    it(`whenLargestCarComes_thenItWillParkInHighestNoOfFreeSpace_shouldReturnLoyNumber `, () => {
        let car1 = new Object();
        let car = [[new Object(), new Date()], [new Object(), new Date()], [new Object(), new Date()], [new Object(), new Date()]]
        car.map(car => {
            parkingLotObj.park(car,driver.type.NORMAL,vehicleType.SMALL);
        })
        let emptySpace = parkingLotObj.park(car1,driver.type.NORMAL,vehicleType.LARGE);
        assert.equal(emptySpace,2)
    });

    //UC12 Find Location Of White Cars
    it(`givenVehicleColour_WhenFindVehicleAccordinglyColour_ShouldReturnSlotNumber`, () =>{
        let car = [{color : "White"}, {color : "White"}, {color :"Red"},{color : "Red"}, {color : "green"},{color:"Blue"}]
        car.map(car => {
            parkingLotObj.park(car,driver.type.NORMAL,vehicleType.SMALL);
        })
        let vehicleByColor = parkingLotObj.findVehicleByColor("White")
        assert.equal(vehicleByColor[0].lot,0)
        assert.equal(vehicleByColor[0].slot,0)
        assert.equal(vehicleByColor[1].lot,1)
        assert.equal(vehicleByColor[1].slot,0)
    });

    //UC13 Find By color Or ModelName 
    it(`givenVehicleModelNumberAndColor_WhenFindVehicleAccordinglyModelNumberAndColor_ShouldReturnSlot`,()=>{
        let car = [{color : "Blue",modelName : "Toyota",numberPlate:"MH-10"},
                   {color : "Red", modelName: "BMW" ,numberPlate:"MH-19"},
                   {color : "Blue", modelName: "Toyota" ,numberPlate:"MH-9"},
                    {color : "Green",modelName :"Tata",numberPlate:"MH-10"}]
        car.forEach(car => {
            parkingLotObj.park(car,driver.type.NORMAL,vehicleType.SMALL);
        })
        let vehicleByColor = parkingLotObj.findVehicleByColor("Blue","Toyota","MH-10")
        assert.equal(vehicleByColor[0].lot,0)
        assert.equal(vehicleByColor[0].slot,0)
    }) 
    
    //UC14 find By ModelName
    it(`givenvehicleModelName_whenFindVehicleAccordinglyModeName_shouldReturnLotNumber`,()=>{
        let car = [{color : "Blue",modelName : "BMW",numberPlate:"MH-10"},
                   {color : "Red", modelName: "Lambargini" ,numberPlate:"MH-19"},
                   {color : "Blue", modelName: "Toyota" ,numberPlate:"MH-9"},
                    {color : "Green",modelName :"Tata",numberPlate:"MH-10"}]
        car.forEach(car => {
                parkingLotObj.park(car,driver.type.NORMAL,vehicleType.SMALL)            
        });
        let vehicleByModeName = parkingLotObj.findVehicleByModelNumber("BMW")
        assert.equal(vehicleByModeName[0].lot,0)
        assert.equal(vehicleByModeName[0].slot,0)
        
    })

    //UC15 find last 30 min parked time
    it(`givenVehicles_WhenFindVehicleAccordinglyParkedInLast30Minutes_ShouldReturnVehicleSlotNumber`,()=>{
        let date = new Date()
        parkedTime = date.getMinutes()-20;
        let car = [{color : "Red", modelName: "Lambargini" ,numberPlate:"MH-19",parkedTime},
                   {color : "Red", modelName: "Lambargini" ,numberPlate:"MH-19"},
                   {color : "Blue", modelName: "Toyota" ,numberPlate:"MH-9"},
                    {color : "Green",modelName :"Tata",numberPlate:"MH-10"}]

        car.forEach(car => {
           parkingLotObj.park(car,driver.type.NORMAL,vehicleType.SMALL)
        })
        let vehicleTime = parkingLotObj.findVehicleParkedInLast30Minutes();
        assert.equal(vehicleTime[0].lot,0)
        assert.equal(vehicleTime[0].slot,0)
    })

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
                parkingLotObj.park(car,driver.type.NORMAL,vehicleType.SMALL)
            }) 
        } catch (error) {
            expect(parkingLotOwner.isFull()).to.be.equal(error.message,"Parking Lot Is Full");
            
        }        
    });

    //  //UC5-Owner Notify Available Space
    it(`givenParkingLotFull__whenSapceAvailableAgain__notifyOwner` , ()=> {
        let vehicle =[new Object(), new Object(), new Object(), new Object(), new Object(), new Object(), new Object(), new Object(), new Object()]
        vehicle.map(car => {
            parkingLotObj.park(car,driver.type.NORMAL,vehicleType.SMALL)
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
                parkingLotObj.park(car,driver.type.NORMAL,vehicleType.SMALL)
            })
        } catch (error) {
            expect(airportSecurity.isFull()).to.be.equal(error.message,"Parking Lot Is Full");
        }        
    });

});
