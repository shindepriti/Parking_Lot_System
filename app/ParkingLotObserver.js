var parkingLotOwner = require("./ParkingLotOwner")
var airportSecurity = require("./AirportSecurity")

class ParkingLotObserver{

    constructor(){
        this.observerList = []
    }
    
    addObject(){
        this.observerList.push(airportSecurity);
        this.observerList.push(parkingLotOwner);
    }

    getNotificationFull(){
        this.observerList.map(element => {
            element.isFull();   
        });
    }

    getNotificationEmpty(){
        this.observerList.map(element => {
            if(element == parkingLotOwner )
            element.spaceAvailable();
        })
    }

}
module.exports = new ParkingLotObserver