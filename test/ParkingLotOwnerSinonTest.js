assert=require('chai').assert;
sinon=require('sinon');

expect = require('chai').expect;
var parkingLot = require('../app/ParkingLot')
var parkingLotOwner = require('../app/ParkingLotOwner');
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

})