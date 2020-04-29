var parkingLotObserver = require("../app/ParkingLotObserver")
var parkingLotOwner = require("../app/ParkingLotOwner")
const parkingLotMaximumCapacity = 2

class ParkingLot{

    constructor(){
        this.parkingLotCapacity = []
    }
    
    park=(vehicle)=>{
        if (vehicle == null || vehicle == undefined) {
            throw new Error("Vehicle Is Not Null Or Undefined")
        }
        if(this.parkingLotFull()){
            return false;
        }
        this.parkingLotCapacity.push(vehicle);
        return true
    }

    unPark=(vehicle)=>{
        if(vehicle == null || vehicle == undefined){
            throw new Error("Vehicle Is Not Null Or Undefined")
        }
        for(let car = 0;car < this.parkingLotCapacity.length;car++){
            if(this.parkingLotCapacity[car] == vehicle){
                delete this.parkingLotCapacity[car]
                parkingLotObserver.addObject();
                parkingLotObserver.getNotificationEmpty();
                return true;
            }
        }
        throw new Error("Vehicle Already Unparked")     
    }

    parkingLotFull(){
        if(this.parkingLotCapacity.length == parkingLotMaximumCapacity){
            parkingLotObserver.addObject();
            parkingLotObserver.getNotificationFull();        
            throw new Error("Parking Lot Is Full")
        }
    }

}
module.exports =  ParkingLot;